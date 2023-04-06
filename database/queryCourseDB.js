const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/courseDB");

// Schema for a tag (the abstract representation is a node), nodes would form a graph that represents the relationship betweeen tags
const tagSchema = new mongoose.Schema ({
  tagID: Number,
  tagName: String,
  neighbors: [Number]
});

// Schema for each page
const pageSchema = new mongoose.Schema ({
  pageID: Number,
  title: String,
  content: String
});
// Schema for each section
const sectionSchema = new mongoose.Schema ({
  sectionID: Number,
  chapter: Number,
  page: [Number],
  tag: [tagSchema],
  tagIDs: [Number],
  content: [pageSchema]
});

// Create a collection which is an instance of the tag schema
const Tag = mongoose.model("Tag", tagSchema);
// Create a colleciton which is an instance of the section schema
const Section = mongoose.model("Section", sectionSchema);
// Create a collection which is an instance of page schema 
const Page = mongoose.model("Page", pageSchema);


// ############### Query Data ###############

// * Step 1: Get all the pages whose `content` field or `title` field contain a specific search string
async function findPages(searchString) {
  const contentMappedPages = await Page.find({content: {$regex: searchString}});
  const titleMappedPages = await Page.find({title: {$regex: searchString}});
  return {contentMappedPages, titleMappedPages};
};

// * Step 2: Given an array of page objects, 
//   * find the corresponding sections that contain these pages, compute sections' weighted occurrence frequency
//   * compute the weighted occurrence frequency of tags in these sections
//   * if the page is found in the `content` field of the page, the occurrence weight is 1, otherwise (in `title` field) it is 2
async function findSections(pages, occurrenceWeight, sectionMap, tagMap) {
  // Iterate trough `pages`
  for (let i = 0, pageLen = pages.length; i < pageLen; i++) {
    // find the section that satisfy the condition: the given pageID is in the page array of the section
    const sections = await Section.find({ page: { $elemMatch: { $eq: pages[i].pageID } } });
    if (sections.length > 0) {
      // Count occurrence frequency of sections
      let sectionID = sections[0].sectionID;
      if (sectionMap.has(sectionID)) {
        // If it is, increment the count
        sectionMap.set(sectionID, sectionMap.get(sectionID) + occurrenceWeight);
      } else {
        // If it's not, add it to the Map with a initial occurrence weight
        sectionMap.set(sectionID, occurrenceWeight);
      };

      // Count occurrence frequency of tags
      let tagIDs = sections[0].tagIDs;
      for (let j = 0, tagIDLen = tagIDs.length; j < tagIDLen; j++) {
        let tagID = tagIDs[j];
        if (tagMap.has(tagID)) {
          // If it is, increment the count
          tagMap.set(tagID, tagMap.get(tagID) + occurrenceWeight);
        } else {
          // If it's not, add it to the Map with a initial occurrence weight
          tagMap.set(tagID, occurrenceWeight);
        };
      };
    };
  };
  return {sectionMap, tagMap};
};

// * Step 3: Given the tagIDCountMap, determine the tagIDs that has the top `decisiveTagNumber` highest count value
//  * return a new Map object that contains the top 3 tagIDs (key) and their count value (value)
function findDecisiveTag(tagMap, decisiveTagNumber) {
  // Convert the Map to an array of key-value pairs and sort by count value in descending order
  const sortedPairs = Array.from(tagMap).sort((a, b) => b[1] - a[1]);
  // Create a new Map object from the sorted array
  const decisiveMap = new Map(sortedPairs.slice(0,decisiveTagNumber));
  return decisiveMap;
};

// * Step 4: Given the decisiveMap, find section IDs that contain these tags
//  * return an array of sectionIDs
async function findRelevantSections(decisiveMap) {
  // Create an array to store the sectionID that contains the tags
  var sectionIDArray = [];
  // Iterate through the decisiveMap
  for (const [key, value] of decisiveMap) {
    // find the section that satisfy the condition: the given tagID is in the tag array of the section
    const sections = await Section.find({ tagIDs: {$elemMatch: { $eq: key} }});
    if (sections.length > 0) {
      for (let i = 0, len = sections.length; i < len; i++){
        // Check if the section is already in the array
        if(!sectionIDArray.includes(sections[i].sectionID)){
          sectionIDArray.push(sections[i].sectionID);
        }
      };
    };
  };
  return sectionIDArray;
};

// * Step 5-1: Calculate shortest distance between tags using Dijkstra's algorithm
// Use Dijkstra's algorithm to calculate the shortest distance between two tags, return the distance
// All the tags are represented by its tag ID
// ! If the cost of each edge is not a constant number, the edge cost should be stored in the database
async function Dijkstra(tagIDArray, startTagID){
  var Distance = new Map();
  var LeastCostPath = new Array();

  // Initialization
  LeastCostPath.push(startTagID);
  Distance.set(startTagID, 0);
  const startTag = await Tag.find({tagID: startTagID});
  const startTagNeighborsID = startTag[0].neighbors;
  for (let i = 0; i < tagIDArray.length; i++){
    if (tagIDArray[i] != startTagID){
      if (startTagNeighborsID.includes(tagIDArray[i])) {
        // ! Cost of each edge is assumed to be 1
        Distance.set(tagIDArray[i], 1);
      } else {
        Distance.set(tagIDArray[i], Infinity);
      };
    };
  };

  // Main loop
  while (LeastCostPath.length < tagIDArray.length){
    var minDistance = Infinity;
    var minDistanceTagID = 0;
    for (let j = 0; j < tagIDArray.length; j++){
      // For tag that is not in the least cost path
      if (!LeastCostPath.includes(tagIDArray[j])){
        // Find the tag with the minimum distance from the start tag
        if (Distance.get(tagIDArray[j]) < minDistance){
          minDistance = Distance.get(tagIDArray[j]);
          minDistanceTagID = tagIDArray[j];
        };
      };
    };
    // Add the tag with the minimum distance to the least cost path
    LeastCostPath.push(minDistanceTagID);
    // Update the distance of the neighbors of the tag with the minimum distance
    const minDistanceTag = await Tag.find({tagID: minDistanceTagID});
    // Get ID of all neighbors of the tag with the minimum distance
    const minDistanceTagNeighborsID = minDistanceTag[0].neighbors;
    for (let k = 0; k < tagIDArray.length; k++){
      // For tag that is not in the least cost path
      if (!LeastCostPath.includes(tagIDArray[k])){
        // Update the distance of the neighbors of the tag with the minimum distance
        if (minDistanceTagNeighborsID.includes(tagIDArray[k])) {
          // New distance is either the old distance or the distance from the start tag to the tag with the minimum distance plus 1
          // ! Cost of each edge is assumed to be 1
          if (Distance.get(tagIDArray[k]) > minDistance + 1){
            // ! Cost of each edge is assumed to be 1
            Distance.set(tagIDArray[k], minDistance + 1);
          };
        };
      };
    };
  };

  return {Distance, LeastCostPath};
};

// * Step 5-2: Calculate the relevance score of each section
async function calculateRelevanceScore(sectionIDArray, decisiveMap){
  // Prepare for Dijkstra algorithm
  const tagCount = await Tag.countDocuments();
  var tagIDArray = Array.from({ length: tagCount }, (value, index) => index + 1);
  var decisiveTagIDArray = Array.from(decisiveMap.keys());
  var sumOfWeightedFrequency = 0;
  for (let key of decisiveMap.keys()) {
    sumOfWeightedFrequency += decisiveMap.get(key);
  };

  // Create a Map to store the sectionID (key) and the relevance score (value)
  var sectionRelevanceScoreMap = new Map();
  
  // ! This works when we only consider 1 decisive tag
  // Iterate trough decisiveTagIDArray
  for (let k = 0; k < decisiveTagIDArray.length; k++){

    // Get the shortest distance between the decisive tag and all other tags in the section
    const decisiveTagID = decisiveTagIDArray[k];
    const returns = await Dijkstra(tagIDArray, decisiveTagID);
    const DistanceMap = returns.Distance;
    console.log("Distance from tag ", decisiveTagID, " to other tags: ", DistanceMap);
    
    // Iterate through the sectionIDArray
    for (let i = 0; i < sectionIDArray.length; i++){
      const sectionID = sectionIDArray[i];
      // Get the section
      const section = await Section.find({sectionID: sectionID});
      // Get the tagIDs of the section
      const tagIDs = section[0].tagIDs;
  
      // Calculate the relevance score
      let relevanceScore = 0;
      for (let j = 0; j < tagIDs.length; j++){
        if(tagIDs[j] != decisiveTagID){
          // If the tag is not the decisive tag
          relevanceScore += 1/(DistanceMap.get(tagIDs[j])+1);
        } else {
          // If the tag is the decisive tag
          relevanceScore += 1;
        };
      };
      // For a decisive map with more than 1 tag (key), we need to assign each tag's influence such that it is proportional to the weighted frequecy of the tag
      // the proportional factor is (decisiveMap.get(decisiveTagID)/sumOfWeightedFrequency)
      relevanceScore = (decisiveMap.get(decisiveTagID)/sumOfWeightedFrequency)*(relevanceScore/(tagIDs.length));
      
      // Check if the section is already in the Map
      if (sectionRelevanceScoreMap.has(sectionID)){
        // If the section is already in the Map, add the relevance score to the existing relevance score
        relevanceScore += sectionRelevanceScoreMap.get(sectionID);
        sectionRelevanceScoreMap.set(sectionID, relevanceScore);
      } else {
        // otherwie insert a new sectionID and the relevance score pair in the Map
        sectionRelevanceScoreMap.set(sectionID, relevanceScore);
      };

    };
  
  };

  return sectionRelevanceScoreMap;
}

// * Step 6: Sort the sections by relevance score in descending order
async function sortSections(sectionRelevanceScoreMap){
  // Create an array to store the sectionID
  var rankedSectionIDArray = Array.from(sectionRelevanceScoreMap.keys());
  // Sort the sectionIDArray in descending order
  rankedSectionIDArray.sort(function(a, b){return sectionRelevanceScoreMap.get(b) - sectionRelevanceScoreMap.get(a)});
  return rankedSectionIDArray;
}

// * Main function
async function main() {
  const pages = await findPages("Google");
  console.log("contentMappedPages: ");
  console.log(pages.contentMappedPages);
  console.log("titleMappedPages: ");
  console.log(pages.titleMappedPages);

  // Create a Map to store the sectionID (key) and the count of the number of pages that are in the section (value)
  var sectionMap = new Map();
  // Create a Map to store the tagName (key) and the the occurrence frequency of such tag (value)
  var tagMap = new Map();
  var returns = await findSections(pages.contentMappedPages, 1, sectionMap, tagMap);
  returns = await findSections(pages.titleMappedPages, 2, returns.sectionMap, returns.tagMap);
  const sectionIDFrequencyMap = returns.sectionMap;
  const tagIDFrequencyMap = returns.tagMap;
  console.log("sectionIDFrequencyMap: ", sectionIDFrequencyMap);
  console.log("tagIDFrequencyMap: ", tagIDFrequencyMap);

  const decisiveMap = findDecisiveTag(tagIDFrequencyMap,3);
  console.log("decisiveMap: ", decisiveMap);

  const sectionIDArray = await findRelevantSections(decisiveMap);
  console.log("sectionIDArray: ", sectionIDArray);

  const sectionRelevanceScoreMap = await calculateRelevanceScore(sectionIDArray, decisiveMap);
  console.log("sectionRelevanceScoreMap: ", sectionRelevanceScoreMap);

  const rankedSectionIDArray = await sortSections(sectionRelevanceScoreMap);
  console.log("rankedSectionIDArray: ", rankedSectionIDArray);
};

main();


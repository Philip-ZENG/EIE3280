/**
 * @description
 * * Given a search string, return a list of sections that are relevant to the search string
 * * Use only the importance score to determine the rank of a section
 */

const mongoose = require('mongoose');
const mathjs = require('mathjs');

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
  content: [pageSchema],
  feedbackScore: { type: Number, default: 0 }
});

// Create a collection which is an instance of the tag schema
const Tag = mongoose.model("Tag", tagSchema);
// Create a colleciton which is an instance of the section schema
const Section = mongoose.model("Section", sectionSchema);
// Create a collection which is an instance of page schema 
const Page = mongoose.model("Page", pageSchema);


// ! ############### Map Search Word to Decisive Tags ###############

// * Step 1: Get all the pages whose `content` field or `title` field contain a specific search string
async function findPages(searchString) {
  const contentMappedPages = await Page.find({content: {$regex: new RegExp(searchString, 'i')}});
  const titleMappedPages = await Page.find({title: {$regex: new RegExp(searchString, 'i')}});
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
        // If sectionID is already a map key, increment the count
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


// ! ############### Compute Importance Score ###############

// * Step 1: Given the tagIDCountMap, determine the tagIDs that has the top `decisiveTagNumber` of highest count value
//  * return a new Map object that contains the top `decisiveTagNumber` of tagIDs (key) and their count value (value)
function findDecisiveTag(tagMap, decisiveTagNumber) {
  // Convert the Map to an array of key-value pairs and sort by count value in descending order
  const sortedPairs = Array.from(tagMap).sort((a, b) => b[1] - a[1]);
  // Create a new Map object from the sorted array
  const decisiveMap = new Map(sortedPairs.slice(0,decisiveTagNumber));
  return decisiveMap;
};

// * Step 2: Given the decisiveMap, find section IDs that contain these tags
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

// * Step 3: Calculate importance score of each tag
// * Step 3-1: compute the first matrix, H matrix in Google PageRank algorithm
async function get_H_Matrix(){
  // get all tags
  const allTags = await Tag.find();
  // get the number of tags
  const numTags = allTags.length;
  // initialize the H matrix
  const H = new Array(numTags);
  for (let i = 0; i < numTags; i++){
    H[i] = new Array(numTags);
    for (let j = 0; j < numTags; j++){
      H[i][j] = 0;
    }
  }

  // fill the H matrix
  for (let i = 0; i < numTags; i++){
    const neighbors = allTags[i].neighbors;
    const numNeighbors = neighbors.length;
    for (let j = 0; j < numNeighbors; j++){
      const neighborID = neighbors[j];
      // tagID starts from 1, but array index starts from 0
      H[i][neighborID-1] = 1 / numNeighbors;
    };
  };
  return mathjs.matrix(H);
};

// * Step 3-2: compute the second matrix, H bar matrix in Google PageRank algorithm
async function get_H_bar_Matrix(H){
  // since our tag graph is a undirected graph, so there is no dangling nodes (node with no out edges)
  // so we can just use the H matrix as the H bar matrix
  return H;
};

// * Step 3-3: compute the third matrix, Google Matrix in Google PageRank algorithm
async function get_Google_Matrix(H_bar, theta){
  const dimensions = H_bar._size;
  const numTags = dimensions[0];
  const oneMatrix = mathjs.ones(dimensions);
  const randomizationMatrix = mathjs.multiply(oneMatrix, (1-theta)*(1/numTags));
  const H_barTimesTheta = mathjs.multiply(H_bar, theta);
  const GoogleMatrix = mathjs.add(randomizationMatrix, H_barTimesTheta);
  return GoogleMatrix;
};

// * Step 3-4: compute the PageRank vector iteratively
async function get_PageRank_Vector(GoogleMatrix, epsilon){
  // initialize the PageRank vector
  const dimensions = GoogleMatrix._size;
  const numTags = dimensions[0];
  var PageRankVector = mathjs.ones(numTags);
  // Initialize the PageRank vector to be a vector of 1/numTags
  PageRankVector = mathjs.multiply(PageRankVector, 1/numTags);
  // initialize the previous PageRank vector
  var previousPageRankVector = mathjs.zeros(numTags);
  // initialize the difference between the current PageRank vector and the previous PageRank vector
  var difference = mathjs.subtract(PageRankVector, previousPageRankVector);

  // initialize the number of iterations
  var numIterations = 0;
  // iterate until the difference is smaller than epsilon
  while (mathjs.norm(difference) > epsilon){
    // update the previous PageRank vector
    previousPageRankVector = PageRankVector;
    // update the current PageRank vector
    PageRankVector = mathjs.multiply(PageRankVector, GoogleMatrix);
    // update the difference
    difference = mathjs.subtract(PageRankVector, previousPageRankVector);
    // update the number of iterations
    numIterations++;
  };

  console.log("Number of iterations: " + numIterations);

  return PageRankVector;
};

// * Step 3-5: compute the importance score of each tag
async function calculateTagImportanceScore(){
  const H = await get_H_Matrix();
  // console.log(H);

  const H_bar = await get_H_bar_Matrix(H);
  // console.log(H_bar);

  const GoogleMatrix = await get_Google_Matrix(H_bar, 0.85);
  // console.log(GoogleMatrix);

  const PageRankVector = await get_PageRank_Vector(GoogleMatrix, 0.0001);
  console.log(PageRankVector);

  // the importance score vector (pageRank vector) is small, so we may need to scale it up
  // const scaledPageRankVector = mathjs.multiply(PageRankVector, 2);
  // console.log(scaledPageRankVector);

  // convert the pageRank vector to a map
  const tagCount = await Tag.countDocuments();
  var tagIDArray = Array.from({ length: tagCount }, (value, index) => index + 1);
  var tagImportanceScoreMap = new Map();
  for (let i = 0; i < tagCount; i++){
    tagImportanceScoreMap.set(tagIDArray[i], PageRankVector._data[i]);
  };

  return tagImportanceScoreMap;
};


// * Step 4: Use importance score as the only factor to calculate the relevance score
async function calculateRelevanceScore(sectionIDArray, decisiveMap){
  // Get the sum of weighted frequency of all decisive tags
  var decisiveTagIDArray = Array.from(decisiveMap.keys());
  var sumOfWeightedFrequency = 0;
  for (let key of decisiveMap.keys()) {
    sumOfWeightedFrequency += decisiveMap.get(key);
  };

  // Create a Map to store the sectionID (key) and the relevance score (value)
  var sectionRelevanceScoreMap = new Map();

  const tagImportanceScoreMap = await calculateTagImportanceScore();
  
  // ! This works even when multiple decisive tag is used
  // Iterate trough decisiveTagIDArray
  for (let k = 0; k < decisiveTagIDArray.length; k++){

    // Get the shortest distance between the decisive tag and all other tags in the section
    const decisiveTagID = decisiveTagIDArray[k];
    
    // Iterate through the sectionIDArray
    for (let i = 0; i < sectionIDArray.length; i++){
      const sectionID = sectionIDArray[i];
      // Get the section
      const section = await Section.find({sectionID: sectionID});
      // Get the tagIDs of the section
      const tagIDs = section[0].tagIDs;
  
      // Calculate the relevance score
      // The relevance score is the sum of the inverse of the distance between the tag and the decisive tag
      // * Use importance score as weight to calculate relevance score
      // ! Notice: If some tag is not reachable from the decisive tag, the distance between them is Infinity; 1/(Infinity+1) = 0
      let relevanceScore = 0;
      for (let j = 0; j < tagIDs.length; j++){
        relevanceScore += 10 * tagImportanceScoreMap.get(tagIDs[j]);
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
};


// ! ############### User Feedback Mechanism & RankScore Calculation ###############
// * Step 1: Update the feedback score of each section
async function updateFeedbackScore(sectionID, isHelpful){
  var result = await Section.find({sectionID: sectionID}).select({feedbackScore:1, _id:0});
  var feedbackScore = result[0].feedbackScore;
  if(isHelpful){
    feedbackScore += 1;
  } else {
    feedbackScore -= 1;
  };
  await Section.updateOne({sectionID: sectionID},{feedbackScore: feedbackScore});
};

// * Helper Function: Random feedback generator
// Generate random feedbacks (true: helpful, false: not helpful)
async function generateRandomFeedback(sectionRelevanceScoreMap, numOfFeedback) {
  const keys = Array.from( sectionRelevanceScoreMap.keys() );
  for (let i=0; i<numOfFeedback; i++) {
    const keyLength = keys.length;
    // select a random key from the sectionRelevanceScoreMap
    const randomIndex = Math.floor(Math.random() * keyLength);
    const key = keys[randomIndex];
    // Give a random feedback
    const isHelpful = Math.random() >= 0.5;
    await updateFeedbackScore(key, isHelpful);
  };
};

// * Step 2: Calculate the rank score of each section, rank score = relevance score + feedback score
async function calculateRankScore(sectionRelevanceScoreMap){
  // Create a Map to store the sectionID (key) and the rank score (value)
  var sectionRankScoreMap = new Map();
  // Iterate through the sectionRelevanceScoreMap
  for (let key of sectionRelevanceScoreMap.keys()) {
    // Get the feedback score of the section
    let result = await Section.find({sectionID: key}).select({feedbackScore:1, _id:0});
    let feedbackScore = result[0].feedbackScore;
    // Set an upper bound for the feedback score, upper bound = 100
    if (feedbackScore > 100){
      feedbackScore = 100;
    };
    // Set a lower bound for the feedback score, lower bound = -100
    if (feedbackScore < -100){
      feedbackScore = -100;
    };
    // Calculate the rank score, the influence of the feedback score reflected in rankScore is between -100/300 to 100/300
    let rankScore = sectionRelevanceScoreMap.get(key) + feedbackScore/300;
    // Insert the sectionID and the rank score pair in the Map
    sectionRankScoreMap.set(key, rankScore);
  };
  return sectionRankScoreMap;
};

// ! ############### Use Inverse Term Frequency to Adjust Rank Score ###############
// * Step 1: Calculate the inverse document frequency of a search string word
async function calculateLogCount(searchString) {
  // define a set to record the pages that contains the search string
  const visitedPages = new Set();
  // define the counter
  let count = 0;
  // define a set that has all the pages
  const pages = await Page.find({});

  // iterate through all the pages
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    // check if this page has already been visited
    if (visitedPages.has(page.pageID)) {
      continue;
    }
    // seach the string in this page
    if (page.content.includes(searchString)) {
      count++;
      visitedPages.add(page.pageID);
    }
  }

  // return the lnx number
  return Math.log(count/pages.length);
}

// ! ############### Rank Sections based on RankScore ###############
// * Step 1: Sort the sections by rank score in descending order
async function sortSections(sectionRankScoreMap){
  // Create an array to store the sectionID
  var rankedSectionIDArray = Array.from(sectionRankScoreMap.keys());
  // Sort the sectionIDArray in descending order
  rankedSectionIDArray.sort(function(a, b){return sectionRankScoreMap.get(b) - sectionRankScoreMap.get(a)});
  return rankedSectionIDArray;
};


// * Main function
async function main() {
  var string = "movie rating";
  var wordsList=string.split(' ');
  // Create a Map to store the sectionID (key) and the count of the number of pages that are in the section (value)
  var sectionMap = new Map();
  // Create a Map to store the tagName (key) and the the occurrence frequency of such tag (value)
  var tagMap = new Map();
  // Final rank score map of all words in input string
  var listRankScorMap = new Map();
  
  for (var word of wordsList) {
    // ! #### Map Search Word to Decisive Tags #####
    const pages = await findPages(word);
    var returns = await findSections(pages.contentMappedPages, 1, sectionMap, tagMap);
    returns = await findSections(pages.titleMappedPages, 2, returns.sectionMap, returns.tagMap);
    const sectionIDFrequencyMap = returns.sectionMap;
    const tagIDFrequencyMap = returns.tagMap;

    // ! #### Compute Relevance Score ####
    console.log("sectionIDFrequencyMap: ", sectionIDFrequencyMap);
    console.log("tagIDFrequencyMap: ", tagIDFrequencyMap);

    const decisiveMap = findDecisiveTag(tagIDFrequencyMap,3);
    console.log("decisiveMap: ", decisiveMap);

    const sectionIDArray = await findRelevantSections(decisiveMap);
    console.log("sectionIDArray: ", sectionIDArray);

    const sectionRelevanceScoreMap = await calculateRelevanceScore(sectionIDArray, decisiveMap);
    console.log("sectionRelevanceScoreMap: ", sectionRelevanceScoreMap);

    // ! #### User Feedback Mechanism & RankScore Calculation ####
    await generateRandomFeedback(sectionRelevanceScoreMap, 10);

    const rankScoreMap = await calculateRankScore(sectionRelevanceScoreMap);
    console.log("rankScore: ", rankScoreMap);

    // ! #### Use Inverse Term Frequency to Adjust RankScore ####
    // var inverseCount = await calculateLogCount(word);

    // for (let [key,value] of rankScoreMap) {
    //   value *= inverseCount;
    //   rankScoreMap.set(key,value);
    // }

    for (let [key,value] of rankScoreMap) {
      if (listRankScorMap.has(key)) {
        value+=listRankScorMap.get(key);
        listRankScorMap.set(key,value);
      }
      else {
        listRankScorMap.set(key,value);
      }
    }

    sectionMap.clear();
    tagMap.clear();

  }

  // ! #### Rank Sections based on RankScore ####
  const rankedSectionIDArray = await sortSections(listRankScorMap);
  console.log("rankedSectionIDArray: ", rankedSectionIDArray);

  mongoose.disconnect();
};

main();
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/courseDB");

// Schema for a tag (the abstract representation is a node), nodes would form a graph that represents the relationship betweeen tags
const tagSchema = new mongoose.Schema ({
  tagID: Number,
  tagName: String,
  prerequisite: [String]
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
  content: [pageSchema]
});

// Create a collection which is an instance of the tag schema
const Tag = mongoose.model("Tag", tagSchema);
// Create a colleciton which is an instance of the section schema
const Section = mongoose.model("Section", sectionSchema);
// Create a collection which is an instance of page schema 
const Page = mongoose.model("Page", pageSchema);


// ############### Query Data ###############
async function queryData() {
  // make query
  const tags = await Tag.find();
  // close connection
  mongoose.disconnect();
  // print data we get
  tags.forEach(function(tag) {
    console.log(tag.tagName);
  });
};

// * Step 1: Get all the pages whose `content` field contain a specific search string
async function findPages(searchString) {
  const pages = await Page.find({content: {$regex: searchString}});
  return pages;
};

// * Step 2: Given an array of page objects, 
//   * find the corresponding sections that contain these pages, count their occurrence frequency
//   * count the occurrence frequency of tags in these sections
async function findSections(pages) {
  // Create a Map to store the sectionID (key) and the count of the number of pages that are in the section (value)
  var sectionMap = new Map();
  // Create a Map to store the tagName (key) and the the occurrence frequency of such tag (value)
  var tagMap = new Map();
  // Iterate trough `pages`
  for (var i = 0, len = pages.length; i < len; i++) {
    // find the section that satisfy the condition: the given pageID is in the page array of the section
    const sections = await Section.find({ page: { $elemMatch: { $eq: pages[i].pageID } } });
    if (sections.length > 0) {

      // Count occurrence frequency of sections
      let sectionID = sections[0].sectionID;
      if (sectionMap.has(sectionID)) {
        // If it is, increment the count
        sectionMap.set(sectionID, sectionMap.get(sectionID) + 1);
      } else {
        // If it's not, add it to the Map with a count of 1
        sectionMap.set(sectionID, 1);
      };

      // Count occurrence frequency of tags
      let tags = sections[0].tag;
      for (var j = 0, len = tags.length; j < len; j++) {
        let tagID = tags[j].tagID;
        if (tagMap.has(tagID)) {
          // If it is, increment the count
          tagMap.set(tagID, tagMap.get(tagID) + 1);
        } else {
          // If it's not, add it to the Map with a count of 1
          tagMap.set(tagID, 1);
        };
      };
    };
  };
  return {sectionMap, tagMap};
};

// * Step 3: Given the tagIDCountMap, determine the tagIDs that has the top 3 highest count value
function findDecisiveTag(tagMap) {
  // Convert the Map to an array of key-value pairs and sort by count value in descending order
  const sortedPairs = Array.from(tagMap).sort((a, b) => b[1] - a[1]);
  // Create a new Map object from the sorted array
  const decisiveMap = new Map(sortedPairs.slice(0,3));
  return decisiveMap;
};


// * Main function
async function main() {
  const pages = await findPages("Google");
  console.log(pages);

  const returns = await findSections(pages);
  const sectionIDCountMap = returns["countMap"];
  const tagIDCountMap = returns["tagMap"];
  console.log(sectionIDCountMap);
  console.log(tagIDCountMap);

  const decisiveMap = findDecisiveTag(tagIDCountMap);
  console.log(decisiveMap);
};

main();


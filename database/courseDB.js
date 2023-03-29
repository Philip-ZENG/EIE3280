const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/courseDB");

// Schema for each page
const sectionSchema = new mongoose.Schema ({
  sectionID: Number,
  chapter: Number,
  page: [Number],
  tag: [tagSchema],
  content: String
});

// Schema for a tag (the abstract representation is a node), nodes would form a graph that represents the relationship betweeen tags
const tagSchema = new mongoose.Schema ({
  tagID: Number,
  tagName: String,
  prerequisite: [tagSchema]
});

// Create a collection which is an instance of the tag schema
const Tag = mongoose.model("Tag", tagSchema);
// Create a colleciton which is an instance of the page schema
const Section = mongoose.model("Page", sectionSchema);

// #################### Define pages ####################
const section1 = new Section({
  sectionID: 1,
  chapter: 1,
  page: [1,2,3,4],
  tag: ["CDMA","Celular Network"],
  content: ""
});

const section2 = new Section({
  sectionID: 2,
  chapter: 1,
  page: [5,6,7,8],
  tag: ["Pricing"],
  content: ""
});


// #################### Define tags ####################
const tag1 = new Tag({
  tagID: 1,
  tagName: "CDMA",
  prerequisite: ["Concave Function"]
});


async function insertNewData() {
  // Insert the new document into the collectioin
  await Fruit.create([apple, kiwi, orange, banana]);
  // await Fruit.create([apple]);
  console.log("Successfuly insert new data");
  mongoose.disconnect();
}

// insertNewData();
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/tagGraphDB");

// Schema for a tag (the abstract representation is a node), nodes would form a graph that represents the relationship betweeen tags
const tagSchema = new mongoose.Schema ({
  tagID: Number,
  tagName: String,
  neighbors: [Number]
});

// Create a collection which is an instance of the tag schema
const Tag = mongoose.model("Tag", tagSchema);

// ******************** Calculate Shortest Distance ********************
// Use Dijkstra's algorithm to calculate the shortest distance between two tags, return the distance
// Each input is an object following tagSchema
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
  for (var i = 0; i < tagIDArray.length; i++){
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
    for (var i = 0; i < tagIDArray.length; i++){
      // For tag that is not in the least cost path
      if (!LeastCostPath.includes(tagIDArray[i])){
        // Find the tag with the minimum distance from the start tag
        if (Distance.get(tagIDArray[i]) < minDistance){
          minDistance = Distance.get(tagIDArray[i]);
          minDistanceTagID = tagIDArray[i];
        };
      };
    };

    // If minDistance is Infinity, and miniDistanceTagID is 0, it means there is no path to reach the rest of the tags 
    // (No any other connected nodes); Return the results
    if(minDistance == Infinity && minDistanceTagID == 0){
      console.log("No path to reach the rest of the tags");
      return {Distance, LeastCostPath};
    }

    // Add the tag with the minimum distance to the least cost path
    LeastCostPath.push(minDistanceTagID);
    // Update the distance of the neighbors of the tag with the minimum distance
    const minDistanceTag = await Tag.find({tagID: minDistanceTagID});
    console.log(minDistanceTag);
    // Get ID of all neighbors of the tag with the minimum distance
    const minDistanceTagNeighborsID = minDistanceTag[0].neighbors;
    for (var i = 0; i < tagIDArray.length; i++){
      // For tag that is not in the least cost path
      if (!LeastCostPath.includes(tagIDArray[i])){
        // Update the distance of the neighbors of the tag with the minimum distance
        if (minDistanceTagNeighborsID.includes(tagIDArray[i])) {
          // New distance is either the old distance or the distance from the start tag to the tag with the minimum distance plus 1
          // ! Cost of each edge is assumed to be 1
          if (Distance.get(tagIDArray[i]) > minDistance + 1){
            // ! Cost of each edge is assumed to be 1
            Distance.set(tagIDArray[i], minDistance + 1);
          };
        };
      };
    };
  };

  return {Distance, LeastCostPath};
};

async function main() {
  const tagCount = await Tag.countDocuments();
  console.log(tagCount);

  let tagIDArray = Array.from({ length: tagCount }, (value, index) => index + 1);
  console.log(tagIDArray);

  const Result = await Dijkstra(tagIDArray, 88);
  console.log(Result.Distance);
  console.log(Result.LeastCostPath);

  mongoose.disconnect();
};

main();
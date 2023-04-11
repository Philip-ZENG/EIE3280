const mongoose = require('mongoose');
const mathjs = require('mathjs');

mongoose.connect("mongodb://127.0.0.1:27017/courseDB");

// Schema for a tag (the abstract representation is a node), nodes would form a graph that represents the relationship betweeen tags
const tagSchema = new mongoose.Schema ({
  tagID: Number,
  tagName: String,
  neighbors: [Number]
});

// Create a collection which is an instance of the tag schema
const Tag = mongoose.model("Tag", tagSchema);

// ! ####################### Compute Importance Score ####################### 

// * Step 1: compute the first matrix, H matrix in Google PageRank algorithm
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

// * Step 2: compute the second matrix, H bar matrix in Google PageRank algorithm
async function get_H_bar_Matrix(H){
  // since our tag graph is a undirected graph, so there is no dangling nodes (node with no out edges)
  // so we can just use the H matrix as the H bar matrix
  return H;
};

// * Step 3: compute the third matrix, Google Matrix in Google PageRank algorithm
async function get_Google_Matrix(H_bar, theta){
  const dimensions = H_bar._size;
  const numTags = dimensions[0];
  const oneMatrix = mathjs.ones(dimensions);
  const randomizationMatrix = mathjs.multiply(oneMatrix, (1-theta)*(1/numTags));
  const H_barTimesTheta = mathjs.multiply(H_bar, theta);
  const GoogleMatrix = mathjs.add(randomizationMatrix, H_barTimesTheta);
  return GoogleMatrix;
};

// * Step 4: compute the PageRank vector iteratively
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

// main function
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

// ! ####################### Compute Relevance Score #######################

// * Step 1-1: Use Dijkstra's algorithm to compute the shortest path between two tags
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

// * Step 1-2: Compute the TagRelevanceScore Map
async function calculateTagRelevanceScore(decisiveMap) {
  const tagRelevanceScoreMap = new Map();

  // Prepare for Dijkstra algorithm
  const tagCount = await Tag.countDocuments();
  var tagIDArray = Array.from({ length: tagCount }, (value, index) => index + 1);
  var decisiveTagIDArray = Array.from(decisiveMap.keys());
  
  // Iterate through all decisive tags
  for (let k = 0; k < decisiveTagIDArray.length; k++){
    // Get the shortest distance between the decisive tag and all other tags in the section
    const decisiveTagID = decisiveTagIDArray[k];
    const returns = await Dijkstra(tagIDArray, decisiveTagID);
    const DistanceMap = returns.Distance;
    console.log("Distance from tag ", decisiveTagID, " to other tags: ", DistanceMap);

    // Iterate through all tags in tagIDArray, compute the relevance score of each tag, and update the tagRelevanceScoreMap
    for (let i = 0; i < tagIDArray.length; i++){
      // Get the tagID
      const tagID = tagIDArray[i];
      // Get the distance between the decisive tag and the tag in tagIDArray
      const distance = DistanceMap.get(tagID);
      // Compute the relevance score of the tag in tagIDArray
      const relevanceScore = 1 / (distance+1);
      // Update the tagRelevanceScoreMap
      if (tagRelevanceScoreMap.has(tagID)){
        tagRelevanceScoreMap.set(tagID, tagRelevanceScoreMap.get(tagID) + relevanceScore);
      } else {
        tagRelevanceScoreMap.set(tagID, relevanceScore);
      };
    }
  };
  return tagRelevanceScoreMap;
};

// ! ####################### Compute Recommendation Score #######################

// * Step 1: use the importance score and relevance score to compute the recommendation score
async function computeRecommendationScore(tagImportanceScoreMap, tagRelevanceScoreMap){
  const recommendationScoreMap = new Map();

  // Iterate through all tags
  const tagCount = await Tag.countDocuments();
  var tagIDArray = Array.from({ length: tagCount }, (value, index) => index + 1);
  for (let i = 0; i < tagIDArray.length; i++){
    // Get the tagID
    const tagID = tagIDArray[i];
    // Get the importance score of the tag
    const importanceScore = tagImportanceScoreMap.get(tagID);
    // Get the relevance score of the tag
    const relevanceScore = tagRelevanceScoreMap.get(tagID);
    // Compute the recommendation score of the tag
    const recommendationScore = importanceScore * relevanceScore;
    // Update the recommendationScoreMap
    recommendationScoreMap.set(tagID, recommendationScore);
  };

  return recommendationScoreMap;
};

// * step 2: sort the tagIDs based on the recommendation score in descending order
async function sortRecommendationScore(recommendationScoreMap){
  const sortedRecommendationScoreMap = new Map([...recommendationScoreMap.entries()].sort((a, b) => b[1] - a[1]));
  return sortedRecommendationScoreMap;
};

// ! ####################### Main #######################
async function main(){
  // decisiveMap:  Map(3) { 24 => 5, 26 => 5, 27 => 3 }
  // decisiveMap can be retrieved from the front-end cross-component storage
  const decisiveMap = new Map();
  decisiveMap.set(24, 5);
  decisiveMap.set(26, 5);
  decisiveMap.set(27, 3);


  // * Step 1: Compute the tagImportanceScoreMap
  const tagImportanceScoreMap = await calculateTagImportanceScore();
  console.log("Tag Importance Score: ", tagImportanceScoreMap);

  // * Step 2: Compute the tagRelevanceScoreMap
  const tagRelevanceScoreMap = await calculateTagRelevanceScore(decisiveMap);
  console.log("Tag Relevance Score: ", tagRelevanceScoreMap);

  // * Step 3: Compute the recommendationScoreMap
  const recommendationScoreMap = await computeRecommendationScore(tagImportanceScoreMap, tagRelevanceScoreMap);
  console.log("Recommendation Score: ", recommendationScoreMap);

  // * Step 4: Sort the recommendationScoreMap
  const sortedRecommendationScoreMap = await sortRecommendationScore(recommendationScoreMap);
  console.log("Sorted Recommendation Score: ", sortedRecommendationScoreMap);

  // * Step 5: Select the top 10 tags
  const top10RecommendationTags = Array.from(sortedRecommendationScoreMap.keys()).slice(0, 10);
  console.log("Top 10 Tags: ", top10RecommendationTags);
};

main();
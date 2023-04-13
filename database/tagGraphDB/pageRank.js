const mongoose = require('mongoose');
const mathjs = require('mathjs');

mongoose.connect("mongodb://127.0.0.1:27017/tagGraphDB");

// Schema for a tag (the abstract representation is a node), nodes would form a graph that represents the relationship betweeen tags
const tagSchema = new mongoose.Schema ({
  tagID: Number,
  tagName: String,
  neighbors: [Number]
});

// Create a collection which is an instance of the tag schema
const Tag = mongoose.model("Tag", tagSchema);

// compute the first matrix, H matrix in Google PageRank algorithm
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

// compute the second matrix, H bar matrix in Google PageRank algorithm
async function get_H_bar_Matrix(H){
  // since our tag graph is a undirected graph, so there is no dangling nodes (node with no out edges)
  // so we can just use the H matrix as the H bar matrix
  return H;
};

// compute the third matrix, Google Matrix in Google PageRank algorithm
async function get_Google_Matrix(H_bar, theta){
  const dimensions = H_bar._size;
  const numTags = dimensions[0];
  const oneMatrix = mathjs.ones(dimensions);
  const randomizationMatrix = mathjs.multiply(oneMatrix, (1-theta)*(1/numTags));
  const H_barTimesTheta = mathjs.multiply(H_bar, theta);
  const GoogleMatrix = mathjs.add(randomizationMatrix, H_barTimesTheta);
  return GoogleMatrix;
};

// compute the PageRank vector iteratively
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
async function main(){
  const H = await get_H_Matrix();
  // console.log(H);

  const H_bar = await get_H_bar_Matrix(H);
  // console.log(H_bar);

  const GoogleMatrix = await get_Google_Matrix(H_bar, 0.85);
  // console.log(GoogleMatrix);

  const PageRankVector = await get_PageRank_Vector(GoogleMatrix, 0.0001);
  console.log(PageRankVector);

  // the importance score vector (pageRank vector) is small, so we may need to scale it up
  const scaledPageRankVector = mathjs.multiply(PageRankVector, 2);
  console.log(scaledPageRankVector);
};

main();
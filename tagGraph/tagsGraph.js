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


// ******************** Define tags ********************
// ! Note: the tagID is inconsistant with that in courseDB.js
const Cosine = new Tag({
  tagID: 1,
  tagName: "Cosine",
  neighbors: [2]
});

const SimilarityMatrix = new Tag({
  tagID: 2,
  tagName: "Similarity Matrix",
  neighbors: [1,3]
});

const NeighborhoodMethod = new Tag({
  tagID: 3,
  tagName: "Neighborhood Method",
  neighbors: [2,5,6]
});

const ContentBasedFilter = new Tag({
  tagID: 4,
  tagName: "Content Based Filter",
  neighbors: [5]
});

const Netflix = new Tag({
  tagID: 5,
  tagName: "Netflix",
  neighbors: [3,4,7]
});

const NeighborhoodPredictor = new Tag({
  tagID: 6,
  tagName: "Neighborhood Predictor",
  neighbors: [3,8]
});

const CollaborativeFiltering = new Tag({
  tagID: 7,
  tagName: "Collaborative Filtering",
  neighbors: [5,8,9]
});

const BaselinePredictor = new Tag({
  tagID: 8,
  tagName: "Baseline Predictor",
  neighbors: [6,7,10,11]
});

const RootMeanSquareError = new Tag({
  tagID: 9,
  tagName: "Root Mean Square Error",
  neighbors: [7,12]
});

const ConvexOptimization = new Tag({
  tagID: 10,
  tagName: "Convex Optimization",
  neighbors: [8,23]
});

const ErrorMatrix = new Tag({
  tagID: 11,
  tagName: "Error Matrix",
  neighbors: [8]
});

const MatrixDerivative = new Tag({
  tagID: 12,
  tagName: "Matrix Derivative",
  neighbors: [9,23]
});

const IncomingLinks = new Tag({
  tagID: 13,
  tagName: "Incoming Links",
  neighbors: [14,15]
});

const Webpages = new Tag({
  tagID: 14,
  tagName: "Webpages",
  neighbors: [13,16,17]
});

const HMatrix = new Tag({
  tagID: 15,
  tagName: "H Matrix",
  neighbors: [13,16,20]
});

const OutgoingLinks = new Tag({
  tagID: 16,
  tagName: "Outgoing Links",
  neighbors: [14,15]
});

const PageRankAlgorthm = new Tag({
  tagID: 17,
  tagName: "Page Rank Algorthm",
  neighbors: [14,20,24]
});

const HHatMatrix = new Tag({
  tagID: 18,
  tagName: "H Hat Matrix",
  neighbors: [20]
});

const GoogleMatrix = new Tag({
  tagID: 19,
  tagName: "Google Matrix",
  neighbors: [20]
});

const ImportanceScore = new Tag({
  tagID: 20,
  tagName: "Importance Score",
  neighbors: [15,17,18,19,21,22]
});

const EigenVector = new Tag({
  tagID: 21,
  tagName: "Eigen Vector",
  neighbors: [20,23]
});

const MatrixOperation = new Tag({
  tagID: 22,
  tagName: "Matrix Operation",
  neighbors: [20,23,28]
});

const LinearAlgebra = new Tag({
  tagID: 23,
  tagName: "Linear Algebra",
  neighbors: [10,12,21,22]
});

const Google = new Tag({
  tagID: 24,
  tagName: "Google",
  neighbors: [17,26,27]
});

const ClickthroughRate = new Tag({
  tagID: 25,
  tagName: "Clickthrough Rate",
  neighbors: [26]
});

const AdvertisementSpace = new Tag({
  tagID: 26,
  tagName: "Advertisement Space",
  neighbors: [24,25,27]
});

const Auction = new Tag({
  tagID: 27,
  tagName: "Auction",
  neighbors: [24,26,28,29,30,31,32,33,34,44]
});

const SecondPriceAuction = new Tag({
  tagID: 28,
  tagName: "Second Price Auction",
  neighbors: [22,27]
});

const MultipleItemAuction = new Tag({
  tagID: 29,
  tagName: "Multiple Item Auction",
  neighbors: [27]
});

const OpenAuction = new Tag({
  tagID: 30,
  tagName: "Open Auction",
  neighbors: [27]
});

const Externality = new Tag({
  tagID: 31,
  tagName: "Externality",
  neighbors: [27]
});

const SingleItemAuction = new Tag({
  tagID: 32,
  tagName: "Single Item Auction",
  neighbors: [27]
});

const SealedEnvelopAuction = new Tag({
  tagID: 33,
  tagName: "Sealed Envelop Auction",
  neighbors: [27]
});

const TruthfulBidding = new Tag({
  tagID: 34,
  tagName: "Truthful Bidding",
  neighbors: [27,35]
});

const IndependentValuation = new Tag({
  tagID: 35,
  tagName: "Independent Valuation",
  neighbors: [34]
});

const FDMA = new Tag({
  tagID: 36,
  tagName: "FDMA",
  neighbors: [37,38]
});

const TDMA = new Tag({
  tagID: 37,
  tagName: "TDMA",
  neighbors: [36,38]
});

const CDMA = new Tag({
  tagID: 38,
  tagName: "CDMA",
  neighbors: [36,37,39,40]
});

const Wireless = new Tag({
  tagID: 39,
  tagName: "Wireless",
  neighbors: [38,40]
});

const Inference = new Tag({
  tagID: 40,
  tagName: "Inference",
  neighbors: [38,39,41,42,43]
});

const NearFarProblem = new Tag({
  tagID: 41,
  tagName: "Near Far Problem",
  neighbors: [40]
});

const DPC = new Tag({
  tagID: 42,
  tagName: "DPC",
  neighbors: [40,43,44,45]
});

const SIR = new Tag({
  tagID: 43,
  tagName: "SIR",
  neighbors: [40,42]
});

const GameTheory = new Tag({
  tagID: 44,
  tagName: "Game Theory",
  neighbors: [27,42,48]
});

const Optimization = new Tag({
  tagID: 45,
  tagName: "Optimization",
  neighbors: [42,46,47]
});

const Infeasible = new Tag({
  tagID: 46,
  tagName: "Infeasible",
  neighbors: [45]
});

const Feasible = new Tag({
  tagID: 47,
  tagName: "Feasible",
  neighbors: [45]
});

const Equilibrium = new Tag({
  tagID: 48,
  tagName: "Equilibrium",
  neighbors: [44]
});

// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Tag.create([Cosine, SimilarityMatrix, NeighborhoodMethod, ContentBasedFilter, Netflix, NeighborhoodPredictor, CollaborativeFiltering, BaselinePredictor, RootMeanSquareError]);
  await Tag.create([ConvexOptimization, ErrorMatrix, MatrixDerivative, IncomingLinks, Webpages, HMatrix, OutgoingLinks, PageRankAlgorthm, HHatMatrix, GoogleMatrix, ImportanceScore]);
  await Tag.create([EigenVector, MatrixOperation, LinearAlgebra, Google, ClickthroughRate, AdvertisementSpace, Auction, SecondPriceAuction, MultipleItemAuction, OpenAuction, Externality]);
  await Tag.create([SingleItemAuction, SealedEnvelopAuction, TruthfulBidding, IndependentValuation, FDMA, TDMA, CDMA, Wireless, Inference, NearFarProblem, DPC, SIR, GameTheory, Optimization, Infeasible, Feasible, Equilibrium]);
  console.log("Successfuly insert new data");
  mongoose.disconnect();
};


insertNewData();
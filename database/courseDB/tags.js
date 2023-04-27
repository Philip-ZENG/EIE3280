/**
 * @description
 * * EIE3280 Slides Tags Database
 */


const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/courseDB");

// Schema for a tag (the abstract representation is a node), nodes would form a graph that represents the relationship betweeen tags
// neighbors fild is an array of tagIDs
const tagSchema = new mongoose.Schema ({
  tagID: Number,
  tagName: String,
  neighbors: [Number]
});

// Create a collection which is an instance of the tag schema
const Tag = mongoose.model("Tag", tagSchema);

// ******************** Define tags ********************
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
  neighbors: [3,4,7,24,49,130]
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
  neighbors: [13,16,20,112]
});

const OutgoingLinks = new Tag({
  tagID: 16,
  tagName: "Outgoing Links",
  neighbors: [14,15,109]
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
  neighbors: [20,101,112]
});

const ImportanceScore = new Tag({
  tagID: 20,
  tagName: "Importance Score",
  neighbors: [15,17,18,19,21,22,101]
});

const EigenVector = new Tag({
  tagID: 21,
  tagName: "Eigen Vector",
  neighbors: [20,23,101]
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
  neighbors: [17,26,27,5,49,130]
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
  neighbors: [44,92]
});

const Amazon = new Tag({
  tagID: 49,
  tagName: "Amazon",
  neighbors: [5,24,130,90]
});

const Wikipedia = new Tag({
  tagID: 50,
  tagName: "Wikipedi",
  neighbors: [71,72,90]
});

const Rating = new Tag({
  tagID: 51,
  tagName: "Rating",
  neighbors: [52,53,54,55,65]
});

const GaltonsExperiment = new Tag({
  tagID: 52,
  tagName: "Galton Experiment",
  neighbors: [51,53]
});

const Average = new Tag({
  tagID: 53,
  tagName: "Average",
  neighbors: [51,52,55,56,58,59,64,113]
});

const Rank = new Tag({
  tagID: 54,
  tagName: "Rank",
  neighbors: [51,57,65]
});

const Review= new Tag({
  tagID: 55,
  tagName: "Review",
  neighbors: [51,53,54,56,57,65]
});

const Independent = new Tag({
  tagID: 56,
  tagName: "Independent",
  neighbors: [51,53,55]
});

const Unbiased = new Tag({
  tagID: 57,
  tagName: "Unbiased",
  neighbors: [54,55,58]
});

const Correct = new Tag({
  tagID: 58,
  tagName: "Correct",
  neighbors: [57,53,59,60,61,133]
});

const Estimate = new Tag({
  tagID: 59,
  tagName: "Estiomate",
  neighbors: [53,58,60,61,62]
});

const Error = new Tag({
  tagID: 60,
  tagName: "Error",
  neighbors: [58,59,61,133]
});

const AE = new Tag({
  tagID: 61,
  tagName: "AE",
  neighbors: [58,59,60,62,64,63]
});

const MSE = new Tag({
  tagID: 62,
  tagName: "MSE",
  neighbors: [59,61]
});

const Dependent = new Tag({
  tagID: 63,
  tagName: "Dependent",
  neighbors: [61,64,133,66,93,94]
});

const Parital = new Tag({
  tagID: 64,
  tagName: "Parital",
  neighbors: [53,61,63]
});

const Bayesian = new Tag({
  tagID: 65,
  tagName: "Bayesian",
  neighbors: [51,54,55,69,68,131,96,97,94,93]
});

const Probability = new Tag({
  tagID: 66,
  tagName: "Probability",
  neighbors: [68,69,67,131,65,94,93,95]
});

const Extimation = new Tag({
  tagID: 67,
  tagName: "Extimation",
  neighbors: [65,66,131]
});

const Pdf = new Tag({
  tagID: 68,
  tagName: "Pdf",
  neighbors: [65,66,69,70]
});

const Noramlization = new Tag({
  tagID: 69,
  tagName: "Normalization",
  neighbors: [65,66,68,70]
});

const Time = new Tag({
  tagID: 70,
  tagName: "Google Matrix",
  neighbors: [68,69]
});

const Limitation = new Tag({
  tagID: 71,
  tagName: "Limitation",
  neighbors: [50,72]
});

const Consesus = new Tag({
  tagID: 72,
  tagName: "Consesus",
  neighbors: [50,71]
});

const Challange = new Tag({
  tagID: 73,
  tagName: "Challange",
  neighbors: [74,75]
});

const Page = new Tag({
  tagID: 74,
  tagName: "Page",
  neighbors: [73,75]
});

const Voting = new Tag({
  tagID: 75,
  tagName: "Voting",
  neighbors: [73,74,76,78,81,80]
});

const Completeness= new Tag({
  tagID: 76,
  tagName: "Completeness",
  neighbors: [79,77,78,75,80]
});

const Transisivity = new Tag({
  tagID: 77,
  tagName: "Transisivity",
  neighbors: [76,79]
});

const Plurality = new Tag({
  tagID: 78,
  tagName: "Plurality",
  neighbors: [75,76,80,81,82]
});

const Variation = new Tag({
  tagID: 79,
  tagName: "Variation",
  neighbors: [76,77]
});

const Candidate = new Tag({
  tagID: 80,
  tagName: "Candidate",
  neighbors: [75,76,78,82,85,86]
});

const Positional = new Tag({
  tagID: 81,
  tagName: "Positional",
  neighbors: [75,78]
});

const Condorcet = new Tag({
  tagID: 82,
  tagName: "Condorcet",
  neighbors: [75,80]
});

const Arrow = new Tag({
  tagID: 83,
  tagName: "Arrow",
  neighbors: [84,86]
});

const IIA = new Tag({
  tagID: 84,
  tagName: "IIA",
  neighbors: [83,85,86,87]
});

const Sen = new Tag({
  tagID: 87,
  tagName: "Sen",
  neighbors: [84,85,86]
});

const Intensity = new Tag({
  tagID: 85,
  tagName: "Intensity",
  neighbors: [78,84,86,87]
});

const IIIA = new Tag({
  tagID: 86,
  tagName: "IIIA",
  neighbors: [83,84,87]
});

const Bagaining = new Tag({
  tagID: 88,
  tagName: "Bagaining",
  neighbors: [89]
});

const Ultimatum = new Tag({
  tagID: 89,
  tagName: "Ultimatum",
  neighbors: [88]
});

const Youtube = new Tag({
  tagID: 90,
  tagName: "Youtube",
  neighbors: [50,49,130,91]
});

const Count = new Tag({
  tagID: 91,
  tagName: "Count",
  neighbors: [90]
});

const Viral = new Tag({
  tagID: 92,
  tagName: "Viral",
  neighbors: [48]
});

const Private = new Tag({
  tagID: 93,
  tagName: "Private",
  neighbors: [65,66,96,94,95,97,98]
});

const Public = new Tag({
  tagID: 94,
  tagName: "Public",
  neighbors: [93,95,96,97,98]
});

const Cascade = new Tag({
  tagID: 95,
  tagName: "Cascade",
  neighbors: [65,66,93,94,96,97,98]
});

const Up = new Tag({
  tagID: 96,
  tagName: "Up",
  neighbors: [94,95,97]
});

const Down = new Tag({
  tagID: 97,
  tagName: "Down",
  neighbors: [93,94,95,96]
});

const Desending = new Tag({
  tagID: 98,
  tagName: "Desending",
  neighbors: [93,94,95]
});

const Tipping = new Tag({
  tagID: 99,
  tagName: "Tipping",
  neighbors: [100,101,103]
});

const Trajectory = new Tag({
  tagID: 100,
  tagName: "Trajectory",
  neighbors: [99,101,103,102,104]
});

const Iteration = new Tag({
  tagID: 101,
  tagName: "Iteration",
  neighbors: [19,20,21,99,100,102]
});

const Stable = new Tag({
  tagID: 102,
  tagName: "Stable",
  neighbors: [100,101,103,104]
});

const Unstable = new Tag({
  tagID: 103,
  tagName: "Unstable",
  neighbors: [99,100,101, 102, 104]
});

const Feedback = new Tag({
  tagID: 104,
  tagName: "Feedback  ",
  neighbors: [100,102,103]
});

const Facebook = new Tag({
  tagID: 105,
  tagName: "Facebook",
  neighbors: [106,108]
});

const Twitter = new Tag({
  tagID: 106,
  tagName: "Twitter",
  neighbors: [110,105,107]
});

const Directed = new Tag({
  tagID: 107,
  tagName: "Directed",
  neighbors: [106,109,108,112]
});

const Undirected = new Tag({
  tagID: 108,
  tagName: "Undirected",
  neighbors: [105,107,109]
});

const Link = new Tag({
  tagID: 109,
  tagName: "Link",
  neighbors: [16,24,124,110,107,108]
});

const Node = new Tag({
  tagID: 110,
  tagName: "Node",
  neighbors: [106,107,120,112,109,118,121,117]
});

const Graph = new Tag({
  tagID: 111,
  tagName: "Graph",
  neighbors: [108,110,113,114]
});

const Matrix = new Tag({
  tagID: 112,
  tagName: "Matrix",
  neighbors: [15,19,24,107,108,113,128,127,126,115,125,117,120,118]
});

const Adjacency = new Tag({
  tagID: 113,
  tagName: "Adjacency",
  neighbors: [111,112,114,115]
});

const Incidence = new Tag({
  tagID: 114,
  tagName: "Incidence",
  neighbors: [111,113,115]
});

const Degree = new Tag({
  tagID: 115,
  tagName: "Degree",
  neighbors: [112,113,114]
});

const Importance = new Tag({
  tagID: 116,
  tagName: "Importance",
  neighbors: [110,117,121,124,118]
});

const Closeness = new Tag({
  tagID: 117,
  tagName: "Closeness",
  neighbors: [112,111,120,119,116,108]
});

const Centrality = new Tag({
  tagID: 118,
  tagName: "Centrality",
  neighbors: [112,110,116,120]
});

const Shortest = new Tag({
  tagID: 119,
  tagName: "Shortest",
  neighbors: [117,120]
});

const Betweenness = new Tag({
  tagID: 120,
  tagName: "Betweenness",
  neighbors: [110,119,117,112,118]
});

const Flip = new Tag({
  tagID: 121,
  tagName: "Flip",
  neighbors: [110,122,123,124,116]
});

const Network = new Tag({
  tagID: 122,
  tagName: "Network",
  neighbors: [121,123,124]
});

const Density = new Tag({
  tagID: 123,
  tagName: "Density",
  neighbors: [122,121,124]
});

const Cluster = new Tag({
  tagID: 124,
  tagName: "Cluster",
  neighbors: [109,116,122,123,121]
});

const Topology = new Tag({
  tagID: 125,
  tagName: "Topology",
  neighbors: [112,126,127,128,129]
});

const Infection = new Tag({
  tagID: 126,
  tagName: "Infection",
  neighbors: [112,125,127,128,129]
});

const SI = new Tag({
  tagID: 127,
  tagName: "SI",
  neighbors: [112,125,126,128,129]
});

const SIR2 = new Tag({
  tagID: 128,
  tagName: "SIR",
  neighbors: [112,125,126,127,129]
});

const SIS = new Tag({
  tagID: 129,
  tagName: "SIS",
  neighbors: [125,126,127,128]
});

const Recomendation = new Tag({
  tagID: 130,
  tagName: "Recomendation",
  neighbors: [5,24,90,49]
});

const Coin = new Tag({
  tagID: 131,
  tagName: "Coin",
  neighbors: [65,66,67]
});

const Borda = new Tag({
  tagID: 132,
  tagName: "Borda",
  neighbors: [78,81]
});

const EA = new Tag({
  tagID: 133,
  tagName: "EA",
  neighbors: [53,58,60,61,63]
});


// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Tag.create([Cosine, SimilarityMatrix, NeighborhoodMethod, ContentBasedFilter, Netflix, NeighborhoodPredictor, CollaborativeFiltering, BaselinePredictor, RootMeanSquareError]);
  await Tag.create([ConvexOptimization, ErrorMatrix, MatrixDerivative, IncomingLinks, Webpages, HMatrix, OutgoingLinks, PageRankAlgorthm, HHatMatrix, GoogleMatrix, ImportanceScore]);
  await Tag.create([EigenVector, MatrixOperation, LinearAlgebra, Google, ClickthroughRate, AdvertisementSpace, Auction, SecondPriceAuction, MultipleItemAuction, OpenAuction, Externality]);
  await Tag.create([SingleItemAuction, SealedEnvelopAuction, TruthfulBidding, IndependentValuation, FDMA, TDMA, CDMA, Wireless, Inference, NearFarProblem, DPC, SIR, GameTheory, Optimization, Infeasible, Feasible, Equilibrium]);
  await Tag.create([Amazon, Wikipedia, Rating, GaltonsExperiment, Average, Rank, Review, Independent, Unbiased, Correct, Extimation, Error, AE, MSE, Dependent, Parital, Bayesian, Probability, Estimate, Degree, Importance]);
  await Tag.create([Pdf, Noramlization, Time, Limitation, Consesus, Challange, Page, Voting, Completeness, Transisivity, Plurality, Variation, Candidate, Positional, Condorcet, Arrow, IIA, Intensity, IIIA, Sen, Bagaining, Ultimatum, Youtube, Count, Viral]);
  await Tag.create([Private, Public, Cascade, Up, Down, Desending, Tipping, Trajectory, Iteration, Stable, Unstable, Feedback, Facebook, Twitter, Directed, Undirected, Link, Node, Graph, Matrix, Adjacency]);
  await Tag.create([Incidence, Closeness, Centrality, Shortest, Betweenness, Flip, Network, Density, Cluster, Topology, Infection, SI, SIR2, SIS, Recomendation, Coin, Borda, EA]);
  console.log(">>> Successfuly insert new tags!");
  mongoose.disconnect();
};

insertNewData();
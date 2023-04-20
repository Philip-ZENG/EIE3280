/**
 * @description
 * * EIE3280 Chapter 2 Slides Database
 * @IDmeaning
 * * For both page and section ID, the last two digits are its order in the chapter, the first digit is the chapter number
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

// Schema for each page
const pageSchema = new mongoose.Schema ({
  pageID: Number,
  title: String,
  content: String
});

// Schema for each section
// page field is an array of pageIDs
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

// ******************** Define pages and Sections ********************

// #################### Section 201 ####################
const page202 = new Page({
  pageID: 202,
  title: "How does Google sell ad spaces",
  content: ""
});

const page203 = new Page({
  pageID:203,
  title: "How to Sell Online Ad Space",
  content: "{Global online advertisement industry revenue: $95 billions in 2012}\
  {Different goals: Sellers vs. Buyers}\
  {1994: Impression-based ($ per 1000 impressions)}\
  {1997: Click-based}\
  {2002: Auction-based, Google AdWorks, Search advertisements/sponsored contents}"
});

const page204 = new Page({
  pageID:204,
  title: "Question 1",
  content: "{Where will your ad appear?}\
  {Example: Search “Overseas Study” (Chinese) in Google}"
});

const page205 = new Page({
  pageID:205,
  title: "Question 1",
  content: "{Different spots have different values}\
  {Each has an expected clickthrough rate C}\
  {Assume C is independent of the content of the ad}"
});

const page206 = new Page({
  pageID:206,
  title: "Question 2",
  content: "{How do advertisers pay Google?}\
  {When you actually click}\
  {Assume actual clickthrough rate is also C}"
});

const page207 = new Page({
  pageID:207,
  title: "Question 3",
  content: "{What's in it for the advertisers?}\
  {Revenue depends on: C: average clicks per hour, R: average revenue per click, C * R: average revenue in dollar per hour (The valuation of the ad space to the buyer)}\
  {Example: C = 400 clicks/hour R = $10/click Valuation = C * R = $4000/hour}"
});

const section201 = new Section({
  sectionID: 201,
  chapter: 2,
  page: [page202.pageID,page203.pageID,page204.pageID,page205.pageID,page206.pageID,page207.pageID],
  tag: [Google,AdvertisementSpace],
  tagIDs: [Google.tagID,AdvertisementSpace.tagID],
  content: [page202,page203,page204,page205,page206,page207]
});


// #################### Section 202 ####################

const page208 = new Page({
  pageID: 208,
  title: "Auction",
  content: "{From Roman Empire to eBay and Google}\
  {1 seller (Google)}\
  {N buyers (advertisers)}\
  {K items (ad spaces)}\
  {Buyers: submit bids}\
  {Seller: Allocate items to buyers, Charge each buyer}"
});

const page209 = new Page({
  pageID: 209,
  title: "Single Item Public Auction",
  content: "{Ascending price: The prices gradually increases, Stops when no bidder is willing to offer a higher price}\
  {Descending price: The prices gradually decreases, Stops when some bidder is willing to pay the current price}"
});

const page210 = new Page({
  pageID: 210,
  title: "Single Item Sealed Envelop",
  content: "{First price: Highest bidder pays the highest bid}\
  {Second price: Highest bidder pays the second highest bid}"
});

const page211 = new Page({
  pageID: 211,
  title: "Multiple Items",
  content: "{Generalized Second Price (GSP)}\
  {Vickrey-Clarke-Groves (VCG)}"
});

const page212 = new Page({
  pageID: 212,
  title: "Why Auctions?",
  content: "{Resource allocation: Suitable when the auctioneer does not know the value of the resource}\
  {Private valuation: vi of bidder i: not known by the auctioneer or other bidders}\
  {Independent valuations: vi is independent of other user j}"
});

const page213 = new Page({
  pageID: 213,
  title: "What Does Each Party Want?",
  content: "{Seller: revenue}\
  {Buyers: payof: Difference between valuation and payment}\
  {Auction designer: Efficient and fair, Truthful bidding}"
});

const page214 = new Page({
  pageID: 214,
  title: "Auction as a Game",
  content: "{Set of players: the set of bidders: N , indexed by i}\
  {The strategy space per player: bid bi ≥ 0}\
  {Payoff function per player:  If the bidder wins the auction, Payoff = valuation - payment: Ui(b) = vi - pi(b), Payment pi depends on everyone's bidding behavior (vector b) and the auction rule (function pi(·)), If the bidder loses: Ui(b) = 0}"
});

const section202 = new Section({
  sectionID: 202,
  chapter: 2,
  page: [page208.pageID,page209.pageID,page210.pageID,page211.pageID,page212.pageID,page213.pageID,page214.pageID],
  tag: [Auction],
  tagIDs: [Auction.tagID],
  content: [page208,page209,page210,page211,page212,page213,page214]
});


// #################### Section 203 ####################

const page215 = new Page({
  pageID: 215,
  title: "Designing an Auction",
  content: "{Different auction rules induce different bidding behaviors}\
  {First price}\
  {Second price}"
});

const page216 = new Page({
  pageID: 216,
  title: "Second Price (Single Item)",
  content: "{Decoupling of allocation and pricing}\
  {An experiment}"
});

const page217 = new Page({
  pageID: 217,
  title: "Still a Mystery?",
  content: "{Why not third price?}\
  {Anything special about second price?}\
  {Internalize the negative externality}\
  {Pay for what you damaged}"
});

const page218 = new Page({
  pageID: 218,
  title: "Second Price (Multiple Items)",
  content: "{Special example: number of bidders N = number of spaces K}\
  {Left: bidders ranking in the decreasing order of the revenue per click (R)}\
  {Right: ad spaces ranking in the decreasing order of the clickthrough rate (C)}\
  {Each bidder submits a bid (assuming truthful bidding): The bid can be viewed as a scalar: bi = Ri, The bid can also be viewed as a vector: bi = Ri * C}"
});

const page219 = new Page({
  pageID: 219,
  title: "General Second Price Auction (GSP)",
  content: "{Bidding: bidder i}\
  {Allocation: jth highest bidder gets the jth most valuable space}\
  {Payment: jth highest bidder pays the j + 1th highest price for the allocated space}\
  {What about the least bidder?}"
});

const page220 = new Page({
  pageID: 220,
  title: "Detour",
  content: "{Why not let each buyer submit multiple bids? (not just all multiples of a common number bi)}\
  {Other types of bipartite graphs and matching}"
});

const page221 = new Page({
  pageID: 221,
  title: "Previous Example",
  content: "{Bidding (Assume truthful)}\
  {Allocation:}\
  {Charging:}"
});

const page222 = new Page({
  pageID: 222,
  title: "Example",
  content: "{Revenue to Google:}\
  {Payoffs to buyers:}\
  {Total buyers' payoff:}"
});

const page223 = new Page({
  pageID: 223,
  title: "GSP May not Induce Truthful Bidding",
  content: "{First assume truthful bidding from everyone}\
  {Now consider buyer' 1 deviation from b1 = $12 to b1 = $7}\
  {Show that truthful bidding is not an NE in this example}"
});

const page224 = new Page({
  pageID: 224,
  title: "GSP or VCG?",
  content: "{Beyond Google ad search: e.g., AppNexus (VCG)}\
  {Why GSP for Google: Simplicity of explanation, Multiple parallel auctions, Irrational behavior}"
});

const page225 = new Page({
  pageID: 225,
  title: "Variants We Have Seen",
  content: "{Auction}\
  {Open, Sealed Envelop}\
  {Ascending Price, Descending Price, 1st Pice, 2nd Price}\
  {Multiple Item Generalization: GSP, VCG}"
});

const page226 = new Page({
  pageID: 226,
  title: "Many More We Haven't",
  content: "{Simultaneous auctions}\
  {Reverse auctions}\
  {Multiple winner auctions}"
});

const page227 = new Page({
  pageID: 227,
  title: "Summary",
  content: "{Auctions allocate items among competing buyers}\
  {Different auction rules induce different bidding behavior}\
  {Pricing based on externality induces truthful bidding}"
});

const section203 = new Section({
  sectionID: 203,
  chapter: 2,
  page: [page215.pageID,page216.pageID,page217.pageID,page218.pageID,page219.pageID,page220.pageID,page221.pageID,page222.pageID,page223.pageID,page224.pageID,page225.pageID,page226.pageID,page227.pageID],
  tag: [Auction, SecondPriceAuction],
  tagIDs: [Auction.tagID, SecondPriceAuction.tagID],
  content: [page215,page216,page217,page218,page219,page220,page221,page222,page223,page224,page225,page226,page227]
});

// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Page.create([page202, page203, page204, page205, page206, page207, page208, page209, page210, page211, page212, page213, page214, page215, page216, page217, page218, page219, page220, page221, page222, page223, page224, page225, page226, page227]);
  await Section.create([section201, section202, section203]);
  console.log(">>> Successfuly insert new pages and sections of Chapter 2!");
  mongoose.disconnect();
};


insertNewData();
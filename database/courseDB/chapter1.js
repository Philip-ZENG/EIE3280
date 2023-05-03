/**
 * @description
 * * EIE3280 Chapter 1 Slides Database
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

// #################### Section 101 ####################
const page102 = new Page({
  pageID: 102,
  title: " What makes CDMA work for my smartphone?",
  content: ""
});

const page103 = new Page({
  pageID: 103,
  title: "Take a Look at Your Smartphone",
  content: "{Networks (wireless, Internet, web...)}\
  {Chip, touch screen, battery, software, business model...}\
  {Data applications: texting, emailing, web browsing, video streaming,}\
  {file downloading, Networking, Radio air interface, Core and backhaul}"
});

const page104 = new Page({
  pageID: 104,
  title: "History of Wireless",
  content: "{1940s: terrestrial wireless communications}\
  {1970s - now: cellular networks}\
  {1G, 2G, 2.5G, 3G, 4G, 5G...}\
  {1990s - now: WiFi networks}\
  {What is a cellular network?}"
});

const page105 = new Page({
  pageID: 105,
  title: "Basic Terminologies",
  content: "{Cells, Base Station (BS), Mobile Station (MS)}\
  {Each BS has three directional antennas}\
  {Signal attenuation: 1/d^2 to 1/d^4, frequence reuse}"
});

const page106 = new Page({
  pageID: 106,
  title: "The Air",
  content: "{Interference among multiple transmitter-receiver pairs}\
  {Cocktail party}\
  {Use different languages to separate different conversions}"
});

const page107 = new Page({
  pageID: 107,
  title: "Orthogonal Resource Allocation",
  content: "{(a) FDMA}\
  {(b) TDMA}\
  {(c) Ideal CDMA}"
});

const page108 = new Page({
  pageID: 108,
  title: "Non-orthogonal Resource Allocation",
  content: "{(Practical) CDMA}\
  {Starting in 1989, then IS-95 in 2G}\
  {Now part of all 3G standards}\
  {Spread spectrum technique}\
  {Spreading code: a sequence of 1's and -1's}\
  {Special design family of orthogonal spreading codes,}\
  {Non-orthogonal in practice due to not enough codes or imperfect synchronization}\
  {Wikipedia: https://en.wikipedia.org/wiki/Code-division_multiple_access}"
});

const page109 = new Page({
  pageID: 109,
  title: "Interference",
  content: "{Our first example of negative externality}\
  {Famous special case: near-far problem}\
  {Simple solution by Qualcomm: feedback control}\
  {Transmit power control}\
  {Received signal power equalization}\
  {But what if you need to achieve a target signal quality?}"
});

const page110 = new Page({
  pageID: 110,
  title: "Uplink Interference",
  content: "{Gij: channel gain from transmitter j to receiver i}\
  {Gii is enhanced by CDMA spreading codes}"
});

const page111 = new Page({
  pageID: 111,
  title: "SIR",
  content: "{Signal-to-Interference-noise-Ratio (SIR):}\
  {SIRi=GiiPi/∑j!=i GijPj+ni}\
  {ni: noise at receiver i}"
});

const page112 = new Page({
  pageID: 112,
  title: "Distributed Power Control",
  content: "{An iterative, distributed algorithm}\
  {Assume each user i has an SIR target yi}\
  {Achieve the target SIR with the minimum transmission power}"
});

const page113 = new Page({
  pageID: 113,
  title: "DPC",
  content: "{Simple in communication, in computation, in configuration}\
  {Intuitive}\
  {Equilibrium looks good}\
  {Convergence sounds plausible}\
  "
});

const section101 = new Section({
  sectionID: 101,
  chapter: 1,
  page: [page102.pageID,page103.pageID,page104.pageID,page105.pageID,page106.pageID,page107.pageID,page108.pageID,page109.pageID,page110.pageID,page111.pageID,page112.pageID,page113.pageID],
  tag: [FDMA, TDMA, CDMA, Wireless, Inference, NearFarProblem, SIR, DPC],
  tagIDs: [FDMA.tagID, TDMA.tagID, CDMA.tagID, Wireless.tagID, Inference.tagID, NearFarProblem.tagID, SIR.tagID, DPC.tagID],
  content: [page102,page103,page104,page105,page106,page107,page108,page109,page110,page111,page112,page113]
});

// #################### Section 102 ####################

const page114 = new Page({
  pageID: 114,
  title: "A General Theme",
  content: "{Individual behaviors driven by self-interest}\
  {Aggregate into a (hopefully fair and efficient) state across all users}\
  {Helped by feedback signals}"
});

const page115 = new Page({
  pageID: 115,
  title: "View 1: Optimization",
  content: "{Objective: power minimization}\
  {Constraints: achieve target SIRs for all users}\
  {Variables: transmit powers}\
  {Constants: channels, noise, target SIRs}"
});

const page116 = new Page({
  pageID: 116,
  title: "Feasible Region (in SINRs)",
  content: "{The shaded area is the feasible region}\
  {maximum feasible SIRi = Giipi^max/ni}\
  {Interference relationship determines the Pareto Optimal boundary}\
  {Question: What is the shape of the feasible region if G12 = G21 = 0?}"
});

const page117 = new Page({
  pageID: 117,
  title: "Symbolically",
  content: "{Minimize: ∑ipi}\
  {Subject to: SIRi(p) ≥ yi, ∀i}\
  {Variables: p = (pi, ∀i)}"
});

const page118 = new Page({
  pageID: 118,
  title: "Linear Programming",
  content: "{Minimize a linear function subject to linear constraints}\
  {How to prove convergence of DPC algorithm to a solution of this optimization?}"
});

const page119 = new Page({
  pageID: 119,
  title: "Terminologies",
  content: "{Infeasible optimization problem}\
  {Feasible optimization problem}\
  {Global optimal and local optimal solution}\
  {An Example:}"
});

const page120 = new Page({
  pageID: 120,
  title: "View 2: Game",
  content: "{Power control is a competition}\
  {Every user tries to minimize his transmission power}\
  {Subject to the SINR constraint}\
  {Games are models for Competition, Cooperation}\
  {There is a formal (mathematical) language for games}"
});

const page121 = new Page({
  pageID: 121,
  title: "A Game",
  content: "{A set of players}\
  {A strategy space for each player}\
  {A payoff for each player}"
});

const page122 = new Page({
  pageID: 122,
  title: "Prisoner's Dilemma",
  content: "{2-user game}"
});

const page123 = new Page({
  pageID: 123,
  title: "Strategies",
  content: "Best response strategy\
  {Best response might not be unique ⇒ Best Response correspondence}\
  {Dominant strategy}\
  {A player's strategy that always leads to a payoff no worse than his any other strategies, independent of his opponents' strategies}\
  {Strictly dominant and weakly dominant}"
});

const page124 = new Page({
  pageID: 124,
  title: "Equilibrium",
  content: "{Equilibrium}\
  {Socially optimal?}\
  {Pareto optimal?}\
  {Exist?}\
  {Unique?}"
});

const page125 = new Page({
  pageID: 125,
  title: "Coordination Game: Battle of Sexes",
  content: "{Another 2-user game}"
});

const page126 = new Page({
  pageID: 126,
  title: "Nash Equilibrium",
  content: "{Best response strategies “match”}"
});

const page127 = new Page({
  pageID: 127,
  title: "Power Control Game",
  content: "{Let's identify}\
  {Players}\
  {Strategy spaces}\
  {Payoff functions}\
  {DPC is just the best response strategy!}\
  {Monotonicity of strategy space → convergence of algorithm}"
});

const section102 = new Section({
  sectionID: 102,
  chapter: 1,
  page: [page114.pageID,page115.pageID,page116.pageID,page117.pageID,page118.pageID,page119.pageID,page120.pageID,page121.pageID,page122.pageID,page123.pageID,page124.pageID,page125.pageID,page126.pageID,page127.pageID],
  tag: [GameTheory, Optimization, Infeasible, Feasible, Equilibrium],
  tagIDs: [GameTheory.tagID, Optimization.tagID, Infeasible.tagID, Feasible.tagID, Equilibrium.tagID],
  content: [page114,page115,page116,page117,page118,page119,page120,page121,page122,page123,page124,page125,page126,page127]
});

// #################### Section 103 ####################

const page128 = new Page({
  pageID: 128,
  title: "Example",
  content: "{Target SNRs: 2, 2.5, 1.5, 2}”\
  {Noise level: 0.1 mW}"
});

const page129 = new Page({
  pageID: 129,
  title: "Iteration 0",
  content: "{Initialize all power levels to be 1 mW”}\
  {Letffs calculate the corresponding SIRs}"
});

const page130 = new Page({
  pageID: 130,
  title: "Iteration 1",
  content: "{Let's calculate power levels}”\
  {Let's calculate SIRs}"
});

const page131 = new Page({
  pageID: 131,
  title: "Convergence in Powers",
  content: ""
});

const page132 = new Page({
  pageID: 132,
  title: "Convergence in SNRs",
  content: ""
});

const page133 = new Page({
  pageID: 133,
  title: "Two Control Loops",
  content: ""
});

const page134 = new Page({
  pageID: 134,
  title: "In Practice",
  content: "{Asynchronous and discrete}\
  {Frequency: 800 ff 1500}\
  {Granularity: 0.1 dB, 0.2 dB, 0.5 dB}\
  {Power control + handoff made all 3G standards work}"
});

const page135 = new Page({
  pageID: 135,
  title: "Summary",
  content: "{Different users' signals interfere with each other in the air}\
  {Feasible SIR region with a Pareto-optimal boundary}\
  {Interference coordination in CDMA uses DPC with feedback}\
  {Solves an optimization problem in the form of LP}\
  {Or viewed as the best response updates of a non-cooperative game}"
});

const section103 = new Section({
  sectionID: 103,
  chapter: 1,
  page: [page123.pageID,page124.pageID,page125.pageID,page126.pageID,page127.pageID,page128.pageID,page129.pageID,page130.pageID],
  tag: [SIR, DPC],
  tagIDs: [SIR.tagID, DPC.tagID],
  content: [page123,page124,page125,page126,page127,page128,page129,page130]
});


// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Page.create([page102, page103, page104, page105, page106, page107, page108, page109, page110, page111, page112, page113, page114, page115, page116, page117, page118, page119, page120, page121, page122, page123, page124, page125, page126, page127, page128, page129, page130, page131, page132, page133, page134, page135]);
  await Section.create([section101, section102, section103]);
  console.log(">>> Successfuly insert new pages and sections of Chapter 1!");
  mongoose.disconnect();
};


insertNewData();
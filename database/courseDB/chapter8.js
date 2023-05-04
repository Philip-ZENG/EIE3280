/**
 * @description
 * * EIE3280 Chapter 8 Slides Database
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

const EigenVector = new Tag({
  tagID: 21,
  tagName: "Eigen Vector",
  neighbors: [20,23,101]
});

const Centrality = new Tag({
  tagID: 118,
  tagName: "Centrality",
  neighbors: [112,110,116,120]
});

const Iteration = new Tag({
  tagID: 101,
  tagName: "Iteration",
  neighbors: [19,20,21,99,100,102]
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


// ******************** Define pages and Sections ********************

// #################### Section 1 ####################
const page802 = new Page({
  pageID: 802,
  title: "Q8: How do I influence people on Facebook?",
  content: ""
});

const page803 = new Page({
  pageID: 803,
  title: "Facebook and Twitter",
  content: "{Facebook: started in 2003, over 1.59 billion users by 2015}\
  {Undirected links}\
  {Twitter: started in 2006, 320 million monthly active users by 2015}\
  {Directed links}"
});

const page804 = new Page({
  pageID: 804,
  title: "Key Questions",
  content: "{How to measure the influential powers of individuals?}\
  {How to leverage the above knowledge to influence people?}"
});

const page805 = new Page({
  pageID: 805,
  title: "Medici Family",
  content: "{15 families with marriage or kinship relationship}\
  {Medici Family}"
});

const page806 = new Page({
  pageID: 806,
  title: "Granovetter 1973 Survey",
  content: "{The strength of weak links}"
});

const page807 = new Page({
  pageID: 807,
  title: "Graphs and Matrices",
  content: "{G = (V, E)}\
  {V: set of nodes (indexed by i)}\
  {E: set of links (in the form of (i, j))}\
  {Directed graph: (i, j) ∈ E does not imply that (j, i) ∈ E\
  {Undirected graph: (i, j) ∈ E implies that (j, i) ∈ E (each link is bidirectional)}\
  {We only consider simple and connected graphs}\
  {Simple: each link only connects two nodes}\
  {Connected: there is no “disconnected” node}"
});

const section801 = new Section({
  sectionID: 801,
  chapter: 8,
  page: [page802.pageID,page803.pageID,page804.pageID,page805.pageID,page806.pageID,page807.pageID],
  tag: [Facebook,Twitter,Directed,Undirected,Link,Node,Graph],
  tagIDs: [Facebook.tagID,Twitter.tagID,Directed.tagID,Undirected.tagID,Link.tagID,Node.tagID,Graph.tagID],
  content: [page802,page803,page804,page805,page806,page807]
});

// #################### Section 2 ####################

const page808 = new Page({
  pageID: 808,
  title: "Adjacency Matrix",
  content: "{A: N * N matrix}"
});

const page809 = new Page({
  pageID: 809,
  title: "Adjacency Matrix",
  content: "{Undirected Graph}\
  {(Symmetric matrix)}\
  {Directed Graph}\
  {(Asymmetric matrix)}"
});

const page810 = new Page({
  pageID: 810,
  title: "Incidence Matrix",
  content: "{A^: N * L matrix}\
  {For a undirected graph:}\
  {For a directed graph:}"
});

const page811 = new Page({
  pageID: 811,
  title: "Incidence Matrix",
  content: "{Undirected Graph}\
  {Directed Graph}\
  {(Each column sum to 0)}"
});

const page812 = new Page({
  pageID: 812,
  title: "Node Importance: Degree",
  content: "{Degree: out-degree, in-degree, total degree}\
  {Dunbar's number: 150}\
  {https://en.wikipedia.org/wiki/Dunbar%27s_number}"
});

const section802 = new Section({
  sectionID: 802,
  chapter: 8,
  page: [page808.pageID,page809.pageID,page810.pageID,page811.pageID,page812.pageID],
  tag: [Matrix,Adjacency,Directed,Undirected,Incidence,Graph,Degree],
  tagIDs: [Matrix.tagID,Adjacency.tagID,Directed.tagID,Undirected.tagID,Incidence.tagID,Graph.tagID,Degree.tagID],
  content: [page808,page809,page810,page811,page812]
});

// #################### Section 3 ####################

const page813 = new Page({
  pageID: 813,
  title: "Node Importance: Eigenvector centrality",
  content: "{Eigenvector centrality (similar as Google PageRank algorithm)}\
  {Assume the adjacency matrix A is full-rank, with eigenvalues λi}\
  {and eigenvectors vi}\
  {Then we can write any vector x[0] as a linear combination of vi}\
  {Then the iterative updating}\
  {where only the largest eigenvalue λ1 plays the important role.}"
});

const page814 = new Page({
  pageID: 814,
  title: "Node Importance: Eigenvector centrality",
  content: "{Eigenvector centrality x = xi}\
  {Ax = λ1x}\
  {which means}\
  {We can also normalize x (like the page importance scores).}"
});

const section803 = new Section({
  sectionID: 803,
  chapter: 8,
  page: [page813.pageID,page814.pageID],
  tag: [Matrix,Adjacency,EigenVector,Centrality,Iteration],
  tagIDs: [Matrix.tagID,Adjacency.tagID,EigenVector.tagID,Centrality.tagID,Iteration.tagID],
  content: [page813,page814]
});
  
// #################### Section 4 ####################

const page815 = new Page({
  pageID: 815,
  title: "Node Importance: Closeness centrality",
  content: "{Closeness centrality}\
  {dij: shortest distance (number of hops) between node i and node j}\
  {Diameter of the graph: max(i,j) dij}\
  {For a node i}\
  {average distance from it to all other nodes:}\
  {Summing over all (i, j) pairs with j ̸= i}\
  {Closeness centrality is}\
  {A larger Ci → node i is closer to other nodes → it is more important}"
});

const page816 = new Page({
  pageID: 816,
  title: "Node Importance: Betweenness centrality",
  content: "{Betweenness centrality}\
  {gst: number of shortest paths between nodes s and t}\
  {nist: number of shortest paths between nodes s and t that node i is on}\
  {Node i's between centrality is}"
});

const page817 = new Page({
  pageID: 817,
  title: "Example",
  content: "{Focus on nodes 1 and 2}\
  {They have the same degrees: d1 = d2 = 3}\
  {Are they equally important?}"
});

const page818 = new Page({
  pageID: 818,
  title: "Eigenvector",
  content: "{Adjacency matrix}\
  {Largest eigenvalue λ1 = 2.8723}\
  {Ax = λ1x}\
  {x = [0.4063, 0.3455, . . .]}"
});

const page819 = new Page({
  pageID: 819,
  title: "Closeness",
  content: ""
});

const page820 = new Page({
  pageID: 820,
  title: "Betweenness",
  content: ""
});

const page821 = new Page({
  pageID: 821,
  title: "Betweenness",
  content: "{}"
});

const section804 = new Section({
  sectionID: 804,
  chapter: 8,
  page: [page815.pageID,page816.pageID,page817.pageID,page818.pageID,page819.pageID,page820.pageID,page821.pageID],
  tag: [Node,Importance,Closeness,Centrality,Shortest,Betweenness,Matrix],
  tagIDs: [Node.tagID,Importance.tagID,Closeness.tagID,Centrality.tagID,Shortest.tagID,Betweenness.tagID,Matrix.tagID],
  content: [page815,page816,page817,page818,page819,page820,page821]
});

// #################### Section 5 ####################

const page822 = new Page({
  pageID: 822,
  title: "Medici Family",
  content: "{Medici family has a large betweenness centrality}"
});

const page823 = new Page({
  pageID: 823,
  title: "Medici Game",
  content: ""
});

const page824 = new Page({
  pageID: 824,
  title: "Link Importance",
  content: "{What is a link?}\
  {Directional?}\
  {Weak or strong?}\
  {Locally or globally important?}\
  {Link betweenness}"
});

const page825 = new Page({
  pageID: 825,
  title: "Contagion",
  content: "{Tipping from local neighborhood density}\
  {Flips if and only if more than p of the neighbors flipped}\
  {Here p ∈ (0, 1) is a fixed parameter same for all nodes}"
});

const page826 = new Page({
  pageID: 826,
  title: "Questions",
  content: "{Will the whole network flip? (tractable)}\
  {How long will it take? (difficult)}\
  {Will part of the network flip? How big a part? Which part?(difficult)}\
  {How to seed to maximize flipping? (very difficult)}"
});

const page827 = new Page({
  pageID: 827,
  title: "Density of a Cluster",
  content: "{Density of a cluster p: each user in the cluster has at least p of his}\
  {neighbors in the cluster}\
  {Cluster (1, 2, 3), density =}\
  {Cluster (1, 2, 3, 4), density =}"
});

const page828 = new Page({
  pageID: 828,
  title: "Question 1",
  content: "{The whole network flips if and only if all clusters in the set of}\
  {non-flipped nodes have densities strictly less than 1 - p.}"
});

const page829 = new Page({
  pageID: 829,
  title: "Question 1",
  content: "{The whole network flips if and only if all clusters in the set of}\
  {non-flipped nodes have densities strictly less than 1 - p.}\
  {Part of the proof (only if part):}\
  {Consider a cluster with a density of 1 - p or higher in the non-flipped nodes}\
  {Even if all nodes outside of the cluster have flipped, nodes in this cluster will have enough neighbors supporting their original decisions and do not flip}"
});

const page830 = new Page({
  pageID: 830,
  title: "Question 4",
  content: "{Optimal seeding strikes a tradeof}\
  {Balance between concentration in the same neighborhood and spreading across the entire network}"
});

const section805 = new Section({
  sectionID: 805,
  chapter: 8,
  page: [page822.pageID,page823.pageID,page824.pageID,page825.pageID,page826.pageID,page827.pageID,page828.pageID,page829.pageID,page830.pageID],
  tag: [Link,Importance,Flip,Network,Density,Cluster,Node],
  tagIDs: [Link.tagID,Importance.tagID,Flip.tagID,Network.tagID,Density.tagID,Cluster.tagID,Node.tagID],
  content: [page822,page823,page824,page825,page826,page827,page828,page829,page830]
});

// #################### Section 6 ####################

const page831 = new Page({
  pageID: 831,
  title: "Question 4",
  content: "{p = 0.49}\
  {If we seed one node:}\
  {If we seed two nodes:}\
  {Is there a way to seed two nodes and flip the entire network?}"
});

const page832 = new Page({
  pageID: 832,
  title: "Infection",
  content: "{State transition through differential equation over continuous time}\
  {Population based models first}\
  {Then topology based models}"
});

const page833 = new Page({
  pageID: 833,
  title: "3 Models",
  content: "{SI}\
  {SIS}\
  {SIR}\
  {S: susceptible; I: infected; R: recovered}"
});

const page834 = new Page({
  pageID: 834,
  title: "Helix",
  content: ""
});

const page835 = new Page({
  pageID: 835,
  title: "SI Model",
  content: "{Solution: logistic-growth}"
});

const page836 = new Page({
  pageID: 836,
  title: "SIS Model",
  content: "{Basic reproduction number sigma =beta/gamma > 1}\
  {What happen if sigma < 1?}"
});

const page837 = new Page({
  pageID: 837,
  title: "SIR Model",
  content: "{No closed form solution, but some insights}\
  {S(t) is always decreasing, R(t) is always increasing}\
  {If sigma_S(0) ≤ 1, I(t) is decreasing and there is no epidemics}\
  {If sigma_S(0) > 1, I(t) will first increase and then decrease}"
});

const page838 = new Page({
  pageID: 838,
  title: "Infection with Topology (SI Model)",
  content: "{A: adjacency matrix}\
  {Si(t): probability of node i in state S at time t}\
  {Ii(t): probability of node i in state I at time t}\
  {Approximation:}\
  {Pr(Node i in state S & node j in state I at time t) = Si(t)Ij(t)}"
});

const page839 = new Page({
  pageID: 839,
  title: "Infection with Topology (SI Model)",
  content: "{Assume Ii(t) is small during the initial time of infection, then}\
  {λk and vk: eigenvalues and eigenvectors of adjacency matrix A}"
});

const page840 = new Page({
  pageID: 840,
  title: "Case Study: Measles",
  content: "{We need sigma_S(0) < 1 to avoid epidemics}\
  {With no initial infection (I(0) = 0), this means R(0) > 1 - 1/sigma}\
  {For measles, sigma = 16.67, which leads to R(0) > 94%}\
  {Measles vaccination successful rate is 95%}\
  {Hence we need vaccination rate 94%/95% = 99%}"
});

const page841 = new Page({
  pageID: 841,
  title: "Summary",
  content: "{Influence models in a network}\
  {Nodes (and links) importance scores by various centrality measures}\
  {Contagion model: optimal seeding is difficult}\
  {Infection model: change the states of each node}"
});

const section806 = new Section({
  sectionID: 806,
  chapter: 8,
  page: [page831.pageID,page832.pageID,page833.pageID,page834.pageID,page835.pageID,page836.pageID,page837.pageID,page838.pageID,page839.pageID,page840.pageID,page841.pageID],
  tag: [Topology,Infection,SI,SIR2,SIS,Matrix.Adjacency],
  tagIDs: [Topology.tagID,Infection.tagID,SI.tagID,SIR2.tagID,SIS.tagID,Matrix.tagID,Adjacency.tagID],
  content: [page831,page832,page833,page834,page835,page836,page837,page838,page839,page840,page841]
});



// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Page.create([page802, page803, page804, page805, page806, page807, page808, page809, page810, page811, page812, page813, page814, page815, page816, page817, page818, page819, page820, page821, page822, page823, page824, page825, page826, page827, page828, page829, page830, page831, page832, page833,page834,page835,page836,page837,page838,page839,page840,page841]);
  await Section.create([section801, section802, section803, section804,section805,section806]);
  console.log(">>> Successfuly insert new pages and sections of chapter 8!");
  mongoose.disconnect();
}


insertNewData();
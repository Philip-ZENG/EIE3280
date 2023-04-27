/**
 * @description
 * * EIE3280 Chapter 3 Slides Database
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

// ******************** Define tags ************************
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
  
// ******************** Define pages and Sections ********************

// #################### Section 1 ####################
const page303 = new Page({
  pageID: 303,
  title: "Webpages form a network",
  content: "{Links in text: since mid-20th century...}\
  {Hyperlinks in webpages}\
  {Early 1990s: web, browser, portal...}\
  {Mid to late 1990s: search...}\
  {Directed graph}\
  {Huge and sparse}\
  {N = 40 - 60 Billion webpages out there}\
  {And very few links in/out of most webpages}"
});

const page304 = new Page({
  pageID:304,
  title: "Which webpages are more important",
  content: "{ Usefulness of ranking is hard to measure}\
  {So rank by importance}\
  {How to quantify node importance}\
  {Count the number of links?}\
  {More important links point to this pages}\
  {Turn a seemingly cyclic statement to characterize an equilibrium of a recursive definition}"
});

const page305 = new Page({
  pageID: 305,
  title: "General themes",
  content: "{Network consists of}\
  {Topology: graphs, matrices}\
  {Functionality: what you do on the graph}\
  {We will see 3 matrices and a model of the “search and navigation” functionality}"
});  

const page306 = new Page({
  pageID: 306,
  title: "How to Determine Calculate the Importance Score",
  content: "{We will have several tries}\
  {In an increasing order of complexity/accuracy}"
});  

const section301 = new Section({
  sectionID: 301,
  chapter: 3,
  page: [page303.pageID,page304.pageID,page305.pageID,page306.pageID],
  tag: [Google, Webpages, PageRankAlgorthm],
  tagIDs: [Google.tagID, Webpages.tagID, PageRankAlgorthm.tagID],
  content: [page303,page304,page305,page306]
});

// #################### Section 2 ####################
const page307 = new Page({
  pageID: 307,
  title: "An Example",
  content: ""
}); 

const page308 = new Page({
  pageID: 308,
  title: "Try 0",
  content: "{Count the number of incoming links (incoming degree)}\
  {πA = IA}"
}); 

const page309 = new Page({
  pageID: 309,
  title: "Try 1",
  content: "{Add up importance scores through incoming links}\
  {πA =∑i→Aπi}"
}); 

const page310 = new Page({
  pageID:310,
  title: "Try 2",
  content: "{ Normalize by the spread of importance}\
  {πA =∑i→AπiOi}\
  {We are close to Google s choices}\
  {Count the number of links?}\
  {Is there a set of consistent scores?}\
  {π = (πi,∀i)}"
});

const page311 = new Page({
  pageID: 311,
  title: "Another Example",
  content: "{Is there a systematic way of computing the scores?}"
}); 

const section302 = new Section({
  sectionID: 302,
  chapter: 3,
  page: [page307.pageID,page304.pageID,page309.pageID,page310.pageID,page311.pageID],
  tag: [IncomingLinks, OutgoingLinks],
  tagIDs: [IncomingLinks.tagID, OutgoingLinks.tagID],
  content: [page307,page308,page309,page310,page311]
});

// #################### Section 3 ####################
const page312 = new Page({
  pageID:312,
  title: "What does Google do?",
  content: "{ Crawling the web}\
  {Storing and indexing the pages}\
  {Computing two scores to rank pages per search}\
  {Relevant scores}\
  {Importance scores}\
  {An interesting (and unofficial) discussion: https://moz.com/blog/determining-relevance-how-similarity-is-scored}"
});

const page313 = new Page({
  pageID:313,
  title: "Matrix multiplication",
  content: "{Column vector, such as the importance scores}\
  {π = (π1, . . . , πN)T}\
  {Eigenvalue λ and eigenvector π of a matrix A (size N * N)}\
  {πTA = λπT}"
});

const page314 = new Page({
  pageID: 314,
  title: "An Example Again",
  content: ""
});

const page315 = new Page({
  pageID:315,
  title: "The first matrix H",
  content: "{Matrix H defined by}\
  {Hij =1/Oi}\
  {πTH = πT, hence π is the eigenvector of H.}"
});

const page316 = new Page({
  pageID:316,
  title: "Issues",
  content: "{Directly computing eigenvector can be computationally intensive}\
  {Use iterative algorithm: πT[t + 1] = πT[t]H}\
  {Eventually it will (hopefully) converge to π}\
  {πTH = πT may not have a non-zero solution}\
  {Need some further modification of matrix H}"
});

const section303 = new Section({
  sectionID: 303,
  chapter: 3,
  page: [page312.pageID,page313.pageID,page314.pageID,page315.pageID,page316.pageID],
  tag: [HMatrix],
  tagIDs: [HMatrix.tagID],
  content: [page312,page313,page314,page315,page316]
});

// #################### Section 4 ####################
const page317 = new Page({
  pageID: 317,
  title: "Dangling nodes",
  content: ""
});

const page318 = new Page({
  pageID:318,
  title: "The second matrix H",
  content: "{ Mandatory score-spreading}\
  {Adding (1/4, 1/4, 1/4, 1/4) to the last row}\
  {Define vector 1 = (1, . . . , 1)T}\
  {Hence we are adding the following row vector to the row corresponding to the “dangling node”}\
  {Define the dangling node indicate vector as vector w}\
  {For the above example, w = (0, 0, 0, 1)T}\
  {Then we have}\
  {The second matrix ^H = H +1Nw1T}"
});

const page319 = new Page({
  pageID: 319,
  title: "Too many consistent scores",
  content: "{The result of the iterative algorithm depends on the initial choice}"
});

const section304 = new Section({
  sectionID: 304,
  chapter: 3,
  page: [page317.pageID,page318.pageID,page319.pageID],
  tag: [HHatMatrix],
  tagIDs: [HHatMatrix.tagID],
  content: [page317,page318,page319]
});

// #################### Section 5 ####################
const page320 = new Page({
  pageID:320,
  title: "The third matrix G",
  content: "{Randomization}\
  {Key idea: assume that users sometimes will randomly select webpages}\
  {According to the matrix of}\
  {The third matrix G = θ^H + (1 - θ)1N11T}\
  {Empirically θ = 0.85}"
});

const page321 = new Page({
  pageID:321,
  title: "Pagerank algorithm",
  content: "{Construct the Google Matrix}\
  {G = θ^H + (1 - θ)111T = θ(H +1Nw1T)+ (1 - θ)1N11T}\
  {Iterative computation}\
  {Independent of the choice of π[0], the iterative algorithm will converge to π * as t → ∞, satisfying}\
  {Normalization}\
  {Display pages on Google search page according to ranking (no scores)}"
});
const section305 = new Section({
  sectionID: 305,
  chapter: 3,
  page: [page320.pageID,page321.pageID],
  tag: [GoogleMatrix, PageRankAlgorthm, ImportanceScore, EigenVector, MatrixOperation, LinearAlgebra],
  tagIDs: [GoogleMatrix.tagID, PageRankAlgorthm.tagID, ImportanceScore.tagID, EigenVector.tagID, MatrixOperation.tagID, LinearAlgebra.tagID],
  content: [page320,page321]
});

// #################### Section 6 ####################
const page326 = new Page({
  pageID: 326,
  title: "Generalized Pagerank and interpretations",
  content: "{A more refined randomization ingredient}\
  {Instead of 1N11T, we will use matrics 1vT}\
  {Here v can be any probability distribution}\
  {How to understand πTG = πT}\
  {π is a left eigenvector corresponding to the dominant eigenvalue of the positive matrix.}\
  {π is a stationary distribution of a Markov chain with transition probability matrix G.}"
});

const page327 = new Page({
  pageID: 327,
  title: "Parallel with DPCs",
  content: "{Both can be written as solutions of linear systems}\
  {Two iterative algorithms are special cases of a more general approach}\
  {How to solve Ax = b, if it is difficult to compute A-1}\
  {Write A = M - N, where M is easily invertible.}\
  {We use the following linear stationary iteration:}\
  {If the largest eigenvalue of M-1N is smaller than 1, then the global convergence is guaranteed}"
});

const page328 = new Page({
  pageID: 328,
  title: "How to scale up and speed up Pagerank algorithm",
  content: ""
});

const section306 = new Section({
  sectionID: 306,
  chapter: 3,
  page: [page326.pageID,page327.pageID,page328.pageID],
  tag: [PageRankAlgorthm],
  tagIDs: [PageRankAlgorthm.tagID],
  content: [page326,page327,page328]
});

// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Page.create([page303,page304,page305,page306,page307,page308,page309,page310,page311,page312,page313,page314,page315,page316,page317,page318,page319,page320,page321,page326,page327,page328]);
  await Section.create([section301, section302, section303,section304, section305, section306]);
  console.log(">>> Successfuly insert new pages and sections of Chapter 3!");
  mongoose.disconnect();
};


insertNewData();
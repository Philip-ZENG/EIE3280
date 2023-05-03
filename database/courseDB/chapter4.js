/**
 * @description
 * * EIE3280 Chapter 4 Slides Database
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


// ******************** Define pages and Sections ********************

// #################### Section 1 ####################
const page402 = new Page({
  pageID: 402,
  title: "How does Netflix recommend movies?",
  content: ""
});

const page403 = new Page({
  pageID: 403,
  title: "Recommendation Systems",
  content: "{Amazon: content-based filtering}\
  {YouTube: Co-visitation counts}\
  {Pandora: experts + thumbs up or down}\
  {Netflix: collaborative-filtering}"
});

const page404 = new Page({
  pageID: 404,
  title: "Input: Ratings",
  content: "{Each rating is characterized by}\
  {User ID: indexed by u}\
  {Movie ID: indexed by i}\
  {Rating: rui, in the form of 1 - 5}\
  {Timing: tui}"
});

const page405 = new Page({
  pageID: 405,
  title: "Output: Recommendations",
  content: "{Predicted rating through learning: rui}\
  {Example: 4.2 (80% 4 and 20% 5)}"
});

const page406 = new Page({
  pageID: 406,
  title: "Metric",
  content: "{Customer satisfaction}\
  {Prediction effectiveness}\
  {Prediction error}\
  {RMSE (Root Mean Square Error):vuut∑(u,i)(rui -rui)}\
  {Or equivalently MSE:∑(u,i)(rui -rui)}"
});

const page407 = new Page({
  pageID: 407,
  title: "The Netflix Prize",
  content: "{Announced October 2006}\
  {10% over Cinematch?}\
  {$1M and 100 Million data points Big data Sparse dataScrewed data}"
});


const page408 = new Page({
  pageID: 408,
  title: "Data Sets",
  content: "{RMSE (On Quiz Set)0.9514 0.8728 0.8712 0.8616 0.8563 0.8553 Oct. 2 2006 Oct. 2007 Oct. 2008 Jun. Jul. 2009}"
});

const page409 = new Page({
  pageID: 409,
  title: "Timeline",
  content: "{Ascending price: The prices gradually increases, Stops when no bidder is willing to offer a higher price}\
  {Descending price: The prices gradually decreases, Stops when some bidder is willing to pay the current price}"
});

const page410 = new Page({
  pageID: 410,
  title: "The Problem",
  content: ""
});

const page411 = new Page({
  pageID: 411,
  title: "Challenges and Solutions",
  content: "{Large and sparse data}\
  {Content-based filter: look at each row or each column in isolation}\
  {Collaborative filter: jointly look at rows and columns (global structure) Neighborhood method (today's lecture) Latent factor method (Advanced materials)}"
});

const section401 = new Section({
  sectionID: 401,
  chapter: 4,
  page: [page402.pageID,page403.pageID,page404.pageID,page405.pageID,page406.pageID,page407.pageID,page408.pageID,page409.pageID,page410.pageID,page411.pageID],
  tag: [RootMeanSquareError,Netflix,ContentBasedFilter,CollaborativeFiltering],
  tagIDs: [RootMeanSquareError.tagID,Netflix.tagID,ContentBasedFilter.tagID,CollaborativeFiltering.tagID],
  content: [page402,page403,page404,page405,page406,page407,page408,page409,page410,page411]
});

// #################### Section 2 ####################

const page412 = new Page({
  pageID: 412,
  title: "Parameterized Models",
  content: "{ Ground  Truth Model Parameter Observation Training Prediction Prediction Observation Model}"
});

const page413 = new Page({
  pageID: 413,
  title: "Baseline Predictor",
  content: "{Average predictor (over all existing ratings of movies and users)}\
  {Baseline predictor bu: bias of user u bi bias of movie i}\
  {RMSE ⇒ MSE ⇒ SE minimize{bu,bi ,∀u,i} ∑ (u,i) (rui  rui) 2}"
});

const page414 = new Page({
  pageID: 414,
  title: "An Example",
  content: "{Know ratings from one user (1) and two movies (A and B): r1A, r1B}\
  {Average predictor ¯r = (r1A + r1B)/2}\
  {We want to optimize the baseline predictor,}\
  {Three parameters to estimate (variables): b1, bA, bB}\
  {minimize{b1,bA,bB}(b1 + bA +¯r - r1A) 2 + (b1 + bB +¯r - r1B)}\
  {Once solving this problem, we can estimate the ratings of other users for this movie, and of other movies by the same users}"
});

const page415 = new Page({
  pageID: 415,
  title: "(RM)SE Minimization",
  content: "{L-2 norm of a vector x: ||x||2 =}\
  {Then the (RM)SE minimization problem is equilivant to minimizeb||Ab - c||2}\
  {In the previous example, we have}\
  {The size of A is 2 * 3, because we have 2 training data points and 3 parameters to estimate}\
  {How to solve the problem?}"
});

const page416 = new Page({
  pageID: 416,
  title: "Least Squares",
  content: "{Some transformation}\
  {Taking derivative with respect to b, and setting the derivative to 0}\
  {This leads to the following linear equations:}\
  {Solving the above equations to obtain b * that minimizes the (RM)SE.}"
});

const page417 = new Page({
  pageID: 417,
  title: "After Baseline Predictor",
  content: "{Error term:}\
  {Error matrix}\
  {This will be the input for the neighborhood method}"
});

const page418 = new Page({
  pageID: 418,
  title: "Advanced Material: Convex Optimization",
  content: "{Minimize convex objective function}\
  {Subject to convex constraint set}\
  {Easy in theory and in practice}"
});

const page419 = new Page({
  pageID: 419,
  title: "Convex Set",
  content: ""
});

const page420 = new Page({
  pageID: 420,
  title: "Convex Set",
  content: "{Definition If a set C is convex, then for any a ∈ C and b ∈ C, θa + (1 - θ)b ∈ C for any θ ∈ [0, 1]}\
  {Most important property Two convex sets can be separated by a hyperplan.}"
});

const page421 = new Page({
  pageID: 421,
  title: "Convex Function (and Non-Convex Function)",
  content: "{}"
});

const page422 = new Page({
  pageID: 422,
  title: "Convex Function",
  content: "{Single variable function derivative test Function f(x) is convex if its second order derivative f(x) ≥ 0}\
  {Multi-variable function: check Hessian matrix}\
  {Hessian matrix of function f(x) is matrix [∂ 2f(x)/(∂xi∂xj)]i,j}\
  {Function f(x) is convex if its Hessian matrix is positive semi-definite (that is, its all eigenvalues are non-negative). www.math.ucsd.edu/~njw/Teaching/Math271C/Lecture_03.pdf}"
});

const page423 = new Page({
  pageID: 423,
  title: "Neighborhood Method",
  content: "{From local to global structure}\
  {Pairwise statistical correlation Movie-movie (this lecture) User-user}"
});

const page424 = new Page({
  pageID: 424,
  title: "Similarity Metric For Two Error Vectors",
  content: "{Consider two users and two movies (error terms): rA = (0.5, 1),rB = (-1, -1)}\
  {The “similarity” of these two movies are determined by cos θ dAB = rA · rB ||rA||2||rB||2 = ∑ u ruA ruB √∑ u r 2 uA√∑ unr 2 uB}"
});

const page425 = new Page({
  pageID: 425,
  title: "Neighborhood",
  content: "{We can compute an M * M matrix D, where entry dij is computed as}\
  {Only summarizing over users who have rated both movies}\
  {For each movie i}\
  {Sort entries in the ith row of matrix D in the desending order of |dij| (-0.82, 0.3, -0.85, 0.6, 0.9) ⇒ (0.9, -0.85, - 0.82, 0.6, 0.3)}\
  {Pick the top L movies as movie i's neighborhood: Li ⋆ L is a system design parameter}"
});

const page426 = new Page({
  pageID: 426,
  title: "Summary",
  content: "{Train baseline predictor through (RM)SE minimization}\
  {Obtain error terms from the baseline prediction}\
  {Compute similarity matrix among movies}\
  {Define neighborhood for each movie}\
  {Obtain neighborhood prediction}"
});

const section402 = new Section({
  sectionID: 402,
  chapter: 4,
  page: [page412.pageID,page413.pageID,page414.pageID,page415.pageID,page416.pageID,page417.pageID,page418.pageID,page419.pageID,page420.pageID,page421.pageID,page422.pageID,page423.pageID,page424.pageID,page425.pageID,page426.pageID,],
  tag: [BaselinePredictor,RootMeanSquareError,MatrixDerivative,ErrorMatrix,ConvexOptimization,NeighborhoodPredictor,Cosine,SimilarityMatrix,NeighborhoodMethod],
  tagIDs: [BaselinePredictor.tagID,RootMeanSquareError.tagID,MatrixDerivative.tagID,ErrorMatrix.tagID,ConvexOptimization.tagID,NeighborhoodPredictor.tagID,Cosine.tagID,SimilarityMatrix.tagID,NeighborhoodMethod.tagID],
  content: [page412,page413,page414,page415,page416,page417,page418,page419,page420,page421,page422,page423,page424,page425,page426]
});

// #################### Section 3 ####################

const page427 = new Page({
  pageID: 427,
  title: "Example",
  content: "{10 users (rows) and 5 movies (columns)}\
  {30 training data points}\
  {10 test data points}\
  {Average of training data ¯r = 3.83}"
});

const page428 = new Page({
    pageID: 428,
    title: "Step 1: Train Baseline Predictor",
    content: "{Baseline predictor: rui = ¯r + bu + bi}\
    {Estimate 10 + 5 parameters: (b1, . . . , b10, bA, . . . , bE)}\
    {Least square optimization:}\
    {Optimal solution}"
  });

const page429 = new Page({
    pageID: 429,
    title: "Step 1: Train Baseline Predictor",
    content: "{Baseline predictor: rui = ¯r + bu + bi}\
    {Estimate 10 + 5 parameters: (b1, . . . , b10, bA, . . . , bE)}\
    {Least square optimization:}\
    {Optimal solution}"
  });

const page430 = new Page({
    pageID: 430,
    title: "Step 1: Train Baseline Predictor",
    content: ""
  });

const page431 = new Page({
    pageID: 431,
    title: "Step 2: Obtain Error Terms",
    content: "{{rui = rui -rui}}"
  });

const page432 = new Page({
    pageID: 432,
    title: "Step 3: Compute Similarity Matrix",
    content: "{Consider movies C and D (compuete dCD)}"
  });

const page433 = new Page({
    pageID: 433,
    title: "Step 3: Compute Similarity Matrix",
    content: "{D = 0.20 0.45 0.97 0.75 0.20 0.84 0.73 0.51 0.45 0.84 0.22 0.93 0.97 0.73 0.22  0.068 0.75 0.51 0.93 0.068 }"
  });

const page434 = new Page({
    pageID: 434,
    title: "Step 4: Define Neighborhood",
    content: "{Consider movie E with a neighborhood size L = 2}"
  });

const page435 = new Page({
    pageID: 435,
    title: "Step 5: Obtain Neighborhood Prediction",
    content: ""
});

const section403 = new Section({
  sectionID: 403,
  chapter: 4,
  page: [page427.pageID,page428.pageID,page429.pageID,page430.pageID,page431.pageID,page432.pageID,page433.pageID,page434.pageID,page435.pageID],
  tag: [BaselinePredictor,ErrorMatrix,SimilarityMatrix,NeighborhoodMethod],
  tagIDs: [BaselinePredictor.tagID,ErrorMatrix.tagID,SimilarityMatrix.tagID,NeighborhoodMethod.tagID],
  content: [page427,page428,page429,page430,page431,page432,page433,page434,page435]
});

// #################### Section 4 ####################

const page436 = new Page({
    pageID: 436,
    title: "Regularization: Robust Learning without Overfitting",
    content: "{Having a model with too many parameters will overfit}\
    {Good performance of training data but poor prediction capability}\
    {Solution: regularization}\
    {minimize{model parameters}(Squared error term+λ(Parameter size squared)}\
    {Consider baseline predictor: add λ( ∑ u b 2 u + ∑ i b 2 i )}"
  });

const page437 = new Page({
    pageID: 437,
    title: "Impact of Parameter λ",
    content: ""
  });

const page438 = new Page({
    pageID: 438,
    title: "Summary",
    content: "{Netflix Prize is a special case of recommendation system}\
    {Minimize RMSE to compute the baseline predictor}\
    {A special case of convex optimization}\
    {Collaborative filter leverages similarities among movies to make prediction}\
    {Regularization to avoid overfitting}"
  });

const section404 = new Section({
  sectionID: 404,
  chapter: 4,
  page: [page436.pageID,page437.pageID,page438.pageID],
  tag: [],
  tagIDs: [],
  content: [page436,page437,page438]
});


// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Page.create([page402, page403, page404, page405, page406, page407, page408, page409, page410, page411, page412, page413, page414, page415, page416, page417, page418, page419, page420, page421, page422, page423, page424, page425, page426, page427, page428, page429, page430, page431, page432, page433, page434, page435, page436, page437, page438]);
  await Section.create([section401, section402, section403, section404]);
  console.log(">>> Successfuly insert new pages and sections of chapter 4!");
  mongoose.disconnect();
}


insertNewData();
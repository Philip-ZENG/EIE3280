/**
 * @description
 * * EIE3280 Chapter 5 Slides Database
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
const Recomendation = new Tag({
  tagID: 130,
  tagName: "Recomendation",
  neighbors: [5,24,90,49]
});

const Google = new Tag({
  tagID: 24,
  tagName: "Google",
  neighbors: [17,26,27,5,49,130]
});

const Netflix = new Tag({
  tagID: 5,
  tagName: "Netflix",
  neighbors: [3,4,7,24,49,130]
});

const Amazon = new Tag({
  tagID: 49,
  tagName: "Amazon",
  neighbors: [5,24,130,90]
});

const Review= new Tag({
  tagID: 55,
  tagName: "Review",
  neighbors: [51,53,54,56,57,65]
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

const RootMeanSquareError = new Tag({
  tagID: 9,
  tagName: "Root Mean Square Error",
  neighbors: [7,12]
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

const EA = new Tag({
  tagID: 133,
  tagName: "EA",
  neighbors: [53,58,60,61,63]
});

const Dependent = new Tag({
  tagID: 63,
  tagName: "Dependent",
  neighbors: [61,64,133,66,93,94]
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

const Extimation = new Tag({
  tagID: 67,
  tagName: "Extimation",
  neighbors: [65,66,131]
});

const Coin = new Tag({
  tagID: 131,
  tagName: "Coin",
  neighbors: [65,66,67]
});


// ******************** Define pages and Sections ********************

// #################### Section 1 ####################
const page502 = new Page({
  pageID: 502,
  title: "More on recommendation",
  content: "{Google PageRank: a common list for all users}\
  {Netflix collaborative filtering: a separate list for each user}\
  {Amazon rating: aggregation of a vector of rating scores into a scalar}"
});

const page503 = new Page({
  pageID: 503,
  title: "Example",
  content: ""
});

const page504 = new Page({
  pageID: 504,
  title: "Review system",
  content: "{Rating: numerical (often integers)}\
  {Review: text}\
  {Reviews of review: can be simple binary}"
});

const page505 = new Page({
  pageID: 505,
  title: "Example",
  content: ""
});

const page506 = new Page({
  pageID: 506,
  title: "",
  content: ""
});

const page507 = new Page({
  pageID: 507,
  title: "Challenges",
  content: "{Gatekeeper: who can enter the reviews?}\
  {Scale: 1 - 7 or -5 - 5?}\
  {Number of reviews: How big is big enough?}\
  {How do you compare across products?}"
});


const page508 = new Page({
  pageID: 508,
  title: "Example",
  content: ""
});

const section501 = new Section({
  sectionID: 501,
  chapter: 5,
  page: [page502.pageID,page503.pageID,page504.pageID,page505.pageID,page506.pageID,page507.pageID,page508.pageID],
  tag: [Recomendation,Google,Netflix,Amazon,Review,Rating],
  tagIDs: [Recomendation.tagID,Netflix.tagID,Google.tagID,Amazon.tagID,Review.tagID,Rating.tagID],
  content: [page502,page503,page504,page505,page506,page507,page508]
});



// #################### Section 2 ####################
const page509 = new Page({
  pageID: 509,
  title: "Galton's experiment",
  content: "{1906}\
  {A farm in Plymouth, UK}\
  {787 guesses of an ox's weight}\
  {Average = 1197 pounds}\
  {Actual = 1198 pounds}\
  {A wisdom of crowds?}"
});

const page510 = new Page({
  pageID: 510,
  title: "3 key factors",
  content: "{The task has a correct and objective answer}\
  {Unbiased and independent estimates}\
  {Enough people participating}"
});

const page511 = new Page({
  pageID: 511,
  title: "Help",
  content: "{Natural language processing}\
  {Statistics}\
  {Signal processing}\
  {Voting}"
});

const page512 = new Page({
  pageID: 512,
  title: "Example",
  content: "{4 stars (121 reviews) vs. 4.5 stars (55 reviews)}"
});

const page513 = new Page({
  pageID: 513,
  title: "Example",
  content: "{Most helpful vs. most recent}"
});

const page514 = new Page({
  pageID: 514,
  title: "Example",
  content: "{Time series}"
});

const page515 = new Page({
  pageID: 515,
  title: "Two key questions",
  content: "{When/why can we trust an average rating?}\
  {How to rank different products based on their ratings?}"
});


const section502 = new Section({
  sectionID: 502,
  chapter: 5,
  page: [page509.pageID,page510.pageID,page511.pageID,page512.pageID,page513.pageID,page514.pageID,page515.pageID],
  tag: [GaltonsExperiment,Average,Rating,Rank,Review,Independent,Unbiased],
  tagIDs: [GaltonsExperiment.tagID,Average.tagID,Rating.tagID,Rank.tagID,Review.tagID,Independent.tagID,Unbiased.tagID],
  content: [page509,page510,page511,page512,page513,page514,page515]
});

// #################### Section 3 ####################
const page516 = new Page({
  pageID: 516,
  title: "Averaging Based on the Wisdom of Crowds",
  content: ""
});

const page517 = new Page({
  pageID: 517,
  title: "Averaging a crowd",
  content: "{Galton experiment example}\
  {N users indexed by i = 1, . . . , N}\
  {The correct (but unknown) answer is x}\
  {Each user i has an estimation}\
  {yi(x) = x + ϵi(x)}\
  {Unbiased error: Ex[ϵi(x)] = 0, for each user i}\
  {Independent error: ϵi(x) is independent of ϵj(x) for any i ̸= j}"
});

const page518 = new Page({
  pageID: 518,
  title: "Average of errors",
  content: "{The error of user i is ϵi(x)}\
  {We consider MSE (mean square error)}\
  {Hence the (expected, mean-squared) error of user i is Ex[ϵ]}\
  {The expected Average of Errors (AE) is}"
});

const page519 = new Page({
  pageID: 519,
  title: "Error of the average",
  content: "{What if we take the average first, and then look at the error?}\
  {Average of the estimation: 1}\
  {Error of the average estimation:}\
  {The expected Error of the Average (EA) is EEA = Ex}"
});

const page520 = new Page({
  pageID: 520,
  title: "AE vs. EA",
  content: "{The Average of Errors (AE) is} EAE =}\
  {The Error of the Average (EA) is EEA =}"
});

const page521 = new Page({
  pageID: 521,
  title: "AE vs. EA",
  content: "{An example of two users:Unbiased & independent errors: Ex [2ϵ1ϵ2] = 2Ex[ϵ1] Ex[ϵ2] = 0. (x)]}"
});

const page522 = new Page({
  pageID: 522,
  title: "Wisdom of crowds",
  content: "{Hence}\
  {1/N: wisdom of crowds}\
  {Averaging the estimation over N users reducing the error to 1/N}"
});

const page523 = new Page({
  pageID: 523,
  title: "What if completely dependent?",
  content: "{All the estimations are the same: yi(x) = yj(x)}\
  {The average of the estimation will be the same as each estimation}\
  {EEA = EAE}\
  {What about partial dependance?}"
});

const page524 = new Page({
  pageID: 524,
  title: "Ranking Based on Bayesian Analysis",
  content: ""
});

const page525 = new Page({
  pageID: 525,
  title: "Bayesian estimation: two questions",
  content: "{Question 1}\
  {If you have performed an experiment n times, and you have observed the outcome of “1” s times.}\
  {What is the probability of seeing an outcome of 1 in the next experiment?}"
});

const page526 = new Page({
  pageID: 526,
  title: "Bayesian estimation: two questions",
  content: "{Question 1}\
  {If you have performed an experiment n times, and you have observed the outcome of “1” s times.}\
  {What is the probability of seeing an outcome of 1 in the next experiment?}\
  {Question 2}\
  {If you are tossing a coin, with head meaning “1” and tail meaning “0”.}\
  {If you have seen s times of “1” out of n experiments, what is the probability of seeing “1” in the next toss?}"
});


const section503 = new Section({
  sectionID: 503,
  chapter: 5,
  page: [page516.pageID,page517.pageID,page518.pageID,page519.pageID,page520.pageID,page521.pageID,page522.pageID,page523.pageID,page524.pageID,page525.pageID,page526.pageID],
  tag: [Correct,Estimate,Unbiased,Independent,Average,AE,MSE,EA,Dependent,Bayesian, Coin],
  tagIDs: [Correct.tagID,Estimate.tagID,Unbiased.tagID,Independent.tagID,Average.tagID,AE.tagID,MSE.tagID,EA.tagID,Dependent.tagID,Bayesian.tagID, Coin.tagID],
  content: [page516,page517,page518,page519,page520,page521,page522,page523,page524,page525,page526]
});


// #################### Section 3 ####################

const page527 = new Page({
  pageID: 527,
  title: "Bayesian view",
  content: "{If we know probability p, we can make predication of how often we will see “1”.}\
  {Based on the observations, how to estimate the value of p?}"
});

const page528 = new Page({
  pageID: 528,
  title: "Estimating the probability distribution of p",
  content: "Assume we know the value of p, then the probability of seeing s times of “1” among n experiments is}"
  });

const page529 = new Page({
  pageID: 529,
  title: "Estimating the probability distribution of p",
  content: "{Assume we know the value of p, then the probability of seeing s times of “1” among n experiments is}\
  {Since we do not know the value of p, we would guess that the probability of p is proportional to the above expression}"
  });

const page530 = new Page({
  pageID: 530,
  title: "Estimating the probability distribution of p",
  content: "{Assume we know the value of p, then the probability of seeing s times of “1” among n experiments is}\
  {Since we do not know the value of p, we would guess that the probability of p is proportional to the above expression}\
  {To obtain a probability distribution function (pdf) of p, we need to perform proper normalization}"
  });

const page531 = new Page({
  pageID: 531,
  title: "Rule of succession",
  content: "{The conditional probability of seeing a “1” given p is just p}\
  {The unconditional probability of seeing a “1” would be the integration over the entire range of p}\
  {When n (and hence s) is very large, then s+1, n+2 is approaching s n}"
  });

const page532 = new Page({
  pageID: 532,
  title: "Bayesian ranking",
  content: "{We have several brands of products, indexed by i}\
  {For each brand i: a total of ni reviews, with an average rating of ri}\
  {For all brands: a total of N reviews, with an average rating of R}"
  });

const page533 = new Page({
  pageID: 533,
  title: "Bayesian ranking",
  content: "{We have several brands of products, indexed by i}\
  {For each brand i: a total of ni reviews, with an average rating of ri}\
  {For all brands: a total of N reviews, with an average rating of R}\
  {The Bayesian rating for brand i is}\
  {The larger ni (relative to N), the closer between ri and ri}"
  });

const page534 = new Page({
    pageID: 534,
    title: "Bayesian ranking",
    content: "{Example: ni = N/2}"
  });

const page535 = new Page({
    pageID: 535,
    title: "Examples",
    content: ""
});

const page536 = new Page({
  pageID: 536,
  title: "Examples",
  content: ""
});

const page537 = new Page({
  pageID: 537,
  title: "Bayesian changes order",
  content: ""
});

const page538 = new Page({
  pageID: 538,
  title: "Reverse engineering Amazon",
  content: "{Bayesian adjustment}\
  {Recency of view}\
  {Reputation score}\
  {www.amazon.com/review/top-reviewers-classic}"
});

const page539 = new Page({
  pageID: 539,
  title: "Example",
  content: "{Table 5.4 A list of the top twenty 30 - 34 inch LCD HDTVs on Amazon.}"
});

const page540 = new Page({
  pageID: 540,
  title: "Bayesian",
  content: ""
});

const page541 = new Page({
  pageID: 541,
  title: "Quality of reviews",
  content: "{How many people believe that the “most helpful” reviews are helpful?}\
  {When are the “most helpful” reviews?}\
  {Any substantial very negative reviews?}"
});

const page542 = new Page({
  pageID: 542,
  title: "Key factors",
  content: "{Bayesian ranking}\
  {Too few or too outdated reviews penalized}\
  {Very high quality reviews help a lot}\
  {Major issues push ranking down a lot}"
});

const page543 = new Page({
  pageID: 543,
  title: "Summary",
  content: "{Average ratings scalarizes a vector and ranks}\
  {Average: factor of N multiplexing gain in wisdom of crowds,}\
  {following independent and unbiased individual inputs}\
  {Ranking: number of ratings should matter, as in Bayesian ranking}"
});


const section504 = new Section({
  sectionID: 504,
  chapter: 5,
  page: [page527.pageID,page528.pageID,page529.pageID,page530.pageID,page531.pageID,page532.pageID,page533.pageID,page534.pageID,page535.pageID,page536.pageID,page537.pageID,page538.pageID,page539.pageID,page540.pageID,page541.pageID,page542.pageID,page543.pageID],
  tag: [Bayesian,Probability,Pdf,Noramlization,Time,Rank,Rating,Average,Review],
  tagIDs: [Bayesian.tagID,Probability.tagID,Pdf.tagID,Noramlization.tagID,Time.tagID,Rank.tagID,Rating.tagID,Average.tagID,Review.tagID],
  content: [page527,page528,page529,page530,page531,page532,page533,page534,page535,page536,page537,page538,page539,page540,page541,page542,page543]
});


// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Page.create([page502, page503, page504, page505, page506, page507, page508, page509, page510, page511, page512, page513, page514, page515, page516, page517, page518, page519, page520, page521, page522, page523, page524, page525, page526, page527, page528, page529, page530, page531, page532, page533, page534, page535, page536, page537, page538,page539,page540,page541,page542,page543]);
  await Section.create([section501, section502, section503, section504]);
  console.log(">>> Successfuly insert new pages and sections of chapter 5!");
  mongoose.disconnect();
}


insertNewData();
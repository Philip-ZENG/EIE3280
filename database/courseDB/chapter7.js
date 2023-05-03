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
  content: [pageSchema]
});


// Create a collection which is an instance of the tag schema
const Tag = mongoose.model("Tag", tagSchema);
// Create a colleciton which is an instance of the section schema
const Section = mongoose.model("Section", sectionSchema);
// Create a collection which is an instance of page schema 
const Page = mongoose.model("Page", pageSchema);


// ******************** Define tags ********************
const Youtube = new Tag({
  tagID: 90,
  tagName: "Youtube",
  neighbors: [50,49,130,91]
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

const Recomendation = new Tag({
  tagID: 130,
  tagName: "Recomendation",
  neighbors: [5,24,90,49]
});

const Count = new Tag({
  tagID: 91,
  tagName: "Count",
  neighbors: [90]
});

const Equilibrium = new Tag({
  tagID: 48,
  tagName: "Equilibrium",
  neighbors: [44,92]
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

const Probability = new Tag({
  tagID: 66,
  tagName: "Probability",
  neighbors: [68,69,67,131,65,94,93,95]
});

const Bayesian = new Tag({
  tagID: 65,
  tagName: "Bayesian",
  neighbors: [51,54,55,69,68,131,96,97,94,93]
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

const Dependent = new Tag({
  tagID: 63,
  tagName: "Dependent",
  neighbors: [61,64,133,66,93,94]
});


// ******************** Define pages and Sections ********************

// #################### Section 1 ####################
const page702 = new Page({
  pageID: 702,
  title: "How do I viralize a YouTube video?",
  content: ""
});

const page703 = new Page({
  pageID: 703,
  title: "Overview",
  content: "{Aggregation of opinion on Amazon}\
  {Resolution of opinion in Wikipedia}\
  {Dependence of opinion}\
  {Theory-practice gap}\
  {Network effect, positive or negative Externality}\
  {Information dependence}"
});

const page704 = new Page({
  pageID: 704,
  title: "YouTube",
  content: "{A viral phenomenon itself}\
  {Started in 2005, acquired by Google in 2006}\
  {By 2008, the second largest search engine}\
  {By 2011, 40% of Internet videos watched on YouTube}\
  {Some videos are viral}"
});

const page705 = new Page({
  pageID: 705,
  title: "4 ways to find a video",
  content: "{Web search}\
  {Referral through tweet or email}\
  {Subscription to channel}\
  {Browsing through recommendation}"
});

const page706 = new Page({
  pageID: 706,
  title: "YouTube recommendation",
  content: "{Co-visitation count}\
  {Videos being watched together within 24 hours}\
  {Multi-hop recommendations}\
  {Watch count}\
  {With similar or higher number of views}"
});

const section701 = new Section({
  sectionID: 701,
  chapter: 7,
  page: [page702.pageID,page703.pageID,page704.pageID,page705.pageID,page706.pageID],
  tag: [Youtube,Amazon,Wikipedia,Recomendation,Count],
  tagIDs: [Youtube.tagID,Amazon.tagID,Wikipedia.tagID,Recomendation.tagID,Count.tagID],
  content: [page702,page703,page704,page705,page706]
});

// #################### Section 2 ####################

const page707 = new Page({
  pageID: 707,
  title: "What is viral anyway?",
  content: "{High peak}\
  {Large volume}\
  {Short time to rise}"
});


const page708 = new Page({
  pageID: 708,
  title: "Tipping",
  content: "{Groupon}\
  {Founded in 2008}\
  {By 2010: generated over $300 million annual revenue}\
  {Value of crowds}\
  {Advertisement and returning customers}\
  {Power of crowds}\
  {Need a threshold number of people within 24 hours}"
});

const page709 = new Page({
  pageID: 709,
  title: "Influential power",
  content: "{Intrinsic value}\
  {Network effect}\
  {Information (e.g., information cascade)}\
  {Valuation (e.g., fax)}\
  {Population based model this lecture}\
  {Deterministic interaction}\
  {Random interaction}\
  {Topology based model next lecture}"
});

const page710 = new Page({
  pageID: 710,
  title: "Questions",
  content: "{Distribution of nodes in different states at equilibrium}\
  {Amount of time it takes to reach equilibrium}\
  {Transient behavior before equilibrium}\
  {Which model to use?}"
});

const page711 = new Page({
  pageID: 711,
  title: "Models",
  content: "{Deterministic-interaction Model}\
  {Random-interaction Model}\
  {Population-based}\
  {Topology-dependent}"
});

const section702 = new Section({
  sectionID: 702,
  chapter: 7,
  page: [page707.pageID,page708.pageID,page709.pageID,page710.pageID,page711.pageID],
  tag: [Equilibrium,Viral],
  tagIDs: [Equilibrium.tagID,Viral.tagID],
  content: [page707,page708,page709,page710,page711]
});

// #################### Section 3 ####################

const page712 = new Page({
  pageID: 712,
  title: "An experiment",
  content: "{Salganik Dodds Watts 2005}\
  {14341 participants}\
  {48 songs from unknown bands}\
  {Two factors}\
  {Ordering: random or descending order}\
  {Download number: shown or hidden}"
});

const page713 = new Page({
  pageID: 713,
  title: "More social influence",
  content: "{Always leads to more spread in the download numbers}\
  {Also increases the unpredictability}\
  {Any general theory about these phenomena?}"
});

const page714 = new Page({
  pageID: 714,
  title: "Sequential decision making",
  content: "{Each person gets a private signal and releases a public action}\
  {Information dependence leads to a cascade}\
  {Cascade can be easy, large, wrong, and fragile}"
});

const page715 = new Page({
  pageID: 715,
  title: "A thought experiment",
  content: "{People lined up}\
  {Correct number c (either 0 or 1): hidden from people}\
  {Each person}\
  {Obtains a private signal: with probability p >equals to the correct}\
  {number, and probability 1 - p otherwise}\
  {Releases a public signal: writes down his best guess (0 or 1) of the correct number c on the whiteboard}"
});

const page716 = new Page({
  pageID: 716,
  title: "First person",
  content: "{As the probability of seeing the correct number p > 1/2}"
});

const page717 = new Page({
  pageID: 717,
  title: "Second person",
  content: "{By observing public signal Y1, second person derives private signal X1}\
  {He needs to determine Y2 based on X1 and X2}\
  {If X2 = X1, then Y2 = X2 = X1.}\
  {If X2 ̸= X1, then he flips a fair coin to determine Y2.}"
});

const page718 = new Page({
  pageID: 718,
  title: "Third person",
  content: "{If Y2 ̸= Y1, then Y3 = X3 (back to the first user case).}\
  {If Y2 = Y1 = X3, then Y3 = X3.}\
  {If Y2 = Y1, but X3 is different from the previous public signals?}"
});

const section703 = new Section({
  sectionID: 703,
  chapter: 7,
  page: [page712.pageID,page713.pageID,page714.pageID,page715.pageID,page716.pageID,page717.pageID,page718.pageID],
  tag: [Private,Public,Cascade,Dependent,Probability],
  tagIDs: [Private.tagID,Public.tagID,Cascade.tagID,Dependent.tagID,Probability.tagID],
  content: [page712,page713,page714,page715,page716,page717,page718]
});

// #################### Section 4 ####################

const page719 = new Page({
  pageID: 719,
  title: "Bayesian thinking",
  content: "{What's the probability P [c |(Y1, Y2, X3)] = P [1 |(1, 1, 0)]?}\
  {If the probability > 0.5: ignore the private signal}\
  {If the probability < 0.5: ignore the public signal}\
  {If the probability = 0.5: flip a coin}"
});

const page720 = new Page({
  pageID: 720,
  title: "Bayesian thinking",
  content: "{Bayes' Theorem}\
  {Law of Total Probability}"
});

const page721 = new Page({
  pageID: 721,
  title: "Bayesian thinking",
  content: "{}"
});

const page722 = new Page({
  pageID: 722,
  title: "Here starts the cascade",
  content: "{Two kinds of cascades}\
  {Up cascade: 1, 1, 1, 1, . . .}\
  {Down cascade: 0, 0, 0, 0, . . .}\
  {What are their probabilities?}"
});

const page723 = new Page({
  pageID: 723,
  title: "Chance of cascade",
  content: "{The probability of no cascade}\
  {p(1 - p)}\
  {Probup = Probdown}"
});

const page724 = new Page({
  pageID: 724,
  title: "How about running longer time?",
  content: "{Previous calculation focuses on cascade after the 2nd user person}\
  {What about after 2n users?}\
  {No cascade: Y1 ̸= Y2, Y3 ̸= Y4, . . . , Y2n-1 ̸= Y2n}\
  {Probno = (p(1 - p))n}\
  {What happen as n → ∞?}"
});

const section704 = new Section({
  sectionID: 704,
  chapter: 7,
  page: [page719.pageID,page720.pageID,page721.pageID,page722.pageID,page723.pageID,page724.pageID],
  tag: [Bayesian,Probability,Cascade,Up,Down,Private,Public],
  tagIDs: [Bayesian.tagID,Probability.tagID,Cascade.tagID,Up.tagID,Down.tagID,Private.tagID,Public.tagID],
  content: [page719,page720,page721,page722,page723,page724]
});

// #################### Section 5 ####################

const page725 = new Page({
  pageID: 725,
  title: "How large is a cascade?",
  content: "{Can be forever}\
  {Unless with some kind of disturbance, e.g., releasing a private signal}\
  {1, 1, . . . , 1(0 : private signal also out), ?(another 0 private signal)}\
  {Emperor's new clothes}"
});

const page726 = new Page({
  pageID: 726,
  title: "Variations",
  content: "{People with heterogeneous probabilities pi}\
  {Ordering persons with desending values of p'is makes cascade happen earlier}\
  {With more than two possible results, need more consistent public}\
  {signals to make cascade happen}\
  {Example: Looking at the sky}"
});

const page727 = new Page({
  pageID: 727,
  title: "Example",
  content: "{Assume correct number c = 1}\
  {F means flipping a coin}"
});

const page728 = new Page({
  pageID: 728,
  title: "Assume correct number is 1",
  content: "{Probno = P(X1 = 0, X2 = 1, F = 1) + P(X1 = 1, X2 = 0, F = 0) = p(1 - p),}\
  {Probup = P(X1 = 1, X2 = 1) + P(X1 = 1, X2 = 0, F = 1) = p(1 + p)/2,}\
  {Probdown = P(X1 = 0, X2 = 0) + P(X1 = 0, X2 = 1, F = 0) = (1-p)(2-p)/2}"
});

const page729 = new Page({
  pageID: 729,
  title: "How about after 2n users",
  content: "{Notice that the last two equations are no longer symmetric, as we}\
  {have assumed that the correct number is 1}"
});

const page730 = new Page({
  pageID: 730,
  title: "Observations",
  content: "{For a fixed p, a larger n does not drive Probcorrect to 1.}\
  {Dependence of decision destroys the wisdom of crowds}"
});

const section705 = new Section({
  sectionID: 705,
  chapter: 7,
  page: [page725.pageID,page726.pageID,page727.pageID,page728.pageID,page729.pageID,page730.pageID],
  tag: [Cascade,Private,Public,Desending],
  tagIDs: [Cascade.tagID,Private.tagID,Public.tagID,Desending.tagID],
  content: [page725,page726,page727,page728,page729,page730]
});

// #################### Section 6 ####################

const page731 = new Page({
  pageID: 731,
  title: "Tipping",
  content: "{Positive externality (in a single time slot)}\
  {Positive feedback (over time)}\
  {Example: Should I buy an iPad?}\
  {Adoption percentage p}\
  {Influence function f(p)}"
});

const page732 = new Page({
  pageID: 732,
  title: "Trajectory",
  content: "{p[t + 1] = f(p[t])}\
  {One zig-zag corresponds to one iteration.}\
  {Different shapes lead to different types of equilibrium.}"
});

const page733 = new Page({
  pageID: 733,
  title: "Step 3: Compute Similarity Matrix",
  content: "{D =  0.20 0.45 0.97 0.75 0.20  0.84 0.73 0.51 0.45 0.84  0.22 0.93 0.97 0.73 0.22  0.068 0.75 0.51 0.93 0.068 }"
});

const section706 = new Section({
  sectionID: 706,
  chapter: 7,
  page: [page731.pageID,page732.pageID,page733.pageID],
  tag: [Tipping,Trajectory,Iteration,Stable,Unstable,Feedback],
  tagIDs: [Tipping.tagID,Trajectory.tagID,Iteration.tagID,Stable.tagID,Unstable.tagID,Feedback.tagID],
  content: [page731,page732,page733]
});



// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Page.create([page702, page703, page704, page705, page706, page707, page708, page709, page710, page711, page712, page713, page714, page715, page716, page717, page718, page719, page720, page721, page722, page723, page724, page725, page726, page727, page728, page729, page730, page731, page732, page733]);
  await Section.create([section701, section702, section703, section704,section705,section706]);
  console.log(">>> Successfuly insert new pages and sections of chapter 7!");
  mongoose.disconnect();
}


insertNewData();
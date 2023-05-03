/**
 * @description
 * * EIE3280 Chapter 6 Slides Database
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
const Wikipedia = new Tag({
    tagID: 50,
    tagName: "Wikipedi",
    neighbors: [71,72,90]
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

  const Borda = new Tag({
    tagID: 132,
    tagName: "Borda",
    neighbors: [78,81]
  });

// ******************** Define pages and Sections ********************  

// #################### Section 1 ####################
const page602 = new Page({
  pageID: 602,
  title: "Recap",
  content: "{Page Rank, Recommendation, Rating, Voting}"
});

const page603 = new Page({
  pageID: 603,
  title: "Wikipedia",
  content: "{Rating: numerical (often integers)}\
  {Review: text}\
  {Reviews of review: can be simple binary}"
});

const page604 = new Page({
  pageID: 604,
  title: "Wikipedia",
  content: "{Launched in 2001}\
  {Convergence of}\
  {Wikis for online collaboration}\
  {Free and open software}\
  {Online encyclopedia}\
  {Free, open, dynamic, interactive, extensively linked}"
});

const page605 = new Page({
  pageID: 605,
  title: "Wikipedia Stats",
  content: ""
});

const page606 = new Page({
  pageID: 606,
  title: "Examples of Google Search",
  content: ""
});

const page607 = new Page({
  pageID: 607,
  title: "Limitation",
  content: "{Misinformation}\
  {Mistakes}\
  {Missing information}"
});


const page608 = new Page({
  pageID: 608,
  title: "Consensus",
  content: "{Challenge of consensus formation}\
  {Good faith collaboration}\
  {Guidelines, rules, and mechanisms}"
});


const section601 = new Section({
  sectionID: 601,
  chapter: 6,
  page: [page602.pageID,page603.pageID,page604.pageID,page605.pageID,page606.pageID,page607.pageID,page608.pageID],
  tag: [Wikipedia,Limitation,Consesus],
  tagIDs: [Wikipedia.tagID,Limitation.tagID,Consesus.tagID],
  content: [page602,page603,page604,page605,page606,page607,page608]
});

// #################### Section 2 ####################

const page609 = new Page({
  pageID: 609,
  title: "3 Key Challenges",
  content: "{Free}\
  {Open to anyone}\
  {Open to any subject}"
});

const page610 = new Page({
  pageID: 610,
  title: "Policies and Guidelines",
  content: "{V: Verifiability}\
  {NOR: No original research}\
  {NPOV: Neutral point of view}\
  {Most challenging one to satisfy}"
});

const page611 = new Page({
  pageID: 611,
  title: "Mechanisms",
  content: "{History page}\
  {Talk page}\
  {Reputation system: for both articles and contributors}\
  {Hierarchical committees}"
});

const page612 = new Page({
  pageID: 612,
  title: "Rough Consensus",
  content: "{Voting}\
  {Partially ordered preferences}\
  {Threshold for vetoing}\
  {Bargaining (Advanced Materials)}\
  {Cooperation}\
  {But also competition4 stars (121 reviews) vs. 4.6 stars (66 reviews)}"
});

const page613 = new Page({
  pageID: 613,
  title: "Voting System",
  content: "{Input: Preference profiles}\
  {N voters: each ranking M candidates}\
  {A total of N ranked ordered lists}\
  {Output: Voting outcome}\
  {A single ranked ordered list}\
  {Assumption: Completeness}\
  {Each list includes all M candidates}\
  {Assumption: Transitivity}\
  {If A > B and B > C, then A > C (for both inputs and output)}\
  {Loss of information}\
  {As we merge N lists into one list}"
});

const page614 = new Page({
  pageID: 614,
  title: "Plurality Voting",
  content: "{Vi of candidate i: the number of voters who have put this candidate at the first position of their lists}\
  {The candidate with the largest Vi will be put at the first position on the output list}\
  {The candidate with the nth largest Vi will be put at the nth position on the output list}"
});

const page615 = new Page({
  pageID: 615,
  title: "Plurality Voting",
  content: "{Vi of candidate i: the number of voters who have put this candidate at the first position of their lists}\
  {The candidate with the largest Vi will be put at the first position on the output list}\
  {The candidate with the nth largest Vi will be put at the nth position on the output list}\
  {Example: 4 voters and 3 candidates}"
});

const page616 = new Page({
  pageID: 616,
  title: "Plurality Voting: Variation",
  content: "{Variation: Kemeny voting}\
  {Count how many “least-liked” votes a candidate has}\
  {Rank candidates in the asending order of these numbers}"
});

const page617 = new Page({
  pageID: 617,
  title: "Plurality Voting: Variation",
  content: "{Variation: Kemeny voting}\
  {Count how many “least-liked” votes a candidate has}\
  {Rank candidates in the asending order of these numbers}\
  {Example: 4 voters and 3 candidates}"
});

const section602 = new Section({
  sectionID: 602,
  chapter: 6,
  page: [page609.pageID,page610.pageID,page611.pageID,page612.pageID,page613.pageID,page614.pageID,page615.pageID,page616.pageID,page617.pageID],
  tag: [Challange,Voting,Completeness,Transisivity,Plurality,Variation,Candidate],
  tagIDs: [Challange.tagID,Voting.tagID,Completeness.tagID,Transisivity.tagID,Plurality.tagID,Variation.tagID,Candidate.tagID],
  content: [page609,page610,page611,page612,page613,page614,page615,page616,page617]
});


// #################### Section 3 ####################

const page618 = new Page({
  pageID: 618,
  title: "Positional Voting",
  content: "{Generalizes plurality voting}\
  {Assign numbers to candidates based on their positions in voters' lists}\
  {Borda count}\
  {The first candidate in a voter's list gets M - 1 points}\
  {The second candidate in a voter's list gets M - 2 points}\
  {. . .}\
  {The last candidate in a voter's list gets 0 points}"
});

const page619 = new Page({
  pageID: 619,
  title: "Positional Voting",
  content: "{Generalizes plurality voting}\
  {Assign numbers to candidates based on their positions in voters lists}\
  {Borda count}\
  {The first candidate in a voters list gets M  1 points}\
  {The second candidate in a voters list gets M 2 points}\
  {. . }\
  {The last candidate in a voters list gets 0 points}\
  {Example: 4 voters and 3 candidates}"
});

const page620 = new Page({
  pageID: 620,
  title: "Jean-Charles de Borda",
  content: "{https://en.wikipedia.org/wiki/Jean-Charles_de_Borda}"
});

const page621 = new Page({
  pageID: 621,
  title: "Condorcet Voting",
  content: "{Pairwise comparison is easy, comparing more than two candidates}\
  {simultaneously is hard}\
  {So let's do only pairwise comparison}\
  {If we have A > B and B > C, then naturally we have A > C}"
});

const page622 = new Page({
  pageID: 622,
  title: "Condorcet Voting",
  content: "{Pairwise comparison is easy, comparing more than two candidates}\
  {simultaneously is hard}\
  {So let's do only pairwise comparison}\
  {If we have A > B and B > C, then naturally we have A > C}\
  {Except that it may not be true}"
});

const page623 = new Page({
  pageID: 623,
  title: "Condorcet Voting",
  content: "{Pairwise comparison is easy, comparing more than two candidates}\
  {simultaneously is hard}\
  {So let's do only pairwise comparison}\
  {If we have A > B and B > C, then naturally we have A > C}\
  {Except that it may not be true}\
  {Example: 3 voters and 3 candidates}"
});

const page624 = new Page({
  pageID: 624,
  title: "Marquis de Condorcet",
  content: "{https://en.wikipedia.org/wiki/Marquis_de_Condorcet}"
});

const section603 = new Section({
  sectionID: 603,
  chapter: 6,
  page: [page618.pageID,page619.pageID,page620.pageID,page621.pageID,page622.pageID,page623.pageID,page624.pageID],
  tag: [Positional,Voting,Plurality,Borda,Candidate,Condorcet],
  tagIDs: [Positional.tagID,Voting.tagID,Plurality.tagID,Borda.tagID,Candidate.tagID,Condorcet.tagID],
  content: [page618,page619,page620,page621,page622,page623,page624]
});

// #################### Section 4 ####################

const page625 = new Page({
  pageID: 625,
  title: "Counter-Intuitive Example",
  content: "{9 voters and 3 ice-creams (Chocolate, Vanilla, and Strawberry)}\
  {C > V > S: 4 votes}\
  {S > V > C: 3 votes}\
  {V > S > C: 2 votes}\
  {Plurality:}\
  {Borda count:}\
  {Condorcet:}"
});

const page626 = new Page({
  pageID: 626,
  title: "Arrow's Axioms",
  content: "{Each input list is complete and transitive}\
  {2 The output list is complete and transitive}\
  {3 Output is not just identical to one input independent of other inputs}\
  {4 Pareto:}\
  {If all voters agree on A > B, then the final result should also be A > B}\
  {5 Independence of irrelevant alternatives (IIA):}\
  {If all voters' preferences regarding A and B do not change, then the}\
  {preference changes of other candidates should not change the final}\
  {outcome regarding A and B}"
});

const page627 = new Page({
  pageID: 627,
  title: "Arrow's Impossibility Result",
  content: "{M ≥ 3: No voting systems can satisfy all five axioms}\
  {Why?}"
});

const page628 = new Page({
  pageID: 628,
  title: "Possibility Result",
  content: "{Intensity form of IIA (IIIA)}\
  {When we have A > B, we also need to count the number of candidates between A and B (called intensity)}\
  {IIIA: in the outcome list, the ranking of a pair of candidates depends only on the pairwise comparison and the intensity.}\
  {Borda count: satisfies all five axioms (after replacing IIA with IIIA)}\
  {Intuition: Need to count, rather than just order}"
});

const page629 = new Page({
  pageID: 629,
  title: "Sen's Impossibility Theorem",
  content: "{The following four axioms are incompatible}\
  {1 Each input list is complete and transitive}\
  {2 Output list is complete and transitive}\
  {3 Pareto}\
  {4 At least two decisive voters}\
  {A decisive voter is who can decide (at least) one pair of candidates'}\
  {relative ranking for the whole group of voters}"
});

const page630 = new Page({
  pageID: 630,
  title: "Bargaining",
  content: "{1950 Nash axiomatic approach}\
  {1980s Rubinstein interactive offer approach}"
});

const page631 = new Page({
  pageID: 631,
  title: "Ultimatum Game",
  content: "{Two players try to divide 10 dollars.}\
  {Stage 1: Player 1 offers x dollars to player 2.}\
  {Assume that the min value of x is 0.01 dollar (1 cent).}\
  {Stage 2: Player 2 can accept or reject player 1's offer.}\
  {If player 2 accepts, then playersff payoffs are (10 - x, x).}\
  {If player 2 rejects, then playersff payoffs are (0, 0).}"
});

const page632 = new Page({
  pageID: 632,
  title: "Ultimatum Game",
  content: "{https://en.wikipedia.org/wiki/Ultimatum_game}\
  {http://v.youku.com/v_show/id_XNTQ2NzQ5NDAw.html?f=19119535}"
});

const page633 = new Page({
  pageID: 633,
  title: "Summary",
  content: "{Wikipedia's success depends on positive network effect and good faith collaboration.}\
  {Consensus formation by voting (and bargaining).}\
  {In trying to compress many rank-ordered lists into one, intuitions like IIA may not hold.}\
  {Positional voting like Borda count helps quantify externalities.}"
});


const section604 = new Section({
  sectionID: 604,
  chapter: 6,
  page: [page625.pageID,page626.pageID,page627.pageID,page628.pageID,page629.pageID,page630.pageID,page631.pageID,page632.pageID,page633.pageID],
  tag: [Arrow,Candidate,IIA,IIIA,Sen,Bagaining,Ultimatum],
  tagIDs: [Arrow.tagID,Candidate.tagID,IIA.tagID,IIIA.tagID,Sen.tagID,Bagaining.tagID,Ultimatum.tagID],
  content: [page625,page626,page627,page628,page629,page630,page631,page632,page633]
});


// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Page.create([page602, page603, page604, page605, page606, page607, page608, page609, page610, page611, page612, page613, page614, page615, page616, page617, page618, page619, page620, page621, page622, page623, page624, page625, page626, page627, page628, page629, page630, page631, page632, page633]);
  await Section.create([section601, section602, section603, section604]);
  console.log(">>> Successfuly insert new pages and sections of chapter 6!");
  mongoose.disconnect();
}


insertNewData();
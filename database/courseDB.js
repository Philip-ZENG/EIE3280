const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/courseDB");

// Schema for a tag (the abstract representation is a node), nodes would form a graph that represents the relationship betweeen tags
const tagSchema = new mongoose.Schema ({
  tagID: Number,
  tagName: String,
  prerequisite: [String]
});

// Schema for each page
const pageSchema = new mongoose.Schema ({
  pageID: Number,
  title: String,
  content: String
});
// Schema for each section
const sectionSchema = new mongoose.Schema ({
  sectionID: Number,
  chapter: Number,
  page: [Number],
  tag: [tagSchema],
  content: [pageSchema]
});


// Create a collection which is an instance of the tag schema
const Tag = mongoose.model("Tag", tagSchema);
// Create a colleciton which is an instance of the section schema
const Section = mongoose.model("Section", sectionSchema);
// Create a collection which is an instance of page schema 
const Page = mongoose.model("Page", pageSchema);


// ******************** Define tags ********************
const Google = new Tag({
  tagID: 1,
  tagName: "Google",
  prerequisite: []
});

const AdvertisementSpace = new Tag({
  tagID: 2,
  tagName: "Advertisement Space",
  prerequisite: []
});

const Auction = new Tag({
  tagID: 3,
  tagName: "Auction",
  prerequisite: []
});

const SecondPriceAuction = new Tag({
  tagID: 4,
  tagName: "Second Price Auction",
  prerequisite: []
});


// ******************** Define pages ********************

// #################### Section 1 ####################
const page2 = new Page({
  pageID: 2,
  title: "How does Google sell ad spaces",
  content: ""
});

const page3 = new Page({
  pageID:3,
  title: "How to Sell Online Ad Space",
  content: "{Global online advertisement industry revenue: $95 billions in 2012}\
  {Different goals: Sellers vs. Buyers}\
  {1994: Impression-based ($ per 1000 impressions)}\
  {1997: Click-based}\
  {2002: Auction-based, Google AdWorks, Search advertisements/sponsored contents}"
});

const page4 = new Page({
  pageID:4,
  title: "Question 1",
  content: "{Where will your ad appear?}\
  {Example: Search “Overseas Study” (Chinese) in Google}"
});

const page5 = new Page({
  pageID:5,
  title: "Question 1",
  content: "{Different spots have different values}\
  {Each has an expected clickthrough rate C}\
  {Assume C is independent of the content of the ad}"
});

const page6 = new Page({
  pageID:6,
  title: "Question 2",
  content: "{How do advertisers pay Google?}\
  {When you actually click}\
  {Assume actual clickthrough rate is also C}"
});

const page7 = new Page({
  pageID:7,
  title: "Question 3",
  content: "{What's in it for the advertisers?}\
  {Revenue depends on: C: average clicks per hour, R: average revenue per click, C * R: average revenue in dollar per hour (The valuation of the ad space to the buyer)}\
  {Example: C = 400 clicks/hour R = $10/click Valuation = C * R = $4000/hour}"
});

const section1 = new Section({
  sectionID: 1,
  chapter: 2,
  page: [2,3,4,5,6,7],
  tag: [Google,AdvertisementSpace],
  content: [page2,page3,page4,page5,page6,page7]
});


// #################### Section 2 ####################
const page8 = new Page({
  pageID: 8,
  title: "Auction",
  content: "{From Roman Empire to eBay and Google}\
  {1 seller (Google)}\
  {N buyers (advertisers)}\
  {K items (ad spaces)}\
  {Buyers: submit bids}\
  {Seller: Allocate items to buyers, Charge each buyer}"
});

const page9 = new Page({
  pageID: 9,
  title: "Single Item Public Auction",
  content: "{Ascending price: The prices gradually increases, Stops when no bidder is willing to offer a higher price}\
  {Descending price: The prices gradually decreases, Stops when some bidder is willing to pay the current price}"
});

const page10 = new Page({
  pageID: 10,
  title: "Single Item Sealed Envelop",
  content: "{First price: Highest bidder pays the highest bid}\
  {Second price: Highest bidder pays the second highest bid}"
});

const page11 = new Page({
  pageID: 11,
  title: "Multiple Items",
  content: "{Generalized Second Price (GSP)}\
  {Vickrey-Clarke-Groves (VCG)}"
});

const page12 = new Page({
  pageID: 12,
  title: "Why Auctions?",
  content: "{Resource allocation: Suitable when the auctioneer does not know the value of the resource}\
  {Private valuation: vi of bidder i: not known by the auctioneer or other bidders}\
  {Independent valuations: vi is independent of other user j}"
});

const page13 = new Page({
  pageID: 13,
  title: "What Does Each Party Want?",
  content: "{Seller: revenue}\
  {Buyers: payof: Difference between valuation and payment}\
  {Auction designer: Efficient and fair, Truthful bidding}"
});

const page14 = new Page({
  pageID: 14,
  title: "Auction as a Game",
  content: "{Set of players: the set of bidders: N , indexed by i}\
  {The strategy space per player: bid bi ≥ 0}\
  {Payoff function per player:  If the bidder wins the auction, Payoff = valuation - payment: Ui(b) = vi - pi(b), Payment pi depends on everyone's bidding behavior (vector b) and the auction rule (function pi(·)), If the bidder loses: Ui(b) = 0}"
});

const section2 = new Section({
  sectionID: 2,
  chapter: 2,
  page: [8,9,10,11,12,13,14],
  tag: [Auction, SecondPriceAuction],
  content: [page8,page9,page10,page11,page12,page13,page14]
});


// #################### Section 3 ####################

const page15 = new Page({
  pageID: 15,
  title: "Designing an Auction",
  content: "{Different auction rules induce different bidding behaviors}\
  {First price}\
  {Second price}"
});

const page16 = new Page({
  pageID: 16,
  title: "Second Price (Single Item)",
  content: "{Decoupling of allocation and pricing}\
  {An experiment}"
});

const page17 = new Page({
  pageID: 17,
  title: "Still a Mystery?",
  content: "{Why not third price?}\
  {Anything special about second price?}\
  {Internalize the negative externality}\
  {Pay for what you damaged}"
});

const page18 = new Page({
  pageID: 18,
  title: "Second Price (Multiple Items)",
  content: "{Special example: number of bidders N = number of spaces K}\
  {Left: bidders ranking in the decreasing order of the revenue per click (R)}\
  {Right: ad spaces ranking in the decreasing order of the clickthrough rate (C)}\
  {Each bidder submits a bid (assuming truthful bidding): The bid can be viewed as a scalar: bi = Ri, The bid can also be viewed as a vector: bi = Ri * C}"
});

const page19 = new Page({
  pageID: 19,
  title: "General Second Price Auction (GSP)",
  content: "{Bidding: bidder i}\
  {Allocation: jth highest bidder gets the jth most valuable space}\
  {Payment: jth highest bidder pays the j + 1th highest price for the allocated space}\
  {What about the least bidder?}"
});

const page20 = new Page({
  pageID: 20,
  title: "Detour",
  content: "{Why not let each buyer submit multiple bids? (not just all multiples of a common number bi)}\
  {Other types of bipartite graphs and matching}"
});

const page21 = new Page({
  pageID: 21,
  title: "Previous Example",
  content: "{Bidding (Assume truthful)}\
  {Allocation:}\
  {Charging:}"
});

const page22 = new Page({
  pageID: 22,
  title: "Example",
  content: "{Revenue to Google:}\
  {Payoffs to buyers:}\
  {Total buyers' payoff:}"
});

const page23 = new Page({
  pageID: 23,
  title: "GSP May not Induce Truthful Bidding",
  content: "{First assume truthful bidding from everyone}\
  {Now consider buyer' 1 deviation from b1 = $12 to b1 = $7}\
  {Show that truthful bidding is not an NE in this example}"
});

const page24 = new Page({
  pageID: 24,
  title: "GSP or VCG?",
  content: "{Beyond Google ad search: e.g., AppNexus (VCG)}\
  {Why GSP for Google: Simplicity of explanation, Multiple parallel auctions, Irrational behavior}"
});

const page25 = new Page({
  pageID: 25,
  title: "Variants We Have Seen",
  content: "{Auction}\
  {Open, Sealed Envelop}\
  {Ascending Price, Descending Price, 1st Pice, 2nd Price}\
  {Multiple Item Generalization: GSP, VCG}"
});

const page26 = new Page({
  pageID: 25,
  title: "Many More We Haven't",
  content: "{Simultaneous auctions}\
  {Reverse auctions}\
  {Multiple winner auctions}"
});

const page27 = new Page({
  pageID: 27,
  title: "Summary",
  content: "{Auctions allocate items among competing buyers}\
  {Different auction rules induce different bidding behavior}\
  {Pricing based on externality induces truthful bidding}"
});

const section3 = new Section({
  sectionID: 3,
  chapter: 2,
  page: [15,16,17,18,19,20,21,22,23,24,25,26,27],
  tag: [Auction, SecondPriceAuction],
  content: [page15,page16,page17,page18,page19,page20,page21,page22,page23,page24,page25,page26,page27]
});

// ************* Insert Data *************
async function insertNewData() {
  // Insert the new document into the collectioin
  await Page.create([page2, page3, page4, page5, page6, page7, page8, page9, page10, page11, page12, page13, page14, page15, page16, page17, page18, page19, page20, page21, page22, page23, page24, page25, page26, page27]);
  await Tag.create([Google, AdvertisementSpace, Auction, SecondPriceAuction]);
  await Section.create([section1, section2, section3]);
  console.log("Successfuly insert new data");
  mongoose.disconnect();
}


insertNewData();
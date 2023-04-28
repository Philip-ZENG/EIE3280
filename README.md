# EIE3280 Project

### 0x00 File Structure

#### `./algorithm`

- `relevanceScoreSearch.js`: Implement the function of generating ranked section results based on search key words; the search score is purely based on distance between tags; Bench mark algorithm.
- `importanceWeightedRelevanceScoreSearch.js`: Use the Google PageRank importance score as the weight to compute importance weighted relevance score; An modified algorithm based on `relevanceScoreSearch.js`.
- `recommend.js`: Implement the function of recommending tags given certain decisive tags

#### `./database`

- `./database/courseDB`: Formal database for the application; Create MongoDB database named `courseDB`; define and insert all tags, pages, and sections into the database
  - `tag.js`: Define and insert all tags
  - `chapter1.js`: Define and insert pages and sections of chapter 1
  - `chapter2.js`: Define and insert pages and sections of chapter 2
  - `chapter4.js`: Define and insert pages and sections of chapter 3
  - `createDB.sh`: bash script to run multiple commands at once; Run this script to create the whole database in one shot
  
- `./database/tagGraphDB`: Test and develop tag graph related functions
  - `tagGraph.js`: Create MongoDB database named `tagGraphDB`; define and insert all tags into the database; tags are designed to represent node in a tag graph
  - `shortestDistanceBetweenTags.js`: Dijkstra algorithm to calculate shortest distance between tag nodes
  - `pageRank.js`: Google PageRank algorithm, compute the importance score of each tag in the tag graph
  - `indexed_tag_graph.png`: Image that show the connection between tags and their unique index

### 0x01 System Design

- Build Database
  - Database Selection
    - MongoDB: https://www.mongodb.com/docs/manual/tutorial/getting-started/
    - Mongoose (Node.js packet for MongoDB): https://mongoosejs.com/docs/api/model.html
  - Learning material (video)
    - https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12385648#overview
    - Section 26, Section 27
  - Data Source
    - EIE3280 PPT
- Database Schema Design
   - Page Schema
     - Each page can have multiple tag
     - pageID: a unique ID value that is used to identify a specific page
       - `pageID%100` is the page number of that page item in its chapter
       - `(pageID-pageID%100)/100` is the chapter number that page item belongs to
     
   - Section Schema
   - Tag Schema
     - Each tag has 1 importance score
     - Each tag has multiple relevance score (relevant to each of all the other tags)


### 0x02 Mechanism Design

- Map Search Word to Tags
  - Do string match to find pages that contain the search word string
    - If the string is found in the page's content, it has a weight of 1
    - If the string is found in the page's title, it has a weight of 2

  - Map the matched page to its corresponding Sections and Tags, count the frequency of occurrence
  - Determine the `DecisiveTag` based on tag occurrence frequency (top 3 most frequent)
    - We consider the `DecisiveTag` as the most relevant tag to the search key words
  - Alternative: Classification Machine Learning Model
- Search Algorithm Approach 1: Relevance ScoreRE

  - Build a graph based on tags, each tag is a node in the graph

  - Find all the section that contains the `DecisiveTag`

  - Rank these section based on a Relevance Score (towards the `DecisiveTag`, which represents the search key word)

    - For a section that contain `DecisiveTag`, it may also contain other tags, we calculate a distance between the `DecisiveTag` and other tags

    - **Key idea**: The closer the other tag A is to the `DecisiveTag`, the more relevant tag A is to the `DecisiveTag`

    - The shortest distance between tag A and `DecisiveTag` is $Distance(A,DecisiveTag)$
      - The shortest distance can be calculate with the **Dijkstra Algorithm**
      - Distance from tag A to tag A (itself) is 0
      
    - The relevance score of `DecisiveTag` to tag A is: 
      
      - $RelevanceScore(A,DecisiveTag)=\frac{1}{Distance(A,DecisiveTag)+1}$
      - The relevance score between `DecisiveTag`  and `DecisiveTag` is 1, the value correspond to the formula above
      
    - For a section that contain N tags (include `DecisiveTag`), we denote the set of tags as `T`, the relevance score (in regard to `DecisiveTag`) of the section is

      - $SectionRelevanceScore(DecisiveTag) = \frac{1}{N}\sum_{i\in{T}}{RelevanceScore(i,DecisiveTag)} = \frac{1}{N}\sum_{i\in{T}}\frac{1}{Distance(i,DecisiveTag)+1}$

    - For the case of multiple `DecisiveTag`, we denote the set of `DecisiveTag` as `D`, the section relevance score is:

      - $TotalWeightedFrequency(D) = \sum_{i\in{D}} WeightedFrequency(i)$

      - $SectionRelevanceScore(D)=\sum_{i\in{D}} \frac{WeightedFrequency(i)}{TotalWeightedFrequncy(D)} \times SectionRelevanceScore(i)$

    - Optional: Then normalized the `SectionRelevanceScore` to the value such their sum equals 1

- Search Algorithm Approach 2: Importance Weighted Relevance Score
  - When computing the relevance score of any tag A to the decisive tag, we multiply the importance score of the tag A as weight
  - To decide the search results, we consider both the importance of the content and the relevance of the content

- User Feedback

  - User can provide a binary feedback on the search results of each section (Helpful or Not Helpful)

  - For `p` positive and `q` negative feedback, it will generate a feedback score
    - $FeedbackScore = \frac{p-q}{100}$
    - We need to set an upper bound of the FeedbackScore to limit the influence of User Feedback, otherwise it may overwrites the RelevanceScore and ImportanceScore
    
  - A adjusted Rank Score will be used to rank sections display order
    - $RankSocre = SectionRelevanceScore + FeedbackScore$
- Recommendation

  - Consider both the relevance and importance of each tag
  - The importance score is calculated by the PageRank Algorithm
  - Important and relevant tags will be recommended based on the Recommendation score of the tag
    - $RecommendationScore(A,DecisiveTag) = ImportanceScore(A) \times TagRelevanceScore(A,DecisiveTag)$
    - $RelevanceScore(A,DecisiveTag)=\frac{1}{Distance(A,DecisiveTag)+1}$

### 0x03 Implementation

- Database
  - Tasks
    - Chapter 1: zhuangyan
    - Chapter 2: zhuoru
    - Chapter 3: yiwei
    - Chapter 4: xuanwen
  - Sample Code:
    - `courseDB\courseDB.js`
- Back-end
  - Node.JS modules:
    - Mongoose: MongoDB interface to JavaScript code
    - Mathjs: Math operations (especially matrix operations)
    - Express.JS: For communication between back-end and front-end
  - Tasks
    - Search module: zhuoru
    - Recommendation module: zhuoru
- Front-end
  - Node.JS modules:
    - Next: Upgraded react structure (include routing function)
    - semantic-ui-react: UI component library
    - react-redux: Cross component data transmission
    - Axios: For communication between front-end and back-end

### 0x04 Way to Run the Code

- Environment Requirement

  - Database: MongoDB
  - JavaScript runtime environment: Node.JS
  
- Setup Environment

  - Clone the project from GitHub

  - Install required Node.JS modules

    ```shell
    npm install
    ```

- To run code, run the following command from the root directory of the project.

  - Clear database

    - Start the MongoDB shell by running the following code in any terminal
  
      ```shell
      mongosh
      ```

    - Switch to the `courseDB` database, run the following command in MongoDB shell
  
      ```SHELL
      use courseDB
      ```
  
    - Clear the database (when we have data update, we need to clear database and reinsert data to database)
  
      ```shell
      db.dropDatabase()
      ```
  
  - Create database and insert data. 
  
    - If `courseDB` already exists in your local database, delete it first before reinserting all data. 
  
    - Go to `./database/courseDB` directory in **Git Bash Shell**
  
    - Run the following command in **Git Bash Shell**
  
      ```shell
      bash createDB.sh
      ```
  
  - Make a search. Run the following command in any shell from the project root directory.
  
    ```shell
    node ./algorithm/relevanceScoreSearch.js
    # or
    node ./algorithm/importanceWeightedRelevanceScoreSearch.js
    ```
  
  - Make recommendation. Run the following command in any shell from the project root directory.
  
    ```shell
    node ./algorithm/recommend.js
    ```


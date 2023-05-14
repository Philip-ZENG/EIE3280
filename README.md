# EIE3280 Project Course Content Search Engine

### 0x00 Project Overview

In this project, we built a course content search engine, using which students can search for relevant course contents given a search query. A database consists of course slides text data from Chapter 1 to Chapter 8 of course EIE3280 is built. Three different approach of ranking relevant sections, importance score, distance based relevance score, importance weighted relevance score, inverse page frequency counting, are designed and compared. For the detailed design of algorithms and experiment results, see the reports in `./report` directory. A website application is built to visualize the search result and provides a interface for user interaction, the code is in [here](https://github.com/Philip-ZENG/course-content-search-engine-web).

### 0x01 File Structure

#### `./algorithm`

- `/WithoutSearchWordSplit`: Search input can only be a single word
  - `/importanceScoreSearch.js`: The relevant sections are ranked by only importance score (baseline algorithm)
  - `/distanceBasedRelevanceScoreSearch.js`: Implement the function of generating ranked section results based on search key words; the search score is purely based on distance between tags; Bench mark algorithm.
  - `/importanceWeightedRelevanceScoreSearch.js`: Use the Google PageRank importance score as the weight to compute importance weighted relevance score; An modified algorithm based on `relevanceScoreSearch.js`.
  - `/recommend.js`: Implement the function of recommending tags given certain decisive tags 

- `/WithSearchWordSplit`: Search input can be a sentence (a number of words)
  - `/ipf_importanceWeightedRelevanceScoreSearch.js`: Inverse page frequency is added to adjust the process of finding decisive tags
  - Other algorithms are the same as the one in `WithoutSearchWordSplit`, except that a word split function is added

#### `./database`

- `/courseDB`: Formal database for the application; Create MongoDB database named `courseDB`; define and insert all tags, pages, and sections into the database
  - `/tag.js`: Define and insert all tags
  - `/chapter_i.js`: Define and insert pages and sections of chapter `i`, data from chapter 1 to 8 are used to build database
  - `/createDB.sh`: bash script to run multiple commands at once; Run this script to create the whole database in one shot
- `/tagGraphDB`: Test and develop tag graph related functions
  - `/tagGraphDB.js`: Create MongoDB database named `tagGraphDB`; define and insert all tags into the database; tags are designed to represent node in a tag graph
  - `/shortestDistanceBetweenTags.js`: Dijkstra algorithm to calculate shortest distance between tag nodes
  - `/pageRank.js`: Google PageRank algorithm, compute the importance score of each tag in the tag graph
  - `/indexed_tag_graph.png`: Image that show the connection between tags and their unique index

#### `./experiment`

- Experiment record of various test cases

#### `./report`

- Final report, presentation slides and presentation videos

### 0x02 How to Run the Code

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
  
  - To evaluate a search algorithm. Enter commands in any shell from the project root directory. For example, to run distance based search algorithm, run the following commands
  
    ```shell
    node ./algorithm/WithoutSearchWordSplit/distanceBasedRelevanceScoreSearch.js
    # or
    node ./algorithm/WithSearchWordSplit/distanceBasedRelevanceScoreSearch.js
    ```


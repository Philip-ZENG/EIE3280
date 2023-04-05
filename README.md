# EIE3280 Project

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

   - Section Schema
   - Tag Schema


### 0x02 Mechanism Design

- Map Search Word to Tags
  - Do string match to find pages that contain the search word string
    - If the string is found in the page's content, it has a weight of 1
    - If the string is found in the page's title, it has a weight of 2

  - Map the matched page to its corresponding Sections and Tags, count the frequency of occurrence
  - Determine the `DecisiveTag` based on tag occurrence frequency (top 3 most frequent)
  - Alternative: Classification Machine Learning Model

- Rank Tagged Sections
  - Find all the section that contains the `DecisiveTag`
  - Rank these section based on PageRank Algorithm (Need to build a graph based on tags)
  - Or check "Relevance Score"


### 0x03 Implementation

- Database Building
  - Tasks
    - Chapter 1: 庄严
    - Chapter 2: 曾焯儒
    - Chapter 3: 彭一伟
    - Chapter 4: 陈宣文
  - Sample Code:
    - `database\courseDB.js`




# EIE3280 Project

### 0x00 File Structure

- `./database`: Formal database for the application
  - `courseDB.js`: Create MongoDB database named `courseDB`; define and insert all tags, pages, and sections into the database
  - `queryCourseDB.js`: Implement the function of generating ranked section results based on search key words
- `./tagGraph`: test and develop tag graph related functions
  - `tagGraph.js`: Create MongoDB database named `tagGraphDB`; define and insert all tags into the database; tags are designed to represent node in a tag graph
  - `shortestDistanceBetweenTags.js`: Dijkstra algorithm to calculate shortest distance between tag nodes

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

- Rank Tagged Sections

  - Build a graph based on tags, each tag is a node in the graph

  - Find all the section that contains the `DecisiveTag`

  - Rank these section based on a Relevance Score (towards the `DecisiveTag`, which represents the search key word)

    - For a section that contain `DecisiveTag`, it may also contain other tags, we calculate a distance between the `DecisiveTag` and other tags
    
    - The closer the other tag A is to the `DecisiveTag`, the more relevant tag A is to the `DecisiveTag`
    
    - The shortest distance between tag A and `DecisiveTag` is $Distance(A,DecisiveTag)$
      - The shortest distance can be calculate with the **Dijkstra Algorithm**
      
    - The relevance score of `DecisiveTag` to tag A is: 
      
      - $RelevanceScore(A,DecisiveTag)=\frac{1}{Distance(A,DecisiveTag)+1}$
      
    - The relevance score between `DecisiveTag`  and `DecisiveTag` is 1
    
    - For a section that contain N tags (include `DecisiveTag`), we denote the set of tags as `T`, the relevance score (in regard to `DecisiveTag`) of the section is
      
      $SectionRelevanceScore(DecisiveTag) & =  \frac{1}{N}\sum_{i\in{T}, i\neq{DecisiveTag}}{RelevanceScore(i,DecisiveTag)}\\ & = \frac{1}{N}\sum_{i\in{T}, i\neq{DecisiveTag}}\frac{1}{Distance(i,DecisiveTag)+1}$
      
    - For the case of multiple `DecisiveTag`, we denote the set of `DecisiveTag` as `D`, the section relevance score is:
    
      - $TotalWeightedFrequency(D) = \sum_{i\in{D}} WeightedFrequency(i)$
    
      - $SectionRelevanceScore(D)=\sum_{i\in{D}} \frac{WeightedFrequency(i)}{TotalWeightedFrequncy(D)} \times SectionRelevanceScore(i)$
    
    - Then normalized the `SectionRelevanceScore` to the value such their sum equals 1
  
- User Feedback

  - User can provide a binary feedback on the search results (Helpful or Not Helpful)

  - For `p` positive and `q` negative feedback, it will generate a feedback score
    - $FeedbackScore = \frac{p-q}{100}$
    
  - A adjusted Rank Score will be used to rank sections display order
    - $RankSocre = SectionRelevanceScore + FeedbackScore$
  
- Recommendation

  - Consider both the relevance and importance of each tag

  - The importance score is calculated by the PageRank Algorithm

  - Important and relevant tags will be recommended based on the Recommendation score of the tag
    - $RecommendationScore(A,DecisiveTag) = ImportanceScore(A) + RelevantScore(A,DecisiveTag)$

### 0x03 Implementation

- Database Building
  - Tasks
    - Chapter 1: 庄严
    - Chapter 2: 曾焯儒
    - Chapter 3: 彭一伟
    - Chapter 4: 陈宣文
  - Sample Code:
    - `database\courseDB.js`




# Systems Development and Frameworks - Group Assignments - Winter Term 2019/20

| Github alias                                       | Name     |
| -------------------------------------------------- | -------- |
| [JeeTee0/d064467](https://github.com/JeeTee0)      | Oskar S. |
| [medizinmensch](https://github.com/medizinmensch/) | Youri S. |
| [menno4000](https://github.com/menno4000)          | Max L.   |

## Project

[![Build Status](https://travis-ci.com/medizinmensch/Systems-Development-and-Frameworks.svg?branch=setup-travis)](https://travis-ci.com/medizinmensch/Systems-Development-and-Frameworks)

This Project is made possible by vue-cli, bootstrap, apollo graphql, neo4j and more.


## Build Setup

### Backend
```bash
cd backend
yarn install
yarn dev
```

#### Database / Neo4j
```bash
cd backend/neo4j
docker build . -t sdaf_neo4j
docker run -p 7474:7474 -p 7687:7687 --volume=$HOME/neo4j/data:/data --volume=$HOME/neo4j/logs:/logs --env=NEO4J_dbms_memory_pagecache_size=4G --env NEO4J_AUTH=neo4j/wordpass -d --name sdaf_neo4j sdaf_neo4j
# Create some test data
cd ..
yarn db:seed
```

Open [localhost:7474](http://localhost:7474/browser/) for neo4j playground.

### Frontend
```bash
cd webapp
yarn install
yarn dev
```

## Test

Login via:
**Username:** `admin@aol.com`
**Password:** `admin123`

`AFTER LOGIN, YOU HAVE TO RELOAD THE PAGE TO TAKE AFFECT` (bug`)




# Exercise \#4

Connect your database with Neo4J

## Deadline is December 18th, 2019

1. ✅ Refactor your backend so that all the data is stored in[Neo4J](https://neo4j.com/). ✅
2. ✅ You are allowed to use a query builder like [neo4j-graphql-js](https://github.com/neo4j-graphql/neo4j-graphql-js)
   but at least one of your mutations and queries should access the database
   directly with [Neo4j JS driver](https://github.com/neo4j/neo4j-javascript-driver)
   and a custom cypher statement. ✅
3. ✅ Your objects in the database should be connected in some way. If you have a
   relationship like
   ```
   (:User)<-[:ASSIGNED]-(:Todo)
   ```
   then this query should return todos and user objects:
   ```gql
   query {
     todos {
       assignedTo {
         name
       }
     }
   }
   ```
4. ✅ Implement a filter (`WHERE` in cypher).
5. ✅ Implement some ordering (`ORDER BY` in cypher).
6. Implement pagination (`SKIP` and `LIMIT` in cypher).
7. ✅ Implement an update mutation that uses `MERGE`.
8. ✅ Write backend tests for all of the above.
9. ✅ Request a review from @roschaefer.
10. ✅ Request a review from sb. else.

If you copy code from other groups, please give credit to them in your commit
messages.


## Deadline is December 18th, 2019

1. ✅ Refactor your backend so that all the data is stored in[Neo4J](https://neo4j.com/).
2. ✅ You are allowed to use a query builder like [neo4j-graphql-js](https://github.com/neo4j-graphql/neo4j-graphql-js)
   but at least one of your mutations and queries should access the database
   directly with [Neo4j JS driver](https://github.com/neo4j/neo4j-javascript-driver)
   and a custom cypher statement.
3. ✅ Your objects in the database should be connected in some way. If you have a
   relationship like
   ```
   (:User)<-[:ASSIGNED]-(:Todo)
   ```
   then this query should return todos and user objects:
   ```gql
   query {
     todos {
       assignedTo {
         name
       }
     }
   }
   ```
4. ✅ Implement a filter (`WHERE` in cypher).
5. ✅ Implement some ordering (`ORDER BY` in cypher).
6. ✅ Implement pagination (`SKIP` and `LIMIT` in cypher).
7. ✅ Implement an update mutation that uses `MERGE`.
8. ✅ Write backend tests for all of the above.
9. Request a review from @roschaefer.
10. Request a review from sb. else.

If you copy code from other groups, please give credit to them in your commit
messages.


## Deadline is January 8th, 2020

1. ✅Optional tasks of exercise #3 are now required: Implement a permission layer around your app. Use graphql-shield and graphql-middleware. Here is some inspiration how your test cases could look like: Test cases for a permission layer [Picture is here](https://github.com/roschaefer/Systems-Development-and-Frameworks/blob/master/5/README.md)
2. Refactor your backend and frontend to show something different than just todos and users. Be creative.
3. ✅Do a remote pair-programming session. You can choose any pairing partner, either from our course or you can also ask our open-source community.
4. Record your pair-programming session and publish it. Choose any software you want. If you don't like being on the web, disable your webcam and save the video as "unlisted". I recommend PeerTube to host the video but there is also this commercial platform called YouTube as an alternative. Send a link to your recorded video to htw@roschaefer.de.
5. ✅Write backend tests.
6. Request a review from @roschaefer.
7. Request a review from sb. else.


TODO 07.01.20:

- Refactor to music store instead of todo-list
- refactor code
    - look for unused imports
    - improve functions/methods
- update modifiedAt field in frontend to match actual date/time after editing  
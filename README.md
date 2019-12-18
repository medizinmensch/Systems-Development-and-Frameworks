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

## Exercise 4
**Deadline is December 18th, 2019**

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


# Exercise \#5

Learn how to use graphql-middlewares and start programming with NuxtJS.

**Deadline is January 8th, 2020**

1. ✅ Optional tasks of exercise #3 are now required: Implement a permission
   layer around your app. Use [graphql-shield](https://github.com/maticzav/graphql-shield)
   and [graphql-middleware](https://github.com/prisma-labs/graphql-middleware).
   Here is some inspiration how your test cases could look like:
   [Test cases for a permission layer](../3/permissions.png)
2. Create a NuxtJS app and write a couple of different page components. Your
   page component should have some level of nesting. Like `/nested.vue` ,
   `/nested/index.vue` and `/nested/_id.vue`. 
3. ✅ Connect your frontend with your backend via [apollo-module](https://github.com/nuxt-community/apollo-module).
   So if you update a data object in your frontend, it sends a graphql mutation
   to the backend.
4. Make use of apollo-module's [authentication helpers](https://github.com/nuxt-community/apollo-module#authentication)
   and have at least one page component which requires authentication.
5. Refactor your backend and frontend to show something different than just
   todos and users. Be creative.
6. Do a remote pair-programming session. You can choose any pairing partner,
   either from our course or you can also ask our open-source community.
7. Record your pair-programming session and publish it. Choose any software you
   want. If you don't like being on the web, disable your webcam and save the
   video as "unlisted". I recommend [PeerTube](https://joinpeertube.org/) to
   host the video but there is also this commercial platform called YouTube as
   an alternative. Send a link to your recorded video to htw@roschaefer.de.
8. Write backend and frontend tests. Mock `this.$apollo` in your frontend tests
   and respond with some mocked data or simulate an error.
9. Request a review from @roschaefer.
10. Request a review from sb. else.

### Teaching goal

The point of exercise 3. and 4. is to socialize and see how easy it is to find
people from around the world who like to program with you and learn with you.
Even a recording of a pairing session can be interesting learning material. 
Think of people who don't have access to public education, e.g. studying at a
university like you do.

Also, if you get stuck, people can help out. Often, developers wait for too long
before they ask for help. It causes a lot of frustration and this particular
situation happened for a team while working on exercise \#3.  Asking for help in
our community chat is quick and usually there is always somebody around who can
help out: https://human-connection.org/discord


If you copy code from other groups, please give credit to them in your commit
messages.

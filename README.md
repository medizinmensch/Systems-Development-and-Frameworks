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



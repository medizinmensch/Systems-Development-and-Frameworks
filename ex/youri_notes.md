# Allgemein

* Frontend (bestehend aus Mobile & Web) <-API-> Backend (enthält Datenbank)
* Alles wird von DevOps gemanaged   
* Buss Faktor
    * Macht auf die Signifikanz vom Teilen von Wissen aufmerksam


# Git

a distributed version control system

## Aufbau
Bestehend aus:
* Repository
    * Index
        * Stash
        * RefLog
        * Commits
        * Branches (a pointer to one commit)
            * Remotes
        * Upstream branches
    * Working tree
    * Files
* Github: Pull request
    * Code Reviews
    * Forks 

## Commands
git remote...
* List: -v 
* modify: add|remove <remote> <url>
* Download: git fetch <remote> 
* Sync: git (reset|merge) <remote/branch>
* Upload: git push <remote> -u <branch>

History of actions: git reflog

## Branches

## Merge vs Rebase


**Merge:**
```
git checkout feature
git merge master
```
Fasse alle Änderungen zum master (seit letztem gemeinsamem commit) in einem neuen Commit auf dem feature branch zusammen.
--> Nicht destruktiv (history bleibt erhalten), dafür ggf. unnötige merge commits
--> Sollte öffentliche merges benutzt werden

**Rebase:**
```
git checkout feature
git rebase master
```

Ändert die history: Erschafft aus jedem commit (=Änderung) des feature branchs (seit letztem gemeinsamen commit) einen neuen commit und wendet diesen nacheinander als neuen commit auf die Spitze des masters an (als feature branch)
--> Mehr übersicht, weil keine unnötigen merge commits und aufgrund des linearen Verlaufs
--> Aber Vorsicht: da sich die history ändert und git ein ein distributed version control system ist, können unterschiedliche historys auftreten. Dies sollte vermieden werden


# VueJS

## Server vs Client Side Rendering

For static sites always server side rendering.
For dynamic sites it depends. 

### Server Side rendering

Two Options:
* Pre-rendered (dynamic content like user data hardly possible): Renders files into HTML files (eg jekyll renders markdown) and statically provisions them
* Dynamicly rendered: Logic is implemented in server which puts the dynamic content into the app itself for each frequest

PRO: 
* Is faster on slow connections (especially the initial page)
* SEO-ed (because web-crawler can analyze the site)
* great for static sites

CON: 
* More processing on the servers as they have to compose the HTMLs for the response
* slower page rendering (as you have to do a full page reloads every time)
* poor site interactions

### Client side rendering
Client get's App with heavy JS logic to Fetch all the dynamic content itself

PRO:
* great for web applications
* robust selection of JS libraries
* + inverse of server-side cons
CON:
* usually requires external libraries
* Inverse of server-side pros

## Virtual DOM

DOM: 
* a tree like data structure that was parsed by the browser from the HTML
* expensive to update as it can only update itself in it's entirety 
Virtual DOM:
* Abstraction of an abstraction of structured text (HTML)
* Representation of the DOM with JS data structures/objects 

## VueJS syntax cheat sheet

| shortcoode 	| usecase               	|
|------------	|-----------------------	|
| @          	| Events                	|
| {{ }}      	| Text                  	|
| v-if       	| Conditional rendering 	|
| v-for      	| For-loops             	|
| :          	| Data-binding          	|

## VueJS dogmas

* Data Down, Events Up
* take advantage of re-rendering via computed properties & $emit
* implement re-usable customizable components


# Testing

|             | Bug            | No Bug         |
|-------------|----------------|----------------|
| Test fails  | True Positive  | False Positive |
| Test passes | False Negative | True Negative  |

## Advantages

* Saves money (manual testing is expensive in the long run, finding bugs in production can cost much, you loose users/customers when they are not satisfied)
* Security (glitches, machines crashing )
* Product quality
* Customer

## Pillars
1. Quality assurance
2. Refactor with confidence
3. Prevent over-engineering
4. Modularization
5. Documentation

## Testing Styles

1. Manual (use the least as this is the slowest with the least confidence)
2. End-to-End (like Cypress, Testcafé; Pros: tests automatically much functionality and user stories at once, leicht nach zu vollziehe; Cons: bugs müssen erst investigated werden (ist nicht sofort klar woher die bugs kommen) )
3. Integration (Frontend: Components (vue-test-utils); Server: (apollo) resovler)
4. Unit (Frontend: Filters, Validators; Server: (apollo), helpers, Directives) (use the most as this is the fastest with the most confidence, most granular and most specific; Cons: only tests very specific functionality but can still not catch every bug, you still have to know which unit tests to write)

## Do's and Dont's 

### Do's
* check that actions changes something
* check via css classes/ids
* Arrange -> Act -> Assert (Given, When,)
    * testing pattern to describe the natural phases of most software test
    * *Arrange*: setup; *Act*: behaviour under test (typically single line); *Assert*: verification
* try various context in nested test cases
* mutant testing


### Don'ts 
* sacrifice simplicity to reduce redundancy
* create atomic tests



# GraphQL
= schema based (REST is protocol based)

PROs:
* client can dictate exactly what it needs --> this leads to less requests 
CONs:
* missuses HTTP status codes: will always return status code 200 (errors are inside json), makes error handling more difficult
* lack of build-in caching support (REST supports native HTTP caching as they have multiple endpoints)
* higher complexity
* newer on the marked means less supported by other companies 

## Tips
* use middlewares fur pluggable behaviour (permissions, notifications, email delivery, error tracking)


# Backend, Apollo, Authentication, JWT

## Authentication

### Classic sessions/cookies schema

1. client: POST email, psw to server
2. server: store user in server memory, generate session ID as cookie and send it to client
3. client: save session id as cookie, for every following request, send session ID cookie
4. server: checks whether session id aligns with in memory user, give respective response

### JWT (Json Web token)
* PRO: does not need a state on server (instead it's saved on the client) --> multiple servers can verify users without syncing client session 

1. client: POST email, psw to server
2. server: encodes JWT with secret-key, send it to client
3. client: save jwt (however it likes), send jwt with every request
4. server: verify jwt and get user from jwt 
  
**Contains** (seperated by .)
* Header: typically algorithm and type (like `HS256`)
* payload: claims (like `user_id`, `iat` (issued at, time of token creation for experation, or `eat` for expired at))
* verify signature (to verify that the user did not mess with the token by taking header and payload, combining it and encoding it via secret key)

--> user/client can change header and payload, but verify signature will show the server that it was tampered with header or payload

### GraphQL Shield
> Acts as middleware 


# JS stuff

## Higher order functions and anonymous functions

**Higher order functions**:
examples in js: *map*, *reduce*, *filter*, *forEach*
> a function, that either takes a function as an argument (then called callback function because it's called back by the higher order function) or returns a function itself
example: 
```JavaScript
let doubles = [1,2,3].map(function (n) { return n * 2})
```
* map is a higher order function because it takes a function as an argument
* the argument is a higher order function because it is an argument of a function

# Neo4J / GraphQl
> Neo4J is a Graph Database. It works well with GraphQL but it's coworking is not a must

* Graph Database
* directed, labelled, with properties

## GraphQL Schema Definiton Language (SDL)

```JavaScript
type TypeName {
    fieldName: FieldType
    referenceField: TypeName
    listReferenceField: [TypeName]
}
```

To define a node with the label Movie with the properties movieId, title and description.
```JavaScript
type Movie { // Movie is the label of the node
    movieId: ID! // must give an ID
    title: String
    description: String
    actor: [Actor] // object type Actor must be defined somewhere else
}
```

## Defining Query, Mutations and Resolvers
Query and Mutations are automatically generated with `neo4j-graphql`.
Resolvers are integrated in the schema augmentation process. 


### Queries (=GETs)

```JavaScript
type Query {
  Movie(_id: String, movieId: ID, title: String, description: String: [Movie]
  Actor(actorId: ID, name: String, _id: String: [Actor]
  User(userId: ID, name: String, _id: String[User]
}
```

### Mutations (=POSTs)

```JavaScript
type Mutation {
  CreateMovie(movieId: ID, title: String, description: String): Movie
  UpdateMovie(movieId: ID!, title: String, year: Int, description: String): Movie
  DeleteMovie(movieId: ID!): Movie
  AddMovieActors(from: _ActorInput!, to: _MovieInput!): _AddMovieActorsPayload
}
```

### Resolver

```JavaScript
const typeDefs = ```
type User {
    userId: ID!
    firstName: String
    lastName: String
    fullName: String
}
```;
const resolvers = {
    User: {
        fullName(obj, params, ctx, resolveInfo) {
            return `${obj.firstName} ${obj.lastName}`;
        }
    }
};
const schema = makeAugmentedSchema{
    typeDefs,
    resolvers
}
```

## Cypher language
> `Match <Pattern> Return <Variables>`

> `...(variablefor:label {property: "valueOfProperty"})-[variableof:relationship]->(variableof:anotherLabel {anotherProperty: "anotherValue"})...`

### Read

* **All:** `MATCH (n) RETURN n`
* **Type:** `MATCH (name:type) RETURN name`
* **Match all employees of the department with the name "IT Department", give me the person names:**

```
MATCH (p:Person)<-[:EMPLOYEE]-(d:Department)
WHERE d.name = "IT Department"
RETURN p.name
```

### Write
**TODO**
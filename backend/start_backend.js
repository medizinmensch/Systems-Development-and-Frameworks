const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
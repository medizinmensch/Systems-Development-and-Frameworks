const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
module.exports = new ApolloServer({
    typeDefs,
    resolvers
});
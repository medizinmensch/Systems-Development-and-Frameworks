const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("graphql-tools");

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const permissions = require('./permissions.js');
const { getContext} = require('./helper/context.js');

const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    permissions,
);
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
function getApolloServer() {
    return new ApolloServer({
        schema, context: ({ req }) => {
            return getContext(req);
        }
    })
}

function getTestApolloServer(req) {
    return new ApolloServer({
        schema, context: () => {
            return getContext(req);
        }
    })
}

module.exports.getApolloServer = getApolloServer;
module.exports.getTestApolloServer = getTestApolloServer;

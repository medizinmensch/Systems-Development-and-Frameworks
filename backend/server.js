const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("graphql-tools");

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const permissions = require('./permissions.js');
const { getContext, getTestContext } = require('./helper/context.js');

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

function getTestApolloServer() {
    return new ApolloServer({
        schema, context: () => {
            const req = {
                "get": () => {
                    console.log(typeof(undefined))
                    return { "Authorization": undefined }
                }
            }
            return getContext(req);
        }
    })
}




module.exports.getApolloServer = getApolloServer;
module.exports.getTestApolloServer = getTestApolloServer;
const {applyMiddleware} = require("graphql-middleware");

const {makeExecutableSchema} = require("graphql-tools");

const {AuthenticationError} = require("apollo-server-errors");
const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const permissions = require('./permissions.js');
const users = require('./users.js');
const jwt = require('jsonwebtoken');



function getUser(req) {
    const token = req.get('Authorization');
    if (token != null) {
        const decoded = jwt.verify(token, 'secret secret');
        let new_user = "";
        users.forEach(user => {
            if (user.email === decoded.email) {
                new_user = user
            }
        });
        if (new_user === "") throw new AuthenticationError('User provided in JWT not found.');
        return new_user
    }
    return null

}

const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    permissions,

);
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
module.exports = new ApolloServer({
    schema: schema,
    context: ({ req }) => {
        const user = getUser(req);
        return {user}
    }

});
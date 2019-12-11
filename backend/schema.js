const { gql } = require('apollo-server');

const typeDefs = gql`    
    type Query {
        todos: [Todo]
    }
    type Mutation {
        createEntry(text: String!): Todo
        deleteEntry(id: String!): Boolean
        login(email: String!, password: String!): Login
        updateTodo(id: String!, text: String!): Todo
    }

    type Todo {
        id: String!
        text: String!
        user: String!
    }
    type User {
        id: Int!
        name: String!
    }
    type Login {
        token: String!
        user: String!
    }
`;

module.exports = typeDefs;


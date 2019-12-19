const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        todos(page: Int, size: Int): [Todo]
    }
    type Mutation {
        login(email: String!, password: String!): Login
        createTodo(text: String!): Todo
        updateTodo(id: String!, text: String!): Todo
        deleteTodo(id: String!): Boolean
    }

    type Todo {
        id: String!
        text: String!
        user: User
        createdBy: String!
        createdAt: String!
        modifiedBy: String
        modifiedAt: String
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

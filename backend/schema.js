const { gql } = require('apollo-server');

const typeDefs = gql`    
    type Query {
        items: [Item]
    }
    type Mutation {
        createEntry(text: String!): Item
        deleteEntry(id: String!): Boolean
        login(email: String!, password: String!): JWT
    }

    type Item {
        id: String!
        text: String!
        editMode: Boolean!
    }
    
    type JWT {
        token: String!
    }
`;

module.exports = typeDefs;


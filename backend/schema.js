const { gql } = require('apollo-server');

const typeDefs = gql`    
    type Query {
        items: [Item]
    }
    type Mutation {
        createEntry(text: String!): Item
        deleteEntry(id: String!): Boolean
    }

    type Item {
        id: String!
        text: String!
        editMode: Boolean!
    }
`;

module.exports = typeDefs;


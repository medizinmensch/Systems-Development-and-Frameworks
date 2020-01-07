const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        songs(page: Int, size: Int): [Song]
    }
    type Mutation {
        login(email: String!, password: String!): Song
        createSong(name: String!): Song
        updateSong(id: String!, name: String!): Song
        deleteSong(id: String!): Boolean
    }

    type Song {
        id: String!
        name: String!
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

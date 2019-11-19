const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Each item has a text which indicates the ToDo and describes the task needed to be done. 
  type Item {
    id: Int
    text: String
    editMode: Boolean
  }
  
  type Query {
    items: [Item]
  }
`;

const items = [
    { id: 0, editMode: false, text: "Take out the trash" },
    { id: 1, editMode: false, text: "Get A+ in SDF" },
    { id: 2, editMode: false, text: "Trashtalk the vue 'Getting started' guide" },
    { id: 3, editMode: false, text: "git commit -m 'this'" }
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        items: () => items,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
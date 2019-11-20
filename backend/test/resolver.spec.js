//const {ALL_ITEMS_QUERY, CREATE_ENTRY, DELETE_ENTRY} = require("../../webapp/src/queries/graphql");
const {gql} = require('graphql-tag');

const {createTestClient} = require('apollo-server-testing');

const ALL_ITEMS_QUERY = gql`
    query itemsQuery {
        items {
            id,
            text,
            editMode
        }
    }
`;

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const {query, mutate} = createTestClient(server);

it("behaves in a specified way", () => {
    expect(query({query: ALL_ITEMS_QUERY
    })).resolves.toMatchObject("bla")

});
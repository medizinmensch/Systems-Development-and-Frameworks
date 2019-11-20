const {ApolloServer, gql} = require('apollo-server-express');
const {createTestClient} = require('apollo-server-testing');
const typeDefs = require('../schema.js');
const resolvers = require('../resolvers.js');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const {query, mutate} = createTestClient(server);

// could not outsource these queries/mutations...
const ALL_ITEMS_QUERY = gql`
    query itemsQuery {
        items {
            id,
            text,
            editMode
        }
    }
`;

const CREATE_ENTRY = gql`
    mutation createEntry($text: String!) {
        createEntry(text: $text) {
            id,
            text,
            editMode
        }
    }
`;

const DELETE_ENTRY = gql`
    mutation DeleteEntry($id: String!) {
        deleteEntry(id: $id)
    }
`;

// todo's: add beforeEach's, add more/better test cases
describe('Queries', () => {
    it("has start todo items", () => {
        query({query: ALL_ITEMS_QUERY}).then((data) => {
            expect(data.data.items).toHaveLength(4);
        });
    });
});

describe('Mutations', () => {
    const exampleText = "example text";
    it("creates entry", () => {
        mutate({mutation: CREATE_ENTRY, variables: {text: exampleText}})
            .then((data) => {
                expect(data.data.createEntry.id).anything
            });
    });
    it("deletes entry", () => {
        mutate({mutation: DELETE_ENTRY, variables: {id: "3"}})
            .then((data) => {
                expect(data.data.deleteEntry).toBe(true)
            });
    });
});

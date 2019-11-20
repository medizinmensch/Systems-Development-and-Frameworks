const { ApolloServer, gql } = require('apollo-server');
const server = require("../server")


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

const {query, mutate} = createTestClient(server);

it("behaves in a specified way", async (done) => {
    await expect(query({query: ALL_ITEMS_QUERY
    })).resolves.toMatchObject("bla")    
});
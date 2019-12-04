const {gql} = require('apollo-server-express');
const {createTestClient} = require('apollo-server-testing');
const {getTestApolloServer} = require('../server.js');
const users = require('../../backend/users.js');
const jwt = require('jsonwebtoken');

const server = getTestApolloServer();
const initClient = createTestClient(server);
const query = initClient.query;
const mutate = initClient.mutate;

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

const LOGIN = gql`
    mutation login($email: String!, $password:String!) {
        login(email: $email, password: $password)
    }
`;

describe('User is logged in', () => {
    let testServer;
    beforeEach(() => {
        // will always use admin user for requests
        testServer = getTestApolloServer(() => {
            return users[0]
        });
    });
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
});

describe('User is not logged in', () => {
    let testServer;
    beforeEach(() => {
        testServer = getTestApolloServer(() => {
            return null
        });
    });
    it("executes login mutation", () => {
        const userEmail = "admin@aol.com";
        const userPassword = "admin123";
        mutate({mutation: LOGIN, variables: {email: userEmail, password: userPassword}})
            .then((data) => {
                const token = data.data.login;
                expect(token).not.toBe('undefined');
                expect(token).not.toBe(null);
                const tokenDecoded = jwt.verify(token, "secret secret");
                expect(tokenDecoded.email).toBe(userEmail);
                expect(tokenDecoded.password).toBe(userPassword);
            });
    });
});



const { gql } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const { getTestApolloServer } = require('../server.js');
const jwt = require('jsonwebtoken');
const server = getTestApolloServer();
const initClient = createTestClient(server);
const query = initClient.query;
const mutate = initClient.mutate;
const dotenv = require("dotenv")

dotenv.config();

// could not outsource these queries/mutations...
const ALL_ITEMS_QUERY = gql`
    query itemsQuery {
        items {
            id,
            text
        }
    }
`;

const CREATE_ENTRY = gql`
    mutation createEntry($text: String!) {
        createEntry(text: $text) {
            id,
            text
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
        login(email: $email, password: $password) {
            token
            user
        }
    }
`;

describe('User is logged in', () => {
    describe('Queries', () => {
        it("has start todo todos", () => {
            query({ query: ALL_ITEMS_QUERY }).then((data) => {
                expect(data.data.items).toHaveLength(4);
                expect(data.data.items).toMatchObject([
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                    { id: 4 }
                ]);
            });
        });
    });

    describe('Mutations', () => {
        const exampleText = "example text";
        it("creates entry", () => {
            mutate({ mutation: CREATE_ENTRY, variables: { text: exampleText } })
                .then((data) => {
                    expect(data.data.createEntry.id).toBe(123987123981723)
                    expect(data.data.createEntry.id).toBeGreaterThanOrEqual(0)
                    expect(typeof data.data.createEntry.id).toBe('string')
                });
        });
        it("deletes entry", () => {
            mutate({ mutation: DELETE_ENTRY, variables: { id: "3" } })
                .then((data) => {
                    expect(data.data.deleteEntry).toBe(true)
                });
        });
    });
});



describe('User is not logged in', () => {
    it("True negative for creating todos", async () => {
        const todo_id = 2;
        const todo_text = "test text";
        const data = await mutate(
            {
                mutation: CREATE_ENTRY,
                variables:
                {
                    id: todo_id,
                    text: todo_text
                }
            }
        )
        console.log(data)
        expect(data.errors[0].message).toBe("Not Authorised!")
    });
    it("Login", async () => {
        const x = await mutate(
            {
                mutation: LOGIN,
                variables: {
                    email: process.env.ADMIN_EMAIL,
                    password: process.env.ADMIN_PASSWORD
                }
            }
        )
        console.log(x)
        expect(x.data.token).toContain("asd")
    })
});

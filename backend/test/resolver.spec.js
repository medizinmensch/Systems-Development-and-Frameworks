const { gql } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const { getTestApolloServer } = require('../server.js');
const dotenv = require("dotenv");

let testServer = getTestApolloServer();
let testClient = createTestClient(testServer);
let query = testClient.query;
let mutate = testClient.mutate;


dotenv.config();

// could not outsource these queries/mutations...
const LOGIN = gql`
    mutation login($email: String!, $password:String!) {
        login(email: $email, password: $password) {
            token
            user
        }
    }
`;

const ALL_TODOS_QUERY = gql`
    query todosQuery {
        todos {
            id
            text
            user
        }
    }
`;

const CREATE_TODO = gql`
    mutation createTodo($text: String!) {
        createTodo(text: $text) {
            id
            text
            user
        }
    }
`;

const UPDATE_TODO = gql`
    mutation updateTodo($id: String!, $text: String!){
        updateTodo(id: $id, text: $text){
            id
            text
        }
    }
`;

const DELETE_TODO = gql`
    mutation DeleteTodo($id: String!) {
        deleteTodo(id: $id)
    }
`;

describe('User is logged in', () => {
    beforeEach(async () => {
        const result = await testClient.mutate({
            mutation: LOGIN,
            variables: {email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD}
        });
        let req = new Map();
        req.set("Authorization", result.data.login.token);
        testServer = getTestApolloServer(req);
        testClient = createTestClient(testServer);
        query = testClient.query;
        mutate = testClient.mutate;
    });
    afterEach(async () => {
        //remove token header
        testServer = getTestApolloServer();
        testClient = createTestClient(testServer);
    });
    describe('Queries', () => {
        it("has start todo todos", () => {
            query({ query: ALL_TODOS_QUERY }).then((data) => {
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
            mutate({ mutation: CREATE_TODO, variables: { text: exampleText } })
                .then((data) => {
                    expect(data.data.createEntry.id).toBe(123987123981723)
                    expect(data.data.createEntry.id).toBeGreaterThanOrEqual(0)
                    expect(typeof data.data.createEntry.id).toBe('string')
                });
        });
        it("deletes entry", () => {
            mutate({ mutation: DELETE_TODO, variables: { id: "3" } })
                .then((data) => {
                    expect(data.data.deleteEntry).toBe(true)
                });
        });
    });
});



describe('User is not logged in', () => {
    it("creation fails because user has no JWT token.", async () => {
        const todo_id = 2;
        const todo_text = "test text";
        const data = await mutate(
            {
                mutation: CREATE_TODO,
                variables:
                {
                    id: todo_id,
                    text: todo_text
                }
            }
        );
        console.log(data);
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
        );
        console.log(x);
        expect(x.data.token).toContain("asd")
    })
});

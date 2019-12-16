const {gql} = require('apollo-server-express');
const {createTestClient} = require('apollo-server-testing');
const {getTestApolloServer} = require('../server.js');
const dotenv = require("dotenv");

let testServer = getTestApolloServer();
let testClient = createTestClient(testServer);
let query = testClient.query;
let mutate = testClient.mutate;

dotenv.config();
const testUserEmail = process.env.TESTUSER_EMAIL;
const testUserPassword = process.env.TESTUSER_PASSWORD;
const testUserName = process.env.TESTUSER_NAME;

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
            variables: {email: testUserEmail, password: testUserPassword}
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
        it("has start todo todos", async () => {
            const data = await query({query: ALL_TODOS_QUERY});
            console.log(data.data.todos);
            //expect(data.data.items).toHaveLength(4);
        });
    });

    describe('Mutations', () => {
        const exampleText = "example text";
        const exampleText2 = "new example text";
        it("creates entry", async () => {
            const data = await mutate({mutation: CREATE_TODO, variables: {text: exampleText}});
            console.log(data.data.createTodo);
            expect(data.data.createTodo.text).toBe(exampleText);
            expect(data.data.createTodo.user).toBe(testUserName)
        });
        it("creates and then updates entry", async () => {
            const createData = await mutate({mutation: CREATE_TODO, variables: {text: exampleText}});
            const todoId = createData.data.createTodo.id;
            expect(createData.data.createTodo.text).toBe(exampleText);
            expect(createData.data.createTodo.user).toBe(testUserName);
            const updateData = await mutate({mutation: UPDATE_TODO, variables: {id: todoId, text: exampleText2}});
            expect(updateData.data.updateTodo.text).toBe(exampleText2);

        });
        it("deletes entry", async () => {
            const data = await mutate({mutation: DELETE_TODO, variables: {id: "3"}});
            console.log(data.data.deleteTodo);
            expect(data.data.deleteTodo).toBe(true)
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

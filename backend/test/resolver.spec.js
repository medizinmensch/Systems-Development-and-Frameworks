const {gql} = require('apollo-server-express');
const {createTestClient} = require('apollo-server-testing');
const {getTestApolloServer} = require('../server.js');
const dotenv = require("dotenv");
const {verifyToken} = require('../helper/jwt.js');
require('babel-polyfill');
require("regenerator-runtime/runtime");

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
    query todosQuery{
        todos{
            id
            text
            user {
                name
            }
        }
    }
`;

const ALL_TODOS_QUERY_PAGINATED = gql`
    query todosQuery ($page: Int, $size: Int ){
        todos (page: $page, size: $size){
            id
            text
            user {
                name
            }
        }
    }
`;

const CREATE_TODO = gql`
    mutation createTodo($text: String!) {
        createTodo(text: $text) {
            id
            text
            user {
                name
            }
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
            expect(data.errors).toBeUndefined();
            expect(data.data.todos.length).toBeGreaterThan(0);
            expect(data.data.todos.length).toBeLessThanOrEqual(20) // 20 is the std
            expect(data.data.todos[0].user.name).toBe(testUserName)
        });
    });

    describe('Pagination', () => {
        it("Paginated and sized query has limited amount of todos per page", async () => {
            const data = await query({query: ALL_TODOS_QUERY_PAGINATED, variables: {page: 0, size: 3}});
            expect(data.errors).toBeUndefined();
            expect(data.data.todos.length).toBeGreaterThan(0);
            expect(data.data.todos.length).toBeLessThanOrEqual(3);
            expect(data.data.todos[0].user.name).toBe(testUserName)
        });

        it('Paged query returns no todos as testuser has less than 20 todos', async () => {
            const data = await query({query: ALL_TODOS_QUERY_PAGINATED, variables: {page: 10}});
            expect(data.errors).toBeUndefined();
            expect(data.data.todos.length).toBe(0);
        });

        it('Sized query returns right amount of todos', async () => {
            const data = await query({query: ALL_TODOS_QUERY_PAGINATED, variables: {size: 1}});
            expect(data.errors).toBeUndefined();
            expect(data.data.todos.length).toBe(1);
            expect(data.data.todos[0].user.name).toBe(testUserName)
        })
    });


    describe('Mutations', () => {
        const exampleText = "example text";
        const exampleText2 = "new example text";
        it("creates todo", async () => {
            const data = await mutate({mutation: CREATE_TODO, variables: {text: exampleText}});
            expect(data.data.createTodo.text).toBe(exampleText);
            expect(data.data.createTodo.user.name).toBe(testUserName)
        });
        it("creates and then updates todo", async () => {
            const createData = await mutate({mutation: CREATE_TODO, variables: {text: exampleText}});
            expect(createData.errors).toBeUndefined();
            const todoId = createData.data.createTodo.id;
            expect(createData.data.createTodo.text).toBe(exampleText);
            expect(createData.data.createTodo.user.name).toBe(testUserName);
            const updateData = await mutate({mutation: UPDATE_TODO, variables: {id: todoId, text: exampleText2}});
            expect(updateData.errors).toBeUndefined();
            expect(updateData.data.updateTodo.text).toBe(exampleText2);
        });
        it("deletes todo", async () => {
            const data = await mutate({mutation: DELETE_TODO, variables: {id: "3"}});
            expect(data.errors).toBeUndefined();
            expect(data.data.deleteTodo).toBe(true)
        });

        it("displays entries in alphabetically descending order", async () => {
            const createTopEntry = await mutate({mutation: CREATE_TODO, variables: {text: "z test"}});
            expect(createTopEntry.errors).toBeUndefined();
            const todoListData = await query({query: ALL_TODOS_QUERY, variables: {page: 0}});
            expect(todoListData.errors).toBeUndefined();
            expect(todoListData.data.todos.length).toBeGreaterThan(0);
            expect(todoListData.data.todos[0].text).toBe("z test");
            const id = todoListData.data.todos[0].id;
            const deleteTopEntrys = await mutate({mutation: DELETE_TODO, variables: {id: id}});
            expect(deleteTopEntrys.errors).toBeUndefined();
            expect(deleteTopEntrys.data.deleteTodo).toBe(true);
        });
    });
});


describe('User is not logged in', () => {
    beforeEach(async () => {
        let req = new Map();
        req.set("Authorization", "");
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
    it("fails because user has no JWT token.", async () => {
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
        expect(data.errors[0].message).toBe("Not Authorised!")
    });
    it("Login", async () => {
        const data = await mutate(
            {
                mutation: LOGIN,
                variables: {
                    email: testUserEmail,
                    password: testUserPassword
                }
            }
        );
        expect(data.errors).toBeUndefined();
        expect(data.data.login.user).toBe(testUserName);

        const token = data.data.login.token;
        const user = verifyToken(token);
        expect(user.name).toBe(testUserName);
        expect(user.email).toBe(testUserEmail);
        expect(user.password).toBe(testUserPassword);
    })
});

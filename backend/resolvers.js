const { AuthenticationError } = require("apollo-server-errors");

const uuidv1 = require('uuid/v1');
const todos = require('./data.js');
const users = require('./neo4j/users.js');
const { createJWTToken } = require('./helper/jwt.js');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves todos from the "todos" array above.
const resolvers = {
    Query: {
        todos: async (parent, args, context) => {
            const currentUser = context.user.name;
            console.log(`INFO - Got 'ALL_TODOS_QUERY' from user ‘${currentUser}'`);
            const session = context.driver.session();
            try {
                const todosQuery = await session.run(
                    'MATCH (t:Todo)-[:BELONGS]->(u:User)\n' +
                    'WHERE u.name = $userName\n' +
                    'RETURN t',
                    {
                        userName: currentUser
                    });
                const todos = todosQuery.records.map(todo => todo.get('t').properties);
                todos.forEach(todo => todo.user = currentUser);
                return todos;
            } finally {
                session.close()
            }
        }
    },
    Mutation: {
        login: async (parent, args, context) => {
            const session = context.driver.session();
            let token = "";
            try {
                const userQuery = await session.run(
                    'MATCH (u:User) WHERE u.email = $email RETURN u',
                    {
                        email: args.email
                    });
                const user = userQuery.records[0].get('u').properties;
                if (user.email === args.email && user.password === args.password) {
                    token = createJWTToken(user);
                    console.log("INFO - User '" + user.name + "' successfully logged in.");
                }
                if (token === "") throw new AuthenticationError('Wrong credentials...');
                return { token: token, user: user.name };

            } finally {
                session.close()
            }
        },
        createTodo: async (parent, args, context) => {
            console.log(`INFO - Got 'CREATE_TODO' from user ‘${context.user.name}'`);
            const session = context.driver.session();
            const todo = {
                id: uuidv1(),
                text: args.text
            };
            try {
                await session.run(
                    'CREATE (t:Todo {id: $id, text: $text})',
                    {
                        id: todo.id,
                        text: todo.text
                    }
                );
            } finally {
                session.close()
            }
            //create relationship
            const session2 = context.driver.session();
            try {
                await session2.run(
                    'MATCH (u:User), (t:Todo) \n' +
                    'WHERE u.name = $user_name AND t.id = $todo_id \n' +
                    'CREATE (t)-[r:BELONGS]->(u)\n' +
                    'RETURN u.name, type(r), t.id',
                    {
                        user_name: context.user.name,
                        todo_id: todo.id
                    }
                );
            } finally {
                session2.close()
            }
            todo.user = context.user.name;
            return todo
        },
        updateTodo: async (parent, args, context) => {
            console.log(`INFO - Got 'UPDATE_TODO' from user ‘${context.user.name}'`);
            const session = context.driver.session();
            try {
                let todo = await session.run(
                    'MERGE (t:Todo {id: $id})-[:BELONGS]->(u:User {name: $user}) \n' +
                    'ON MATCH SET t.text = $text \n' +
                    'RETURN t', {
                        id: args.id,
                        text: args.text,
                        user: context.user.name
                    });
                return todo.records[0].get("t").properties
            } finally {
                session.close()
            }
        },
        deleteTodo: async (parent, args, context) => {
            console.log(`INFO - Got 'DELETE_TODO' from user ‘${context.user.name}'`);
            const session = context.driver.session();
            try {
                await session.run(
                    'MATCH (t:Todo) \n' +
                    'WHERE t.id = $id\n' +
                    'DETACH DELETE t', {
                    id: args.id
                }
                )
            } finally {
                session.close()
            }
            return true
        }
    }
};

module.exports = resolvers;
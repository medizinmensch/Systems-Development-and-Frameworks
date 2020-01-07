const {AuthenticationError} = require("apollo-server-errors");
const uuidv1 = require('uuid/v1');
const {createJWTToken} = require('./helper/jwt.js');
const {getCurrentDate} = require('./helper/context.js');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves todos from the neo4j db
const resolvers = {
    Query: {
        todos: async (parent, args, context) => {
            const currentUser = context.user.name;
            let page = 0;
            let size = 20;
            if (typeof args.page != "undefined") page = args.page;
            if (typeof args.size != "undefined") size = args.size;

            console.log(`INFO - Got 'ALL_TODOS_QUERY' from user ‘${currentUser}'`);
            const session = context.driver.session();
            try {
                const todosQuery = await session.run(
                    'MATCH (t:Todo)-[:BELONGS]->(u:User)\n' +
                    'WHERE u.name = $userName\n' +
                    'RETURN t, u\n' +
                    'ORDER BY t.text DESC\n' +
                    'SKIP $page\n' +
                    'LIMIT $limit',
                    {
                        userName: currentUser,
                        page: (page * size),
                        limit: size

                    });
                const todos = todosQuery.records.map(todo => {
                    let abc = todo.get('t').properties;
                    abc.user = todo.get('u').properties;
                    return abc;
                });
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
                return {token: token, user: user.name};

            } finally {
                session.close()
            }
        },
        createTodo: async (parent, args, context) => {
            const currentUser = context.user.name;
            console.log(`INFO - Got 'CREATE_TODO' from user ‘${currentUser}'`);

            const session = context.driver.session();
            let query;

            try {
                query = await session.run(
                    'MATCH (u:User) WHERE u.name = $user_name \n' +
                    'CREATE (t:Todo {id: $id, text: $text, createdBy: $user_name, createdAt: $createdAt})-[r:BELONGS]->(u) \n' +
                    'RETURN t, u',
                    {
                        id: uuidv1(),
                        text: args.text,
                        user_name: context.user.name,
                        createdAt: getCurrentDate()
                    }
                );
            } finally {
                session.close()
            }

            const todo = query.records[0].get('t').properties
            todo.user = query.records[0].get('u').properties;

            return todo
        },
        updateTodo: async (parent, args, context) => {
            const currentUser = context.user.name;
            console.log(`INFO - Got 'UPDATE_TODO' from user ‘${currentUser}'`);
            const session = context.driver.session();
            try {
                let todo = await session.run(
                    'MERGE (t:Todo {id: $id})-[:BELONGS]->(u:User {name: $user}) \n' +
                    'ON MATCH SET t.text = $text, t.modifiedAt = $modifiedAt, t.modifiedBy = $modifiedBy \n' +
                    'RETURN t', {
                        id: args.id,
                        text: args.text,
                        user: currentUser,
                        modifiedBy: currentUser,
                        modifiedAt: getCurrentDate()
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

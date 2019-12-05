const {AuthenticationError} = require("apollo-server-errors");

const uuidv1 = require('uuid/v1');
const todos = require('./data.js');
const users = require('./users.js');
const {createJWTToken} = require('./helper/jwt.js');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves todos from the "todos" array above.
const resolvers = {
    Query: {
        todos: (parent, args, context) => {
            const currentUser = context.user.name;
            let usersTodos = [];
            // admin gets all todo's, everyone else only gets his/hers
            if (currentUser === "admin") return todos;
            todos.forEach(todo => {
                if (todo.user === currentUser) usersTodos.push(todo)
            });
            return usersTodos;
        }
    },
    Mutation: {
        createEntry: (parent, args, context) => {
            const todo = {
                id: uuidv1(),
                text: args.text,
                user: context.user.name
            };
            todos.push(todo);
            return todo
        },
        deleteEntry: (parent, args) => {
            const index = todos.findIndex(x => x.id === args.id);
            todos.splice(index, 1);
            // todo: compare logged in user and user of todo
            return true
        },
        login: (parent, args) => {
            let token = "";
            let userName = "";
            users.forEach(user => {
                if (user.email === args.email && user.password === args.password) {
                    token = createJWTToken(user);
                    userName = user.name;
                    console.log("INFO - User '" + user.name + "' successfully logged in.");
                }
            });
            if (token === "") throw new AuthenticationError('Wrong credentials...');
            return {token: token, user: userName};
        }
    }
};

module.exports = resolvers;
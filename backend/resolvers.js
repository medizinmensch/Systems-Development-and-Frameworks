const {AuthenticationError} = require("apollo-server-errors");

const uuidv1 = require('uuid/v1');
const items = require('./data.js');
const users = require('./users.js');
const jwt = require('jsonwebtoken');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves items from the "items" array above.
const resolvers = {
    Query: {
        items: () => items
    },
    Mutation: {
        // todo: save new items list to data.js?
        createEntry: (parent, args) => {
            const item = {
                id: uuidv1(),
                text: args.text,
                editMode: false
            };
            items.push(item);
            return item
        },
        deleteEntry: (parent, args) => {
            const index = items.findIndex(x => x.id === args.id);
            items.splice(index, 1);
            return true
        },
        login: (parent, args) => {
            let token = "";
            users.forEach(user => {
                if (user.email === args.email && user.password === args.password) {
                    console.log("INFO - User successfully logged in.");
                    token = jwt.sign(user, "secret secret");
                }
            });
            if (token === "") throw new AuthenticationError('Wrong credentials...');
            return token
        }
    }
};

module.exports = resolvers;
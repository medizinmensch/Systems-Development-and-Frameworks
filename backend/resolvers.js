const uuidv1 = require('uuid/v1');
const items = require('./data.js');

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
        }
    }
};

module.exports = resolvers;
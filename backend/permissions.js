const { rule, shield, and, or, not } =  require('graphql-shield');

const isAuthenticated = rule()(async (parent, args, context, info) => {
    if (context.user) {
        return true
    }
    return false
});

const permissions = shield({
    Query: {
        items: isAuthenticated

    },
    Mutation: {
        createEntry: isAuthenticated,
        deleteEntry: isAuthenticated,
        login: not(isAuthenticated),
    },
    Item: isAuthenticated
    }

);

module.exports = permissions;
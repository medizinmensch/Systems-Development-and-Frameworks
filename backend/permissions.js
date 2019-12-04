const { rule, shield, not } =  require('graphql-shield');

const isAuthenticated = rule()(async (parent, args, context) => {
    return !!context.user;

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

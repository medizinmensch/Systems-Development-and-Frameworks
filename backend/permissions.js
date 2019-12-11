const { rule, shield, not } =  require('graphql-shield');

const isAuthenticated = rule()(async (parent, args, context) => {
    return !!context.user;

});

const permissions = shield({
    Query: {
        todos: isAuthenticated

    },
    Mutation: {
        createEntry: isAuthenticated,
        deleteEntry: isAuthenticated,
        login: not(isAuthenticated),
        updateTodo: isAuthenticated
    },
    Todo: isAuthenticated,
    User: isAuthenticated
    }

);

module.exports = permissions;

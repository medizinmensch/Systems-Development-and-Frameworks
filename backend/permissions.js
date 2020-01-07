const {rule, shield, allow } =  require('graphql-shield');

const isAuthenticated = rule()(
    async (parent, args, context) => {
            return !!context.user;
});

const permissions = shield({
    Query: {
        todos: isAuthenticated
    },
    Mutation: {
        createTodo: isAuthenticated,
        updateTodo: isAuthenticated,
        deleteTodo: isAuthenticated,
        login: allow
    },
    Todo: isAuthenticated,
    User: isAuthenticated
    }

);

module.exports = permissions;

const {rule, shield, allow } =  require('graphql-shield');

const isAuthenticated = rule()(
    async (parent, args, context) => {
            return !!context.user;
});

const permissions = shield({
    Query: {
        songs: isAuthenticated
    },
    Mutation: {
        createSong: isAuthenticated,
        updateSong: isAuthenticated,
        deleteSong: isAuthenticated,
        login: allow
    },
    Song: isAuthenticated,
    User: isAuthenticated
    }

);

module.exports = permissions;

const {AuthenticationError} = require("apollo-server-errors");
const uuidv1 = require('uuid/v1');
const {createJWTToken} = require('./helper/jwt.js');
const {getCurrentDate} = require('./helper/context.js');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves songs from the neo4j db
const resolvers = {
    Query: {
        songs: async (parent, args, context) => {
            const currentUser = context.user.name;
            let page = 0;
            let size = 20;
            if (typeof args.page != "undefined") page = args.page;
            if (typeof args.size != "undefined") size = args.size;

            console.log(`INFO - Got 'ALL_SONGS_QUERY' from user ‘${currentUser}'`);
            const session = context.driver.session();
            try {
                const songsQuery = await session.run(
                    'MATCH (t:Song)-[:BELONGS]->(u:User)\n' +
                    'WHERE u.name = $userName\n' +
                    'RETURN t, u\n' +
                    'ORDER BY t.name DESC\n' +
                    'SKIP $page\n' +
                    'LIMIT $limit',
                    {
                        userName: currentUser,
                        page: (page * size),
                        limit: size

                    });
                const songs = songsQuery.records.map(song => {
                    let abc = song.get('t').properties;
                    abc.user = song.get('u').properties;
                    return abc;
                });
                return songs;
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
        createSong: async (parent, args, context) => {
            const currentUser = context.user.name;
            console.log(`INFO - Got 'CREATE_SONG' from user ‘${currentUser}'`);

            const session = context.driver.session();
            let query;

            try {
                query = await session.run(
                    'MATCH (u:User) WHERE u.name = $user_name \n' +
                    'CREATE (t:Song {id: $id, name: $name, createdBy: $user_name, createdAt: $createdAt})-[r:BELONGS]->(u) \n' +
                    'RETURN t, u',
                    {
                        id: uuidv1(),
                        name: args.name,
                        user_name: context.user.name,
                        createdAt: getCurrentDate()
                    }
                );
            } finally {
                session.close()
            }
            const song = query.records[0].get('t').properties
            song.user = query.records[0].get('u').properties;

            return song
        },
        updateSong: async (parent, args, context) => {
            const currentUser = context.user.name;
            console.log(`INFO - Got 'UPDATE_SONG' from user ‘${currentUser}'`);
            const session = context.driver.session();
            try {
                let song = await session.run(
                    'MERGE (t:Song {id: $id})-[:BELONGS]->(u:User {name: $user}) \n' +
                    'ON MATCH SET t.name = name, t.modifiedAt = $modifiedAt, t.modifiedBy = $modifiedBy \n' +
                    'RETURN t', {
                        id: args.id,
                        name: args.name,
                        user: currentUser,
                        modifiedBy: currentUser,
                        modifiedAt: getCurrentDate()
                    });
                return song.records[0].get("t").properties
            } finally {
                session.close()
            }
        },
        deleteSong: async (parent, args, context) => {
            console.log(`INFO - Got 'DELETE_SONG' from user ‘${context.user.name}'`);
            const session = context.driver.session();
            try {
                await session.run(
                    'MATCH (t:Song) \n' +
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

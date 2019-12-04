const {getApolloServer} = require('./server.js');

getApolloServer().listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
const { AuthenticationError } = require("apollo-server-errors");
const {getDriver} = require('../neo4j/neo4j.js');

const { verifyToken } = require('./jwt.js');
const users = require('../neo4j/users.js');

function getContext(req) {

    const driver = getDriver();
    // add user
    const authHeader = req.get('Authorization');
    if (typeof authHeader == "undefined") return { driver };
    const token = authHeader.replace('Bearer ', '');
    if (token == null) return { driver };

    const currentUser = verifyToken(token);
    const user = findUserFromToken(currentUser, token);

    return {
        user,
        driver
    }
}

function findUserFromToken(req_user, token) {
    let foundUser;
    users.forEach(user => {
        if (user.email === req_user.email) {
            user.token = token;
            foundUser = user
        }
    });
    if (typeof foundUser === "undefined") throw new AuthenticationError('User provided in JWT not found.');
    console.log("INFO - '" + foundUser.name + "' successfully requested.");
    return foundUser
}



module.exports.getContext = getContext;
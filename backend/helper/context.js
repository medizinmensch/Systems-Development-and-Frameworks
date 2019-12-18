const {AuthenticationError} = require("apollo-server-errors");

const {verifyToken} = require('./jwt.js');
const users = require('../users.js');

function getContext(req) {
    // add user
    const authHeader = req.get('Authorization');
    if (typeof authHeader == "undefined") return;
    const token = authHeader.replace('Bearer ', '');
    if (token == null) return;
    const currentUser = verifyToken(token);
    const user = findUserFromToken(currentUser, token);

    // todo add neo4j driver

    return {
        user
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
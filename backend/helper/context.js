const { AuthenticationError } = require("apollo-server-errors");
const {getDriver} = require('../neo4j/neo4j.js');

const { verifyToken } = require('./jwt.js');
const users = require('../neo4j/users.js');

function getContext(req) {
    const driver = getDriver();
    // add user
    if (typeof req == "undefined" ) return { driver };
    const authHeader = req.get('Authorization');
    if (!authHeader) return { driver };
    const token = authHeader.replace('Bearer ', '');
    if (!token) return { driver };

    const currentUser = verifyToken(token);
    const user = findUserFromToken(currentUser, token);
    if (typeof user === null) return { driver };

    return {
        user,
        driver
    }
}

function findUserFromToken(req_user, token) {
    // todo use query from db
    const foundUser = users.find(user => user.email === req_user.email);
    if (typeof foundUser === "undefined") return null;
    foundUser.token = token;
    return foundUser
}

function getCurrentDate() {
    const event = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', seconds: 'numeric'};
    return event.toLocaleDateString('de-DE', options)
}



module.exports.getContext = getContext;
module.exports.getCurrentDate = getCurrentDate;
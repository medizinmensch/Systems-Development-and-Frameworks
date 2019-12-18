const jwt = require('jsonwebtoken');

const ourSecret = "secret secret";

function verifyToken(authHeader) {
    if (authHeader != null) {
        return jwt.verify(authHeader, ourSecret);
    }
    return null
}

function createJWTToken(user) {
    return jwt.sign(user, ourSecret);
}

module.exports.verifyToken = verifyToken;
module.exports.createJWTToken = createJWTToken;
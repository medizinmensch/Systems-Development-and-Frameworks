const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const ourSecret = process.env.JWT_SECRET;

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
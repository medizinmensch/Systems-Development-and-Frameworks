const neo4j = require('neo4j-driver');
const dotenv = require("dotenv");

dotenv.config();
const user = process.env.NEO4J_USER;
const pw = process.env.NEO4J_PASSWORD;
let driver;

function getDriver(options = {}) {
    const {
        uri = process.env.NEO4J_URI,
        username = user,
        password = pw,
    } = options;
    if (!driver) {
        driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
    }
    return driver
}

module.exports.getDriver = getDriver;

const neo4j = require('neo4j-driver');

const user = "neo4j";
const pw = "wordpass";
let driver;

function getDriver(options = {}) {
    const {
        uri = "bolt://localhost:7687/",
        username = user,
        password = pw,
    } = options;
    if (!driver) {
        driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
    }
    return driver
}

module.exports.getDriver = getDriver;
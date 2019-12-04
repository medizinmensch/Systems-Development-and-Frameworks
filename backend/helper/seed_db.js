const neo4j = require('neo4j-driver').v1

let driver


console.log(neo4j)
function getDriver(options = {}) {
    const {
        uri = "http://localhost:7474/",
        username = "neo4j",
        password = "wordpass",
    } = options
    if (!driver) {
        driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
    }
    return driver
}
driver = getDriver()
const session = driver.session()

const resultPromise = session.writeTransaction(tx =>
    tx.run(
        'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)',
        { message: 'hello, world' }
    )
)

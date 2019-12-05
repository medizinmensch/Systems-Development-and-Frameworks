const {getDriver} = require('../neo4j/neo4j.js');
const uuidv1 = require('uuid/v1');

const exampleTodoTexts = ["Take out the trash", "Get A+ in SDAF", "git commit -m 'this'", "git diff --cached or --staged"];
console.log();

async function createTestData(amount) {
    await console.log(`Creating test data. ${amount} Todo's will be created.`);
    for (let i = 0; i<amount; i++) {
        const session = driver.session();
        const exampleText = exampleTodoTexts[Math.floor(Math.random()*(exampleTodoTexts.length-1))];
        const resultPromise = await session.run(
            'CREATE (a:Todo {id: $id, text: $text}) RETURN a',
            {
                id: uuidv1(),
                text: exampleText
            }
        );
        await console.log("Created Todo: " + resultPromise.records[0].get(0));
        await session.close();
    }
    await driver.close();
}

const driver = getDriver();
const amountOfTodos = 5;
createTestData(amountOfTodos).then(r => console.log("Finished creation of test data."));









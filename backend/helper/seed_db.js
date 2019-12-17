const {getDriver} = require('../neo4j/neo4j.js');
const uuidv1 = require('uuid/v1');
const users = require('../neo4j/users.js');

const exampleTodoTexts = ["Take out the trash", "Get A+ in SDAF", "git commit -m 'this'", "git diff --cached or --staged?", "learn cypher query language", "make frontend pretty"];
const exampleUsers = [];
users.forEach(user => {
    exampleUsers.push(user.name);
});

const driver = getDriver();
const amountOfTodos = 15;

async function createTestUser() {
    console.log(`Creating test data. ${users.length} User's will be created.`);
    for (let i = 0; i<users.length; i++) {
        const session = driver.session();
        const userQuery = await session.run(
            'CREATE (a:User {id: $id, email: $email, password: $password, name: $name, token: ""}) RETURN a',
            {
                id: users[i].id,
                email: users[i].email,
                password: users[i].password,
                name: users[i].name
            }
        );
        await console.log("Created user: " + userQuery.records[0].get(0));
        await session.close();
    }
}

async function createTestTodos(amount) {
    await console.log(`Creating test data. ${amount} Todo's will be created.`);
    for (let i = 0; i<amount; i++) {
        let session = await driver.session();
        const exampleText = exampleTodoTexts[Math.floor(Math.random()*(exampleTodoTexts.length))];
        const randomUser = exampleUsers[Math.floor(Math.random()*(exampleUsers.length))];
        const todoId = uuidv1();
        const todoQuery = await session.run(
            'CREATE (a:Todo {id: $id, text: $text}) RETURN a',
            {
                id: todoId,
                text: exampleText,
            }
        );
        await console.log("Created Todo: " + todoQuery.records[0].get(0));
        await session.close();

        session = await driver.session();
        const relQuery = await session.run(
            'MATCH (u:User), (t:Todo) \n' +
            'WHERE u.name = $user_name AND t.id = $todo_id \n' +
            'CREATE (t)-[r:BELONGS]->(u)\n' +
            'RETURN u.name, type(r), t.id',
            {
                user_name: randomUser,
                todo_id: todoId
            }
        );
        console.log("Created Relationship between: " + relQuery.records[0].get(0));
        await session.close();
    }
}

(async function() {
    try {
        await createTestUser();
        await createTestTodos(amountOfTodos);
        console.log("INFO - Finished seeding database.");
        process.exit(0)
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
})();












const {getDriver} = require('../neo4j/neo4j.js');
const uuidv1 = require('uuid/v1');
const users = require('../neo4j/users.js');
const {getCurrentDate} = require('./context.js');

const exampleSongNames = ["Atemlos durch die Nacht", "Alright", "Stop", "Kein Liebeslied", "Grosstadtwüste", "Schüsse in die Luft"];
const exampleUsers = [];
users.forEach(user => {
    exampleUsers.push(user.name);
});

const driver = getDriver();
const amountOfSongs = 15;
const createdAt = getCurrentDate();
const createdBy = "init";

async function createTestUser() {
    console.log(`Creating test data. ${users.length} User's will be created.`);
    for (let i = 0; i<users.length; i++) {
        const session = driver.session();
        const user = users[i];
        const userQuery = await session.run(
            'CREATE (a:User {id: $id, email: $email, password: $password, name: $name, token: ""}) RETURN a',
            {...user}
        );
        await console.log("Created user: " + userQuery.records[0].get(0));
        await session.close();
    }
}

async function createTestSongs(amount) {
    await console.log(`Creating test data. ${amount} Songs's will be created.`);
    for (let i = 0; i<amount; i++) {
        let session = await driver.session();
        const exampleName = exampleSongNames[Math.floor(Math.random()*(exampleSongNames.length))];
        const randomUser = exampleUsers[Math.floor(Math.random()*(exampleUsers.length))];
        const songId = uuidv1();
        const songQuery = await session.run(
            'CREATE (a:Song {id: $id, name: $name, createdBy: $createdBy, createdAt: $createdAt}) RETURN a',
            {
                id: songId,
                name: exampleName,
                createdAt: createdAt,
                createdBy: createdBy
            }
        );
        await console.log("Created Song: " + songQuery.records[0].get(0));
        await session.close();

        session = await driver.session();
        const relQuery = await session.run(
            'MATCH (u:User), (s:Song) \n' +
            'WHERE u.name = $user_name AND s.id = $song_id \n' +
            'CREATE (s)-[r:BELONGS]->(u)\n' +
            'RETURN u.name, type(r), s.id',
            {
                user_name: randomUser,
                song_id: songId
            }
        );
        console.log("Created Relationship between: " + relQuery.records[0].get(0));
        await session.close();
    }
}

(async function() {
    try {
        await createTestUser();
        await createTestSongs(amountOfSongs);
        console.log("INFO - Finished seeding database.");
        driver.close();
        process.exit(0)
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
})();












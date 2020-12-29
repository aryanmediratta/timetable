const { MongoClient } = require('mongodb');

const { uri, connectionParams } = require('../server/config');

async function saveDataInDatabase(dbName, collectionName, dataJson) {
    const client = new MongoClient(uri, connectionParams);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        await collection.insertOne(dataJson)
            .then(result => {
                console.log(result);
            })
            .catch(error => console.error(error))
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = {
  saveDataInDatabase,
};

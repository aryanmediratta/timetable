/*
Script to test DB Connection. Should ideally print the name of all the databases.
run
` node connection.js 'db_security_key' `
db_security_key: present in .env
in terminal to view result
*/

const { MongoClient } = require('mongodb');
const { connectionParams } = require('../server/config');

async function main(){
  const client = new MongoClient(process.argv[2], connectionParams);
  try {
    await client.connect();
    await listDatabases(client); 
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log('databases');
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);

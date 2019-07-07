const { Pool, Client } = require("pg");
const connectionString = "postgressql://postgres:postgres@localhost:5432/OR";

const client = new Client({
  connectionString: connectionString
});
client.connect();

module.exports = client;

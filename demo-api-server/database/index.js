const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:postgres@localhost:5432/OR'

// const client = new Client({
//   connectionString: connectionString
// })
const client = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'OR',
  password: 'postgres',
  port: 5432
})
client.connect()

module.exports = client

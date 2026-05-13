const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: 'root@123',
  host: 'localhost',
  port: 5432,
  database: 'vizhuthugal',
})

module.exports = pool
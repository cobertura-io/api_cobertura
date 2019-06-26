const sql = require('mysql')
require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env'
})

console.log(process.env.DB_USER)
var connection = () => (
  sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  })
)

module.exports = () => connection()

const mysqlClient = require('mysql');

const mysql = mysqlClient.createPool({
  host:'localhost',
  user:'root',
  password: '',
  database:'zappy'
})

module.exports = {
  mysql
}
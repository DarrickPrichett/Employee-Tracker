const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'omega',
    database: 'employeedb'
  },
  console.log('Using employeedb database')

);

module.exports = db;

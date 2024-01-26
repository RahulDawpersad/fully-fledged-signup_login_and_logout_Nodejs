const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'b3j3ueoaxfknmx0du16n-mysql.services.clever-cloud.com',
  user: 'ukvxj5gys9pcsfkj',
  password: 'ukvxj5gys9pcsfkj',
  database: 'b3j3ueoaxfknmx0du16n'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;

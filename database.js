const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "byi0vexuchxu9przocoh-mysql.services.clever-cloud.comt",
  user: "uwobtzryrgmrgxco",
  password: "a9DB90uAeqRGvnElEEYf",
  database: "byi0vexuchxu9przocoh",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();

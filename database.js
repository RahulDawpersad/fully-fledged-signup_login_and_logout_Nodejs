const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "b3j3ueoaxfknmx0du16n-mysql.services.clever-cloud.com",
  user: "ukvxj5gys9pcsfkj",
  password: "csj17lHJGWlS5FEktS3u",
  database: "b3j3ueoaxfknmx0du16n",
});

module.exports = {
  promise: db.promise().bind(db), // Export the promise wrapper for using async/await
};


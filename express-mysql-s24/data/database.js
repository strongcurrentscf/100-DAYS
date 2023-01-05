const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  database: "blog",
  user: "root",
  password: "Greenone?27!",
});

module.exports = pool;

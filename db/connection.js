const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      // your MySQL username,
      user: "root",
      // your password,
      password: "",
      database: "track-my-employees",
    },
    console.log("Connected to the employee database")
  );


  module.exports = db;
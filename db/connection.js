const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      // your MySQL username,
      user: "root",
      // your password,
      password: "",
      database: "employeeTracker",
    },
    console.log("Connected to the employeeTracker database")
  );


  module.exports = db;
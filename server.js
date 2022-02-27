const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');
const cTable = require('console.table');
const { json } = require("express");

// Arrays of questions for inquirer
const {
    startScreen,
} = require('./lib/arrayPrompts');

// helper functions for prompts
const {
    viewDepartments, viewRoles, 
    viewEmployees,addDepartments,
    addRole, addEmployee,
    updateEmployee, startTracking } = require('./utils/actions');


db.connect(err => {
    if (err) throw err;
    console.log('connected to employee database');
  });



startTracking();


// module.exports = app;

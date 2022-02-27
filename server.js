const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');
const cTable = require('console.table');
const { json } = require("express");

// Arrays of questions for inquirer
const {
    startQuestions,
} = require('./lib/arrayPrompts');

// helper functions for prompts
const {
    viewDepartments, viewRoles, 
    viewEmployees,addDepartments,
    addRole, addEmployee,
    updateEmployee, startMenu } = require('./utils/actions');


db.connect(err => {
    if (err) throw err;
    console.log('connected to employee database');
  });



  startMenu();


// module.exports = app;

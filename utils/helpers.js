// ** stuff for later 
// new inquirer.Separator()


const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const db = require('./db/connection')
// const cTable = require('console.table');

// --------------------------------Queries--------------------------------

// Go to start screen 
function startTracking() {
    inquirer.prompt(questions)
        .then(response => {
            return response;
        })
};


// view all departments
function viewDepartments() {

}

// view all roles
function viewRoles() {

}

// view all employees
function viewEmployees() {

}

// add a Department
function addDepartments() {

}

// add a Role
function addRole() {

}

// add an employee
function addEmployee() {

}

// update an employee role
function updateEmployee() {

}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartments,
    addRole,
    addEmployee,
    updateEmployee
}
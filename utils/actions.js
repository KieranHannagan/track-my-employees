const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('../db/connection')
const cTable = require('console.table');

// Arrays of questions for inquirer
const {
    startQuestions,
} = require('../lib/arrayPrompts');

// ** -------------------------------------------------- Queries -------------------------------------------------- ** //

// Go to start screen 
function startMenu() {
    inquirer.prompt(startQuestions)
        .then(response => {
            console.log(response.startQuestion);
            app(response.startQuestion);
        })
};

// view all departments
function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if (err) {
            throw (err);
        }
        console.log(
            `
=======================================================================
                            DEPARTMENTS
======================================================================= 
            `
        )
        console.table(results);
        console.log(
            `
=======================================================================
            `
        )
        startMenu();
    })
}

// view all roles
function viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, results) => {
        if (err) {
            throw (err);
        }
        console.log(
            `
=======================================================================
                            ROLES
======================================================================= 
            `
        )
        console.table(results);
        console.log(
            `
=======================================================================
            `
        )
        startMenu();
    })

}

// view all employees
function viewEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, results) => {
        if (err) {
            throw (err);
        }
        console.log(
            `
=======================================================================
                            EMPLOYEES
======================================================================= 
            `
        )
        console.table(results);
        console.log(
            `
=======================================================================
            `
        )
        startMenu();
    })

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


function app(switchValue) {
    switch (switchValue) {
        case 'startScreen':
            startMenu();
            break;
        case 'view all departments':
            viewDepartments()
            break;
        case 'view all roles':
            viewRoles();
            break;
        case 'view all employees':
            viewEmployees();
            break;
        case ('add a department'):
            addDepartments();
            break;
        case ('add a role'):
            addRole();
            break;
        case ('add an employee'):
            addEmployee();
            break;
        case ('update an employee role'):
            updateEmployee();
            break;
    }
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartments,
    addRole,
    addEmployee,
    updateEmployee,
    startMenu
}
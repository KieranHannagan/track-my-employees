const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('../db/connection')
const cTable = require('console.table');
const chalklet = require('chalklet');
//styling for chalklet
const { colorOptions, fontOptions, colorOptions2 } = require('./consoleStyle');


// Arrays of questions for inquirer
const {
    startQuestions,
    addDeptQuestion,
    bootUpQ,
    addRoleQuestions
} = require('../lib/arrayPrompts');

// ** -------------------------------------------------- Queries -------------------------------------------------- ** //

// Boot up screen 
function bootUp() {
    inquirer.prompt(bootUpQ).then(results => {
        if (results.bootUp) {
            startMenu();
        } else {
            return;
        }
    })
}

function quitApp() {
    console.log(chalklet.generate('Good', colorOptions, fontOptions));
    console.log(chalklet.generate('Bye', colorOptions2, fontOptions));
}
// Go to start screen 
function startMenu() {
    inquirer.prompt(startQuestions)
        .then(response => {
            app(response.startQuestion);
        })
};

// view all departments
function viewDepartments() {
    var sql = `SELECT * FROM department`;
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
    var sql = `SELECT * FROM role`;
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
    var sql = `SELECT * FROM employee`;
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
    inquirer.prompt(addDeptQuestion).then(response => {
        const newDepartment = response.addDepartment
        var sql = `INSERT INTO department (name) VALUES ("${newDepartment}");`;

        db.query(sql, (err, data) => {
            if (err) {
                throw (err);
            }
            viewDepartments();


        })

    })
}

// add a Role
function addRole() {
        inquirer.prompt(addRoleQuestions).then(response => {
            const newRole = response.addRole;
            const salary = response.salary;
            const depId = response.depId;
            var sql = `INSERT INTO role (title, salary, department_id) VALUES ("${newRole}", "${salary}", "${depId}");`;
            db.query(sql, (err, results) => {
                if (err) {
                    throw (err);
                }
                console.table(results);
                viewRoles();

            })
        })

}

// add an employee
function addEmployee() {
}

// update an employee role
function updateEmployee() {

}

//  the handler for main menu input;
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
        case 'add a department':
            addDepartments();
            break;
        case 'add a role':
            addRole();
            break;
        case 'add an employee':
            addEmployee();
            break;
        case 'update an employee role':
            updateEmployee();
            break;
        case 'quit':
            quitApp();
            break;

    }
}

module.exports = {
    bootUp,
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartments,
    addRole,
    addEmployee,
    updateEmployee,
    startMenu,
}
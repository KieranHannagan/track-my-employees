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
    addRoleQuestions,
    addEmployeeQuestions,
    updateEmployeeQuestionsFirst,
    updateEmployeeQuestionsSecond
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
    inquirer.prompt(addEmployeeQuestions).then(response => {
        const firstName = response.empFirst;
        const lastName = response.empLast;
        const roleId = response.roleId;
        var managerId = null;
        if (response.confirmManager) {
            managerId = response.managerId;
        }

        var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${roleId}", ${managerId});`;
        db.query(sql, (err, results) => {
            if (err) {
                throw (err);
            }
            console.table(results);
            viewEmployees();

        })
    })
}
function updateEmployee() {
    inquirer.prompt(updateEmployeeQuestionsSecond).then(response => {
        var sql = `UPDATE employee SET role_id = ? 
        WHERE id = ?`;

        var params = [response.newRoleId, response.chooseEmpId]
        db.query(sql, params, (err, results) => {
            if (err) {
                throw (err);
            }
            console.table(results);
            viewEmployees();
        })

    })

}
// see an employee list for reference
function confirmSeeEmp() {
    inquirer.prompt(updateEmployeeQuestionsFirst).then(response => {
        if (response.confirmSeeList) {
            const sql = `SELECT * FROM employee`;

            db.query(sql, (err, results) => {
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
                console.log('What is the ID of the employee you would like to update?')
            })
            updateEmployee();
        } else updateEmployee();
    })

}

// If user wants to quit
function quitApp() {
    console.log(chalklet.generate('Good', colorOptions, fontOptions));
    console.log(chalklet.generate('Bye', colorOptions2, fontOptions));
}


//  the handler for main menu input;
function app(switchValue) {
    switch (switchValue) {
        case 'startScreen':
            startMenu();
            break;
        case 'View all departments':
            viewDepartments()
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add a department':
            addDepartments();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update an employee role':
            confirmSeeEmp();
            break;
        case 'Quit':
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
    confirmSeeEmp,
    startMenu,
}
const inquirer = require('inquirer');
const db = require('../db/connection')
const cTable = require('console.table');
const chalklet = require('chalklet');
// styling for chalklet
const { colorOptions, fontOptions, colorOptions2 } = require('../lib/consoleStyle');

// arrays of questions for inquirer
const {
    addEmployeeQuestions,
    startQuestions,
    addDeptQuestion,
    bootUpQ,
    addRoleQuestions,
    confirmSeeEmpQ,
    updateEmployeeQuestions,
    confirmSeeDepQ,
    confirmSeeRolesQ
} = require('../lib/arrayPrompts');

// boot up screen 
function bootUp() {
    inquirer.prompt(bootUpQ).then(results => {
        if (results.bootUp) {
            startMenu();
        } else {
            return;
        }
    })
}

// go to start screen 
function startMenu() {
    inquirer.prompt(startQuestions)
        .then(response => {
            app(response.startQuestion);
        })
};

// the handler for main menu input;
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
            confirmSeeDep();
            break;
        case 'Add a role':
            confirmSeeRoles();
            break;
        case 'Add an employee':
            confirmSeeEmp(switchValue);
            break;
        case 'Update an employee role':
            confirmSeeEmp(switchValue);
            break;
        case 'Quit':
            quitApp();
            break;
    }
}

// ** -------------------------------------------------- Queries -------------------------------------------------- ** //

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

// update Employee
function updateEmployee() {
    inquirer.prompt(updateEmployeeQuestions).then(response => {
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
function confirmSeeEmp(switchValue) {
    inquirer.prompt(confirmSeeEmpQ).then(response => {
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
            })
            addOrUpdate(switchValue);
        } else addOrUpdate(switchValue);
    })
}

// see if they were updating an employee or adding one
function addOrUpdate(switchValue) {
    if (switchValue == 'Add an employee') {
        console.log('What is the first name of the Employee?');
        addEmployee();
    }
    if (switchValue == 'Update an employee role') {
        console.log('What is the ID of the employee you would like to update?')
        updateEmployee();
    }
}

// if they wanted reference for departments
function confirmSeeDep() {
    inquirer.prompt(confirmSeeDepQ).then(response => {
        if (response.confirmSeeList) {
            const sql = `SELECT * FROM department`;

            db.query(sql, (err, results) => {
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
                console.log('What is the name of the department?')
            })
            addDepartments();
        } else addDepartments();
    })
}

// if they wanted reference for roles
function confirmSeeRoles() {
    inquirer.prompt(confirmSeeRolesQ).then(response => {
        if (response.confirmSeeList) {
            const sql = `SELECT * FROM role`;

            db.query(sql, (err, results) => {
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
                console.log('What is the name of the role?')
            })
            addRole();
        } else addRole();
    })
}

// If user wants to quit
function quitApp() {
    console.log(chalklet.generate('Good', colorOptions, fontOptions));
    console.log(chalklet.generate('Bye', colorOptions2, fontOptions));
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
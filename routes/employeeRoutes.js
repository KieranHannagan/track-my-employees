const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('../db/connection')
const cTable = require('console.table');
const chalklet = require('chalklet');

// Arrays of questions for inquirer
const { addEmployeeQuestions, updateEmployeeQuestions, confirmSeeEmpQ } = require('../lib/arrayPrompts');

const { startMenu } = require('../utils/index');


// ** -------------------------------------------------- Queries -------------------------------------------------- ** //

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



module.exports = {
    viewEmployees,
    addEmployee,
    updateEmployee,
    confirmSeeEmp
}
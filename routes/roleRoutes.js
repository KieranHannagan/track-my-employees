const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('../db/connection')
const cTable = require('console.table');
const chalklet = require('chalklet');

// Arrays of questions for inquirer
const { addRoleQuestions, confirmSeeRolesQ } = require('../lib/arrayPrompts');

const { startMenu } = require('../utils/index');

// ** -------------------------------------------------- Queries -------------------------------------------------- ** //

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


module.exports = {
    viewRoles,
    addRole,
    confirmSeeRoles
}
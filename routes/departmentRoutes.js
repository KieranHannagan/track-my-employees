const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('../db/connection')
const cTable = require('console.table');
const chalklet = require('chalklet');

// Arrays of questions for inquirer
const { addDeptQuestion, confirmSeeDepQ } = require('../lib/arrayPrompts');

const { startMenu } = require('../utils/index');

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

module.exports = {
    viewDepartments,
    addDepartments,
    confirmSeeDep
}
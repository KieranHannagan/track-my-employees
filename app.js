const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const db = require('./db/connection')
// const cTable = require('console.table');
// Arrays of questions for inquirer
const {
    startScreen,
} = require('./lib/arrayPrompts');
// helper functions to handle
const {
    viewDepartments, viewRoles, 
    viewEmployees,addDepartments,
    addRole, addEmployee,
    updateEmployee } = require('./utils/helpers')


function app(switchValue) {
    switch (switchValue) {
        case ('start-screen'):
            startTracking();
            break;
        case ('view-departments'):
            viewDepartments();
            break;
        case ('view-roles'):
            viewRoles();
            break;
        case ('view-employees'):
            viewEmployees();
            break;
        case ('add-department'):
            addDepartments();
            break;
        case ('add-role'):
            addRole();
            break;
        case ('view-departments'):
            addEmployee();
            break;
        case ('view-departments'):
            updateEmployee();
            break;


    }
}


startTracking();
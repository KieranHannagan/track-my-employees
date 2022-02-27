const inquirer = require('inquirer');


var     startQuestions
= [
    {
        // Start Screen input
        type: 'list',
        message: 'What would you like to do?',
        name: 'startQuestion',
        choices: [
            'view all departments',
            'view all employees',
            'view all roles',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role'
        ]
    }
];

module.exports = {
    startQuestions,

}
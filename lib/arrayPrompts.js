const inquirer = require('inquirer');


var startScreen = [
    {
        // Title input
        type: 'checkbox',
        message: 'What would you like to do?',
        name: 'start-screen',
        choices: ['view all departments', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role',]

    }
];

module.exports = {
    startScreen,
    
}
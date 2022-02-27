const inquirer = require('inquirer');


var startScreen = [
    {
        // Start Screen input
        type: 'list',
        message: 'What would you like to do?',
        name: 'startScreen',
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
    startScreen,

}
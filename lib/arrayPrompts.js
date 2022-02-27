

var bootUpQ = [
    {
        type: 'confirm',
        message: 'Would you like to begin?',
        name: 'bootUp',
        default: true
    }
];


var startQuestions
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
                'update an employee role',
                'quit'
            ],
            loop: false
        }
    ];

var addDeptQuestion
    = [
        {
            // Start Screen input
            type: 'input',
            message: 'What is the name of the department?',
            name: 'addDepartment',
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter a department name";
                }
            }
        }
    ];

var addRoleQuestions
    = [
        {
            // Start Screen input
            type: 'input',
            message: 'What is the name of the role?',
            name: 'addRole',
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter a role";
                }
            }
        },
        {
            // Start Screen input
            type: 'input',
            message: 'What is the salary?',
            name: 'salary',
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter a salary";
                }
            }
        },
        {
            // Start Screen input
            type: 'input',
            message: 'Enter department ID',
            name: 'depId',
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter a salary";
                }
            }

        },
    ];

module.exports = {
    startQuestions,
    addDeptQuestion,
    bootUpQ,
    addRoleQuestions
}
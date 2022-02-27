// boot up screen
var bootUpQ = [
    {
        type: 'confirm',
        message: 'Would you like to begin?',
        name: 'bootUp',
        default: true
    }
];

// main menu
var startQuestions
    = [
        {
            // Start Screen input
            type: 'list',
            message: 'What would you like to do?',
            name: 'startQuestion',
            choices: [
                'View all departments',
                'View all employees',
                'View all roles',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit'
            ],
            loop: false
        }
    ];

// add department
var addDeptQuestion
    = [
        {
            // department
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

// add role questions
var addRoleQuestions
    = [
        {
            // role
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
            // salary
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
            // department ID
            type: 'input',
            message: 'Enter department ID',
            name: 'depId',
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter an ID";
                }
            }

        },
    ];

// add employee qs
var addEmployeeQuestions
    = [
        {
            // first name
            type: 'input',
            message: 'What is the first name of the Employee?',
            name: 'empFirst',
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter a first name";
                }
            }
        },
        {
            // last name
            type: 'input',
            message: 'What is the last name of the Employee?',
            name: 'empLast',
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter a last name";
                }
            }
        },
        {
            // role ID?
            type: 'input',
            message: 'What is their role ID?',
            name: 'roleId',
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter a valid role ID";
                }
            }
        },
        {
            // Do they have manager?
            type: 'confirm',
            message: 'Do they have a manager?',
            name: 'confirmManager',
            default: false
        },
        {
            // manager ID
            type: 'input',
            message: 'Please provide the manager ID',
            name: 'managerId',
            when: ({ confirmManager }) => confirmManager,
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter the test instructions:";
                }
            }
        }
    ];

// see if they want a reference
var updateEmployeeQuestionsFirst
    = [
        {
            // Do want to see the current list of employees?
            type: 'confirm',
            message: 'Do want to see the current list of employees for reference?',
            name: 'confirmSeeList',
            default: false
        },
    ];

// update employee
var updateEmployeeQuestionsSecond
    = [
        {
            // Choose employee
            type: 'input',
            message: 'What is the ID of the employee you would like to update?',
            name: 'chooseEmpId',
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter an employee ID";
                }
            }
        },
        {
            // new role ID
            type: 'input',
            message: 'Enter a new role ID',
            name: 'newRoleId',
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "Please enter a role ID";
                }
            }

        },
    ];

module.exports = {
    addEmployeeQuestions,
    startQuestions,
    addDeptQuestion,
    bootUpQ,
    addRoleQuestions,
    updateEmployeeQuestionsFirst,
    updateEmployeeQuestionsSecond
}






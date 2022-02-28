

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

module.exports = { addOrUpdate }
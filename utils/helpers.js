const db = require("../db/connection");

function managerHandler() {

}


function employeeListHandler() {
    const sql = `SELECT * FROM employee`;
    var empList = [];

    db.query(sql, (err, results) => {

        for (let i = 0; i < results.length; i++) {

            var empObj = {
                name: results[i].first_name + " " + results[i].last,
                role: results[i].role_id,
                manager: results[i].manager_id
            }
            empList.push(empObj)
        }
    })
    console.log(empList);
    return empList;
}

module.exports = { employeeListHandler, }
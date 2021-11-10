// db query for employees
const db = require('../db/connection');
const consoleTable = require('console.table');

// Collect all Employees
class Employee {
    constructor() {

    }

    async allEmployees() {
        const sql = `SELECT * FROM employee JOIN role on employee.role_Id = role_Id; SELECT`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            };
            let complete = (rows.flat());
            console.table('Employees', complete);
        });
    };
    async addEmployee(employee) {
        const sql = `INSERT INTO employee (name)
                    VALUES (?)`;
        const params = employee.name;
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.log(`${rows.affectedRows} employee added`)
        });
    }
}

module.exports = new Employee()

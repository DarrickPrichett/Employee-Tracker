// db query for departments
const db = require('../db/connection');
const consoleTable = require('console.table');

// collect all departments
class Department {
    constructor() {
        
    }

    async allDepartments() {
        const sql = `SELECT * FROM department`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table('Departments', rows)
            this.startMenuPrompt()
        })
    };

    async addDepartment(department) {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;
        const params = department.name;
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.log(`${rows.affectedRows} department added`)
            this.startMenuPrompt()
        });
    }
}
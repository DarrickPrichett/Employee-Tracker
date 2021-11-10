// db query for departments
const db = require('../db/connection');
const consoleTable = require('console.table');

// collect all departments
class Manager {
    constructor() {

    }

    async allManagers() {
        const sql = `SELECT * FROM manager`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table('Managers', rows)
            return true;
        })
    };

    async addManager(manager) {
        const sql = `INSERT INTO manager (name)
                    VALUES (?)`;
        const params = manager.name;
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.log(`${rows.affectedRows} manager added`)
        });
    }
}
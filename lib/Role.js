// db query for roles
const db = require('../db/connection');
const consoleTable = require('console.table');

// collect all roles
class Role {
    constructor() {

    }

    async allRoles() {
        const sql = `SELECT * FROM role`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table('Roles', rows)
            return true;
        })
    };

    async addRole(role) {
        const sql = `INSERT INTO role (name)
                    VALUES (?)`;
        const params = role.name;
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.log(`${rows.affectedRows} role added`)
        });
    }
}
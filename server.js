const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');
const consoleTable = require('console.table');
// const express = require('express');

const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const { appendFile } = require('fs');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const newRolePrompt = () => {
    let roles = db.query(`SELECT * FROM role`)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the Role',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('Please enter a title')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the new employee',
            validate: salaryAmount => {
                if (salaryAmount) {
                    return true;
                } else {
                    console.log('Enter a salary amount')
                }
            }

        },
        {
            type: 'list',
            name: 'department_id',
            message: 'In what department will the new role be added?',
            choices: [{ name: 'Marketing', value: 1 }, { name: 'Product', value: 2 }, { name: 'Customer Experience', value: 3 }, { name: 'Human Resources', value: 1 }, { name: 'Finance', value: 4 }, { name: 'Sales', value: 5 }, { name: 'Technology', value: 6 }],
            validate: addToDepartment => {
                if (addToDepartment) {
                    return true;
                } else {
                    console.log('What department will the new role be added?')
                }
            }
        }
    ]).then(answer => {
        const sql = `INSERT INTO role set ?`;
        db.query(sql, answer, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.log(`${rows.affectedRows} role added`)
            startMenuPrompt();
        });
    }).catch(err => console.log(err))
}

const newDepartmentPrompt = () => {
    let departments = db.query(`SELECT * FROM department`)
    return inquirer.prompt(
        {
            type: 'input',
            name: 'departmentName',
            message: 'What department (name) would you like to add?',
            validate: newDepartmentName => {
                if (newDepartmentName) {
                    return true;
                } else {
                    console.log('Enter a department name');
                    return false;
                }
            }
        }
    ).then(answer => {
        const sql = `INSERT INTO department set ?`;
        db.query(sql, answer, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.log(`${rows.affectedRows} department added`)
            startMenuPrompt()
        });
    }).catch(err => console.log(err))
}

// New employee prompt
const newEmployee = async () => {
    let [managers] = await db.promise().query(`SELECT CONCAT(first_name, " ", last_name), id AS value FROM employee`)
    let [roles] = await db.promise().query(`SELECT title AS name, id AS value FROM role`)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the new employee',
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('Please enter the first name of the new employee')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the new employee',
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log('Please enter the last name of the new employee')
                }
            }

        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the Role',
            choices: roles
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the manager for this employee?',
            choices: managers
        }
    ]).then(answer => {
        const sql = `INSERT INTO employee set ?`;
        db.query(sql, answer, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.log(`${rows.affectedRows} employee added`)
            startMenuPrompt();
        });
    }).catch(err => console.log(err))
}

const updateEmployeeRole = async () => {
    let [employees] = await db.promise().query(`SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee`)
    let [roles] = await db.promise().query(`SELECT title AS name, id AS value FROM role`)
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Who is the employee to be updated?',
            choices: employees
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the Role',
            choices: roles
        }
        
    ]).then(answer => {
        const sql = `UPDATE employee set role_id = ? WHERE id = ?`;
        db.query(sql, [answer.role_id, answer.employee_id], (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.log(`${rows.affectedRows} employee updated`)
            startMenuPrompt();
        });
    }).catch(err => console.log(err))
}

// query db to view all Departments
const allDepartments = () => {
    db.query('select * from department', (err, res) => {
        if (err) throw err
        console.table(res);
        startMenuPrompt();
    });

}

// query db to view all Roles
const allRoles = () => {
    let allRls = db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err
        console.table(res);
        startMenuPrompt();
    });
}



// query db to view all Employees
const allEmployees = () => {
    let allEmp = db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err
        console.table(res);
        startMenuPrompt();
    })
}


// Main Menu prompt
const startMenuPrompt = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Main Menu: Choose from the following options',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        }
    ).then(reply => {
        switch (reply.mainMenu) {
            // Display all departments
            case 'View All Departments':
                allDepartments();
                break;
            // Display  all roles
            case 'View All Roles':
                allRoles();
                break;
            // Display  all employees
            case 'View All Employees':
                allEmployees();
                break;
            // Add a New Department
            case 'Add a Department':
                newDepartmentPrompt();
                break;
            // Add a New Role
            case 'Add a Role':
                newRolePrompt();
                break;
            // Add a New Employee
            case 'Add an Employee':
                newEmployee();
                break;
            // Update an Employee Role
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            // Break Loop
            default:
                quit();
        }
    })
}

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

startMenuPrompt();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const exp = require('constants');

const PORT = process.env.PORT || 3001;

const newRolePrompt = () => {
    let roles = db.query(`SELECT * FROM `)
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
            choices: ['Marketing', 'Product', 'Customer Experience', 'Human Resources', 'Finance', 'Sales', 'Technology'],
            validate: addToDepartment => {
                if (addToDepartment) {
                    return true;
                } else {
                    console.log('What department will the new role be added?')
                }
            }
        }
    ]).then(answer => {
        Role.addRole(answer);
        startMenuPrompt();
    }).catch(err => console.log(err))
}

const newDepartmentPrompt = () => {
    return inquirer.prompt(
        {
            type: 'input',
            name: 'name',
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
        Department.addDepartment(answer);
        startMenuPrompt();
    }).catch(err => console.log(err))
}

// New employee prompt
const newEmployeePrompt = () => {
    let employees = db.query(`SELECT * FROM `)
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
            name: 'department_id',
            message: 'In what department will the new employee be added?',
            choices: []
        }
    ])
}

// query db to view all Departments
const allDepartments = () => {
    const allDpt = db.query('SELECT department.name AS Department', (err, res) => {
        if (err) throw err
        console.table(allDpt);
    });

}

// query db to view all Roles
const allRoles = () => {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err
        res.json({
            message: 'success',
            data: rows
        });
    });
}



// query db to view all Employees
const allEmployees = () => {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err
        res.json({
            message: 'success',
            data: rows
        });
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


startMenuPrompt();
const express = require('express');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Password1',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

const mainMenu = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "menu",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit"
    ]
  }
]

const addDepartment = [
  {
    type: "input",
    message: "What is the name of the department to add?",
    name: "newDepartName"
  }
]

const addRole = [
  {
    type: "input",
    message: "What is the name of the role to add?",
    name: "newRoleName"
  },
  {
    type: "input",
    message: "What is the salary of the new role?",
    name: "newRoleSalary"
  },
  {
    type: "list",
    message: "What department is this role in?",
    name: "newRoleDepart",
    choices: // add current list of departments here somehow
  }
]
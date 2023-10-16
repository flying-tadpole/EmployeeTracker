const inquirer = require('inquirer');
const mysql = require('mysql2');

const { seeDepartments, seeEmployees, seeRoles, sqlAddDepart, sqlAddEmployee, sqlAddRole, sqlBudget, sqlUpdateManager, departList } = require('./lib/queries');

const { mainMenu, addDepartment, addRole, addEmployee, updateEmployee } = require('./lib/userChoices')

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

const viewDepartmentsFunc = () => {
  console.log('viewing departments')
  db.query(seeDepartments, (err, results) => {
    if (err) {
      console.log('Sorry, unable to view the departments')
    } else {
      console.table(results)
    }
    init()
  })
}

const viewRolesFunc = () => {
  console.log('viewing roles')
  db.query(seeRoles, (err, results) => {
    if (err) {
      console.log('Sorry, unable to view roles')
    } else {
      console.table(results)
    }
    init()
  })
}

const viewEmp = () => {
  console.log('viewing employees')
  db.query(seeEmployees, (err, results) => {
    if (err) {
      console.log('Sorry, unable to view employees')
    } else {
      console.table(results)
    }
    init()
  })
}

const addDepartmentFunc = () => {
  console.log('adding department')
  inquirer
    .prompt(addDepartment)
    .then((response) => {
      const params = response.newDepartName
      db.query(sqlAddDepart, params, (err, results) => {
        if (err) {
          console.log('Sorry, unable to add department')
        }
        init()
      })
    })
}

const addRoleFunc = () => {
  console.log('adding role')
  inquirer
    .prompt(addRole)
    .then((response) => {
      const params = [
        response.newRoleName,
        response.newRoleSalary,
        response.newRoleDepart
      ]
      db.query(sqlAddRole, params, (err, results) => {
        if (err) {
          console.log('Sorry, unable to add role')
        } else {
          console.log('Role added')
        }
        init()
      })
    })
}

const addEmp = () => {
  console.log('adding employee')
}

const updateEmp = () => {
  console.log('updating employee')
}

function init() {
  inquirer
  .prompt(mainMenu)
  .then ((response) => {
    console.log('response: ', response)
    switch (response.menu) {
      case "View all departments":
        viewDepartmentsFunc()
        break;
      case "View all roles":
        viewRolesFunc()
        break;
      case "View all employees":
        viewEmp()
        break;
      case "Add a department":
        addDepartmentFunc()
        break;
      case "Add a role":
        addRoleFunc()
        break;
      case "Add an employee":
        addEmp()
        break;
      case "Update an employee role":
        updateEmp()
        break;
      case "Quit":
        console.log('Have a great day!')
        db.end();
    }
  })
}

init()
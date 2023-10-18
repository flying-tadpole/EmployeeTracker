// imports libraries used
const inquirer = require('inquirer');
const mysql = require('mysql2');

// imports all SQL queries
const { seeDepartments, seeEmployees, seeRoles, sqlAddDepart, sqlAddEmployee, sqlAddRole, sqlBudget, sqlUpdateManager, departList } = require('./lib/queries');

// imports main inquirer question sets
const { mainMenu } = require('./lib/userChoices')

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

//view all departments
const viewDepartmentsFunc = () => {
  db.query(seeDepartments, (err, results) => {
    if (err) {
      console.log('Sorry, unable to view the departments')
    } else {
      console.table(results)
    }
    init()
  })
}

// view all roles
const viewRolesFunc = () => {
  db.query(seeRoles, (err, results) => {
    if (err) {
      console.log('Sorry, unable to view roles')
    } else {
      console.table(results)
    }
    init()
  })
}

// view all employees
const viewEmp = () => {
  db.query(seeEmployees, (err, results) => {
    if (err) {
      console.log('Sorry, unable to view employees')
    } else {
      console.table(results)
    }
    init()
  })
}

// add new department
const addDepartmentFunc = () => {
  inquirer
    .prompt(
      [
        {
          type: "input",
          message: "What is the name of the department to add?",
          name: "newDepartName"
        }
    ]
    )
    .then((response) => {
      const params = response.newDepartName
      db.query(sqlAddDepart, params, (err, results) => {
        if (err) {
          console.log('Sorry, unable to add department')
        } else {
          console.log('Added successfully')
        }
        init()
      })
    })
}

// see if viewDepartFunc comes back as array and try to pass it in 
// change items from userChoices to objects?
const addRoleFunc = () => {
  inquirer
    .prompt(
      [
        {
          type: "input",
          message: "What is the name of the role to add?",
          name: "newRoleName"
        },
        {
          type: "input",
          message: "What is the salary of the new role?",
          name: "newRoleSalary"
        }
      ]
    )
    .then((response) => {
      const savedAnswer = [response.newRoleName, response.newRoleSalary]
      db.query(departList, (err, results) => {
        if (err) {
          console.log("error in generating department list")
        } else {
          const departments = results.map(({id, department_name}) => ({name: department_name, value: id}))
          .prompt(
            [
              {
                type: "list",
                message: "What department is this role in?",
                name: "newRoleDepart",
                choices: departments
              }
            ]
          )
        }
      })
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

// add new employee
const addEmp = () => {
  console.log('adding employee')
}

// update employee record
const updateEmp = () => {
  console.log('updating employee')
}

// view utilized budget
const viewBudget = () => {
  db.query(sqlBudget, (err, results) => {
    if (err) {
      console.log('Sorry, unable to view budget')
    } else {
      console.table(results)
    }
    init()
  })
}

// begins program and acts as main menu
function init() {
  inquirer
  .prompt(mainMenu)
  .then ((response) => {
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
      case "View budget":
        viewBudget()
        break;
      case "Quit":
        console.log('Have a great day!')
        db.end();
    }
  })
}

// calls function to begin program
init()
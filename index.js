// imports libraries used
const inquirer = require('inquirer');
const mysql = require('mysql2');

// imports all SQL queries
const { seeDepartments, seeEmployees, seeRoles, sqlAddDepart, sqlAddEmployee, sqlAddRole, sqlBudget, departList, empList, roleList, sqlUpdateEmployee } = require('./lib/queries');

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

// add a new role
const addRoleFunc = () => {
  db.query(departList, (err, results) => {
    if (err) {
      console.log("error in generating department list")
    } else {
      departments = results.map(({id, department_name}) => ({name: department_name, value: id}))
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
        },
        {
          type: "list",
          message: "What department is this role in?",
          name: "newRoleDepart",
          choices: departments
        }
    ]
    )
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
  })
}

// add new employee
const addEmp = () => {
  db.query(empList, (err, results) => {
    if (err) {
      console.log("error in generating manager list")
    } else {
      managers = results.map(({id, Employee}) => ({name: Employee, value: id}))
      db.query(roleList, (err, results) => {
        if (err) {
          console.log('error in generating roles list')
        } else {
          roles = results.map(({id, job_title}) => ({name: job_title, value: id}))
          inquirer
          .prompt(
            [
              {
                type: "input",
                message: "What is the employee's first name?",
                name: "newEmpFirstName"
              },
              {
                type: "input",
                message: "What is the employee's last name?",
                name: "newEmpLastName"
              },
              {
                type: "list",
                message: "What is the employee's role?",
                name: "newEmpRole",
                choices: roles
              },
              {
                type: "list",
                message: "Who is the employee's manager?",
                name: "newEmpManager",
                choices: managers
              }
          ]
          )
          .then((response) => {
            const params = [
              response.newEmpFirstName,
              response.newEmpLastName,
              response.newEmpRole,
              response.newEmpManager
            ]
            db.query(sqlAddEmployee, params, (err, results) => {
              if (err) {
                console.log('could not update employee role')
              } else {
                console.log('role updated')
              }
              init()
            })
          })
        }
      })
    }
  })
}

// update employee record
const updateEmp = () => {
  db.query(empList, (err, results) => {
    if (err) {
      console.log("error in generating employee list")
    } else {
      employees = results.map(({id, Employee}) => ({name: Employee, value: id}))
      db.query(roleList, (err, results) => {
        if (err) {
          console.log('error in generating roles list')
        } else {
          roles = results.map(({id, job_title}) => ({name: job_title, value: id}))
          inquirer
          .prompt(
            [
              {
                type: "list",
                message: "Which employee would you like to update the role of?",
                name: "empChoice",
                choices: employees
              },
              {
                type: "list",
                message: "What is their new role?",
                name: "updatedEmpRole",
                choices: roles
              }
          ]
          )
          .then((response) => {
            const params = [
              response.updatedEmpRole,
              response.empChoice
            ]
            db.query(sqlUpdateEmployee, params, (err, results) => {
              if (err) {
                console.log('could not update employee role')
              } else {
                console.log('role updated')
              }
              init()
            })
          })
        }
      })
    }
  })
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
  .prompt(
    [
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
          "View budget",
          "Quit"
        ]
      }
  ]
  )
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
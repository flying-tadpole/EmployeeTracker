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
      choices: []// add current list of departments here somehow
    }
]

const addEmployee = [
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
      choices: []// add current list of roles here somehow
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "newEmpManager",
      choices: []// add current list of employees here somehow
    }
]

const updateEmployee = [
    {
      type: "list",
      message: "Which employee would you like to update the role of?",
      name: "empChoice",
      choices: [] //add list of current employees here somehow
    },
    {
      type: "list",
      message: "What is their new role?",
      name: "updatedEmpRole",
      choices: [] //add list of current roles here somehow
    }
]

module.exports = { mainMenu, addDepartment, addRole, addEmployee, updateEmployee }
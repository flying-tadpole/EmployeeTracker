// selects all departments
const seeDepartments = 'SELECT * FROM departments;'

// selects all roles and add department names based on id
const seeRoles = 'SELECT roles.id, roles.job_title, roles.salary, departments.department_name FROM roles LEFT JOIN departments ON roles.department_id = departments.id;'

// selects all employees, adds role and department names based on id
const seeEmployees = 'SELECT employees.emp_id, employees.first_name, employees.last_name, roles.job_title, employees.manager_id FROM employees LEFT JOIN roles ON employees.role_id = roles.id;'

// adds department
const sqlAddDepart = 'INSERT INTO departments (department_name) VALUES (?);'

// adds role
const sqlAddRole = 'INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?);'

// adds employee
const sqlAddEmployee = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);' 

// updates employee record
const sqlUpdateEmployee = 'UPDATE employees SET role_id = ? WHERE emp_id = ?'

// view budget
const sqlBudget = 'SELECT departments.department_name, SUM(roles.salary) AS utilized_budget FROM roles LEFT JOIN departments ON roles.department_id = departments.id GROUP BY departments.department_name ORDER BY utilized_budget DESC;'

// shows list of departments
const departList = 'SELECT * FROM departments;'

// shows list of employees
const empList = 'SELECT CONCAT(first_name, " ", last_name) AS Employee, emp_id AS id FROM employees;'

// shows list of roles
const roleList = 'SELECT * FROM roles;'

module.exports = { seeDepartments, seeEmployees, seeRoles, sqlAddDepart, sqlAddEmployee, sqlAddRole, sqlBudget, departList, empList, roleList, sqlUpdateEmployee }
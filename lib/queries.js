
const seeDepartments = 'SELECT * FROM departments;'
    
const seeRoles = 'SELECT roles.id, roles.job_title, roles.salary, departments.department_name FROM roles LEFT JOIN departments ON roles.department_id = departments.id;'

const seeEmployees = 'SELECT employees.emp_id, employees.first_name, employees.last_name, roles.job_title, employees.manager_id FROM employees LEFT JOIN roles ON employees.role_id = roles.id;'

const sqlAddDepart = 'INSERT INTO departments (department_name) VALUES (?);'
   
const sqlAddRole = 'INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?);'

const sqlAddEmployee = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?);' 
    
const sqlBudget = 'SELECT departments.department_name, SUM(roles.salary) AS utilized_budget FROM roles LEFT JOIN departments ON roles.department_id = departments.id GROUP BY departments.department_name ORDER BY utilized_budget DESC;'

const sqlUpdateManager = 'UPDATE employees SET manager_id = ? WHERE emp_id = ?;'

const departList = 'SELECT * FROM departments;'
    


module.exports = { seeDepartments, seeEmployees, seeRoles, sqlAddDepart, sqlAddEmployee, sqlAddRole, sqlBudget, sqlUpdateManager, departList }
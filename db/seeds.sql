INSERT INTO departments (department_name)
VALUES ("Veterinary"),
        ("Husbandry"),
        ("Training"),
        ("PRC"),
        ("IACUC");

INSERT INTO roles (job_title, salary, department_id)
VALUES ("AHT", 50000, 1),
        ("ACT", 30000, 2),
        ("Veterinarian", 100000, 1),
        ("Supervisor", 55000, 2),
        ("Manager", 70000, 2),
        ("Trainer", 40000, 3),
        ("Compliance Tech", 60000, 5),
        ("PRC Specialist", 50000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 2, 2),
        ("Sally", "Sue", 5, NULL),
        ("Evan", "Jones", 3, NULL),
        ("Duncan", "Munz", 1, 3),
        ("Miles", "Hubbard", 1, 3);
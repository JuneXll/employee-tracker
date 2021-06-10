USE employee_trackerDB;

INSERT INTO employee (FIRST_NAME,LAST_NAME,MANAGER_ID,ROLE_ID) VALUES 
("June", "Hernandez",123,1),
("Jany", "Rodriguez",345,2),
("Ariel", "Sakowitz",567,3),
("Deanna","Rams",789,4),
("Emily","Perez",901,5);

INSERT INTO department (NAME) VALUES
("Finance"),
("Legal"),
("Sales"),
("Human Resources"),
("Information Technology");

INSERT INTO role (TITLE,SALARY,DEPARTMENT_ID) VALUES
("Accountant",80000,1),
("Paralegal",75000,2),
("Sales Representative",60000,3),
("Manager",65000,4),
("Web Developer",90000,5);

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;
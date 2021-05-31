USE employee_trackerDB;

INSERT INTO employee (FIRST_NAME,LAST_NAME,MANAGER_ID,ROLE_ID) VALUES 
("June", "Hernandez",1,123),
("Jany", "Rodriguez",2,345),
("Ariel", "Sakowitz",3,567),
("Deanna","Rams",4,678),
("Emily","Perez",5,890);

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
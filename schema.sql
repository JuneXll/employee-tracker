-- CREATE DATABASE
DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- DEPARTMENT TABLES
CREATE TABLE department(
    ID INT NOT NULL AUTO_INCREMENT,
    NAME VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    ID INT NOT NULL AUTO_INCREMENT,
    TITLE VARCHAR(30),
    SALARY DECIMAL,
    DEPARTMENT_ID INT,
    FOREIGN KEY (DEPARTMENT_ID) REFERENCES department(ID),
    PRIMARY KEY (ID)
);

-- TABLE FOR EMPLOYEE ROLES
CREATE TABLE employee (
    ID INT NOT NULL AUTO_INCREMENT,
    FIRST_NAME VARCHAR(30) NOT NULL,
    LAST_NAME VARCHAR(30) NOT NULL,
    MANAGER_ID INT,
    ROLE_ID INT,
    FOREIGN KEY (ROLE_ID) REFERENCES role(ID),
    FOREIGN KEY (MANAGER_ID) REFERENCES employee(ID),
    PRIMARY KEY (ID)
);



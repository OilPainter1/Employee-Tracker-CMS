DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    /*Foreign Key*/
    roll_id INT,
    manager_id INT,
    PRIMARY KEY (id)
    FOREIGN KEY (roll_id) REFERENCES role(id)
    
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY id,
    FOREIGN KEY (department_id) REFERENCES department(id)
    
);

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY id

);
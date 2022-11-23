DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
     
);

CREATE TABLE role_table(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
   

    
    
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT ,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    /*Foreign Key*/
    role_id INT,
    manager_id VARCHAR(30),
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role_table(id)
);









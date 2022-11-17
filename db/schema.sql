DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    /*Foreign Key*/
    roll_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
);
require('dotenv').config()

const mysql2 = require("mysql2")
//const inquirer = require("inquirer")

const connection = mysql2.createConnection({
    host: 'localhost',
    user: process.env.db_username,
    database: process.env.db_name
  })

const query1 = connection.promise().query(`insert into department values (?,?)`,[1,"HR"]).then(console.log("done"))
 
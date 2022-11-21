import dotenv from "dotenv"
dotenv.config()
import inquirer from 'inquirer'
import mysql2 from "mysql2"

//const inquirer = require("inquirer")

const connection = mysql2.createConnection({
    host: 'localhost',
    user: process.env.db_username,
    database: process.env.db_name
  })

   async function getDepartments () { 
    const toReturn =  await connection.promise().query("SELECT * FROM department")
    console.table(toReturn[0])
    return
}

async function getRoles() {
    const roles = await connection.promise().query("SELECT * FROM role_table")
    console.table(roles[0])
    return
}

async function getEmployees() {
    const employees = await connection.promise().query("SELECT * FROM employees")
    console.table(employees[0])
    return
}

//const currentDB = connection.promise().query("DROP DATABASE IF EXISTS employees_db")
//const createDB = connection.promise().query("CREATE DATABASE employees_db")
//const useDB = connection.promise().query("USE employees_db")
//const query1 = connection.promise().query(`insert into department values (?,?)`,[1,"HR"]).then(console.log("done"))
 var done = false

 //const seed = connection.promise().query("insert into department (id,name) values (?,?)",[10,"consulting"])
 console.table(connection.promise().query("SELECT * FROM department"))


while(!done){
    await inquirer.prompt({
        type: "list",
        message: "Choose one of the following:",
        choices:["View all departments","View all roles", "View all employees","Add a department","Add a role","Add an employee","Update an employee role","done"],
        name: "menu"
    })
    .then(answers=>{
        if (answers.menu === "done") {
            console.log("Done")
            done =true 
            return
        }
        else if (answers.menu === "View all departments"){
            getDepartments()
            return
        }
        else if (answers.menu === "View all roles"){
            getRoles()
            return
        }
        else if (answers.menu === "View all employees"){
            getEmployees()
            return
        }
       
    })

}
 
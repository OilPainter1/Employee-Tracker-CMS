import dotenv from "dotenv"
dotenv.config()
import inquirer from 'inquirer'
import mysql2 from "mysql2"


//initializes connection to mysql
const connection = mysql2.createConnection({
    host: 'localhost',
    user: process.env.db_username,
    database: process.env.db_name
  })

//sql query to view departments
async function getDepartments () { 
    const toReturn = await connection.promise().query("SELECT * FROM department")
    return toReturn[0]
}

//sql query to view roles table
async function getRoles() {
    const roles = await connection.promise().query("SELECT * FROM role_table")
    return roles[0]
}

//sql query to view employees table
async function getEmployees() {
    const employees = await connection.promise().query("SELECT * FROM employees")
    return employees[0]
}

//question ob
async function AddDepartment() {
   const departmentAnswer = await inquirer.prompt(departmentQuestions)
   return departmentAnswer
}
const departmentQuestions = [
{
    type: "input",
    name: "name",
    message: "(Optional) Enter the department name:"

}]


 

var done = false


while(!done){

async function init2() {
    const answers = await inquirer.prompt({
        type: "list",
        message: "Choose one of the following:",
        choices:["View all departments","View all roles", "View all employees","Add a department","Add a role","Add an employee","Update an employee role","done"],
        name: "menu",
   
    })
    return answers
}

//repeats menu prompt
const returnedAnswers = await init2()

if (returnedAnswers.menu === "done"){
    console.log("done")
    done=true
    break
}
else if (returnedAnswers.menu === "View all departments"){
    console.table(await getDepartments())
    continue
}
else if (returnedAnswers.menu === "View all roles"){
    console.table(await getRoles())
    continue
}
else if (returnedAnswers.menu === "View all employees"){
    console.table(await getEmployees())
    continue
}
else if (returnedAnswers.menu === "Add a department"){
    const newDepartment = await AddDepartment()
    await connection.promise().query("insert into department (name) values (?)",[newDepartment.name])
    console.log("Department added")
}
}

/*async function init(){
inquirer.prompt({
    type: "list",
    message: "Choose one of the following:",
    choices:["View all departments","View all roles", "View all employees","Add a department","Add a role","Add an employee","Update an employee role","done"],
    name: "menu",
   
})
.then(answers=>{
    if (answers.menu === "done") {
        console.log("Done")
        done =true 
        return
    }
    else if (answers.menu === "View all departments"){
        getDepartments()
        console.log(`
        
        `)
        
        return
    }
    else if (answers.menu === "View all roles"){
        getRoles()
        console.log(`
        
        `)
        
        return
    }
    else if (answers.menu === "View all employees"){
        getEmployees()
        console.log(`

        `)
        
        return
    }
    else if (answers.menu === "Add a department"){
        
       
        
        return
        
    }})}
    
    
    
    */
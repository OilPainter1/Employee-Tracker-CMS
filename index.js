import dotenv from "dotenv"
dotenv.config()
import inquirer from 'inquirer'
import mysql2 from "mysql2"


//initializes connection to mysql
const connection =  mysql2.createConnection({
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

//helper function to list department choices for adding a new role
async function listDepartments() {
    const departmentArray = await getDepartments()
    const newDepartmentArray = []
    departmentArray.forEach((answers)=> {
        newDepartmentArray.push(answers.name)
        return
    })
    return newDepartmentArray
}





async function listRoles(){
    const roleArray = await getRoles()
    const newRoleArray = []
    roleArray.forEach((answers)=>{
        newRoleArray.push(answers.title)
        return
    })
    return newRoleArray
}

async function listEmployees(){
    const employeeArray= await getEmployees()
    const newEmployeeArray = []
    employeeArray.forEach((answers)=>{
        newEmployeeArray.push(`${answers.first_name}`)
        return
    })
    return newEmployeeArray
}




//questions to be prompted for adding a new role
async function callRoleQuestions(){
const roleQuestions =[
    {
        type: "input",
        message: "Enter the role name",
        name: "name",
    },
    {
        type: "input",
        message: "Enter role salary",
        name: "salary"
    },
    {
        type: "list",
        message: "Which department does the role belong to?",
        choices: await listDepartments(),
        name: "department"
    }
   
]
return roleQuestions
}

async function callEmployeeQuestions(){
const employeeQuestions = [
    {
        type: "input",
        message: "Enter employee's first name",
        name: "firstName"
    },
    {
        type: "input",
        message: "Enter employee's last name",
        name: "lastName"
    },
    {
        type: "list",
        message: "Select the employee's role:",
        choices: await listRoles(),
        name: "role"
    },
    {
        type: "input",
        message: "name this employee's manager",
        name: "manager"
    }

]
    return employeeQuestions
}


async function callUpdateEmployeeRoleQuestions(){
    const updateRollQuestions= [{
        type: "list",
        name: "employee",
        message: "select the employee for the role change",
        choices: await listEmployees()

    },
    {
        type: "list",
        name: "newRole",
        message: "What is the employee's new role?",
        choices: await listRoles()
    }
    ]
    return updateRollQuestions
}

async function AddRole() {
    const roleAnswers = await inquirer.prompt(await callRoleQuestions())
    const departmentId = await connection.promise().query("select id from department where name = ?",[roleAnswers.department])
    await connection.promise().query("insert into role_table (title,salary,department_id) values (?,?,?)",[roleAnswers.name,roleAnswers.salary,departmentId[0][0].id])
    return
}

async function AddEmployee() {
    const employeeAnswers = await inquirer.prompt(await callEmployeeQuestions())
    const roleId = await connection.promise().query("select id from role_table where title = ?",[employeeAnswers.role])
    await connection.promise().query("insert into employees (first_name,last_name,role_id,manager_id) values (?,?,?,?)",
        [employeeAnswers.firstName,employeeAnswers.lastName,roleId[0][0].id,employeeAnswers.manager])
    return
}


 
//initializes loop condition
var done = false


while(!done){
     const connection =  mysql2.createConnection({
        host: 'localhost',
        user: process.env.db_username,
        database: process.env.db_name
      })
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
    try{
    const newDepartment = await AddDepartment()
    await connection.promise().query("insert into department (name) values (?)",[newDepartment.name])
    console.log("Department added")
    continue
    } catch(err){
        console.log("Error")
    }
}
else if (returnedAnswers.menu === "Add a role"){

    try{
    const newRole = await AddRole()
    console.log("Role added")
    continue
    } catch (error){
        console.log("Error, role not added")
    }
  
}
else if (returnedAnswers.menu === "Add an employee"){
    const newEmployee = await AddEmployee()
    console.log("Employee added")
}
else if (returnedAnswers.menu === "Update an employee role"){
    const updateAnswers = await inquirer.prompt(await callUpdateEmployeeRoleQuestions())

    const EmployeeId = await connection.promise().query("select id from employees where first_name = ?",[updateAnswers.employee])
    const updateAnswersRoleId = await connection.promise().query("select id from role_table where title = ?",[updateAnswers.newRole])
    await connection.promise().query("update employees set role_id = ? where id = ?",[updateAnswersRoleId[0][0].id,EmployeeId[0][0].id])
    console.log(`Updated ${updateAnswers.employee}'s role`)
}
}


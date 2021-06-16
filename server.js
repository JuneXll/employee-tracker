const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
require("dotenv").config();

//Connection for database
const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    port:process.env.DB_PORT,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
})

connection.connect((error)=>{
    if(error){
        console.log(error);
    } else {
        console.log("Connection to database successful!");
        userOptions();
    }
});

//Starting prompt
const userOptions = ()=>{
    inquirer.prompt({
        type:"list",
        name:"options",
        message: "EMPLOYEE DATABASE: What would you like to do?",
        choices:[
            "View all employees",
            "View all departments",
            "View all roles",
            "Add an employee",
            "Add a department",
            "Add a role",
            "Update employee role",
            "Delete an employee",
            "EXIT"]
    }).then((result)=>{
        switch(result.options){
            case "View all employees":
                viewEmployees();
                break;
            case "View all departments":
                viewDept();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Add a department":
                addDept();
                break;
            case "Add a role":
                addRole();
                break;
            case "Update employee":
                updateEmployee();
                break;
            case "Delete and employee":
                deleteEmployee();
                break;
            case "EXIT":
                exit();
                break;
            default:
                break;
        }
    });
};

//View all employees
const viewEmployees =()=>{
    let query = "SELECT * FROM employee";
    connection.query(query,(err,res)=>{
        if(err){
            console.log(err);
        } else {
            console.log(`There are ${res.length} employees!`);
            console.table("All Employees:", res);
            userOptions();
        }
    })

};

//View all departments
const viewDept = () =>{
    let query = "SELECT * FROM department";
    connection.query(query,(err,res)=>{
        if(err){
            console.log(err);
        } else {
            console.log(`There are ${res.length} departments!`);
            console.table("All Departments:", res);
            userOptions();
        }
    })
};

//View all roles
const viewRoles = ()=>{
    let query = "SELECT * FROM role";
    connection.query(query,(err,res)=>{
        if(err) throw err;
            console.log(`There are ${res.length} roles!`);
            console.table("All Roles:", res);
            userOptions();
        })
};

//Role selection query
const selectRole = () => {
    return new Promise((resolve,reject)=>{
        connection.query("SELECT id,title FROM role",(err,res)=>{
            if(err) throw err;
            return resolve(res);
        })
    })    
} 

//Add an employee
const addEmployee = async ()=>{
    const roles = await selectRole();
    inquirer.prompt([
        {
            type:"input",
            name: "first_name",
            message:"What is the employee's first name?"
        },{
            type:"input",
            name: "last_name",
            message:"What is the employee's last name?"
        },{
            type:"input",
            name: "manager_id",
            message:"What is manager's id?"
        },{
            type:"list",
            name: "role",
            message:"What is the employee's role?",
            choices: roles.map(role=>role.title)
        }
        ]).then((result)=>{
            const role = roles.find(role=>role.title==result.role);
            let role_id =role.id;
            
            connection.query("INSERT INTO employee(first_name,last_name,manager_id, role_id) VALUES (?,?,?,?)",[result.first_name,result.last_name,result.manager_id, role_id],(err,res)=>{
                    if(err) throw err;
                        console.log("New employee has been added!");
                        viewEmployees();
                    })
            })  
}  

const addDept = ()=>{
    inquirer.prompt([
        {
            type:"input",
            name: "dept_name",
            message:"What is the name of the new department?"
        }
        ]).then((result)=>{
            connection.query("INSERT INTO department(name) VALUES (?)",[result.dept_name],(err,res)=>{
                    if(err) throw err;
                        console.log("New department has been added!");
                        viewDept();
                    })
            })
    }

//department selection query
const selectDept = () => {
    return new Promise((resolve,reject)=>{
        connection.query("SELECT id,name FROM department",(err,res)=>{
            if(err) throw err;
            return resolve(res);
        })
    })    
}

const addRole = async ()=>{
    const depts = await selectDept();
    inquirer.prompt([
        {
            type:"input",
            name: "role_name",
            message:"What is name of the new role?"
        },{
            type:"input",
            name: "salary",
            message:"What is the new role's salary?"
        },{
            type:"list",
            name: "department",
            message:"What is the new role's department?",
            choices: depts.map(dept=>dept.name)
        }
        ]).then((result)=>{
            const dept = depts.find(dept=>dept.name==result.department);
            let dept_id =dept.id;
            
            connection.query("INSERT INTO role(title,salary,department_id) VALUES (?,?,?)",[result.role_name,result.salary,dept_id],(err,res)=>{
                    if(err) throw err;
                        console.log("New role has been added!");
                        viewRoles();
                    })
            })  
}  

const updateEmployee = ()=>{
     
}

// //Employee selection query
const selectEmployee = () => {
    return new Promise((resolve,reject)=>{
        connection.query("SELECT first_name,last_name FROM employee",(err,res)=>{
            if(err) throw err;
            console.log(res);
            return resolve(res);
        })
    })    
} 

const deleteEmployee = async () => {
    const employeeList = await selectEmployee();
    inquirer.prompt([
        {
            type:"list",
            name:"fname",
            message:"What is the first name of the  employee you would like to delete?",
            choices:employeeList.map(employee=>employee.first_name)
        },{
            type:"list",
            name:"lname",
            message:"What is the last name of the  employee you would like to delete?",
            choices:employeeList.map(employee=>employee.last_name)
        }
    ]).then((result)=>{
        connection.query("DELETE FROM employee WHERE (?,?)",[result.fname,result.lname],(err,res)=>{
                if(err) throw err;
                    console.log(`${result.fname} ${result.lname} has been deleted`);
                    viewEmployees();
                })
        })
}

const exit = ()=>{
    connection.end();
    process.exit();
}
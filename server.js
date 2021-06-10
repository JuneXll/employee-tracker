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
    let query = "SELECT title FROM role";
    connection.query(query,(err,res)=>{
        if(err) throw err;
            console.log(`There are ${res.length} roles!`);
            console.table("All Roles:", res);
            userOptions();
        })
};


//Role selection query
const selectRole = () => {
    let roleArr = [];
    connection.query("SELECT id,title FROM role",(err,res)=>{
        if(err) throw err;
        for(let i=0;i<res.length;i++){
            //Figure out how to convert this into key/values
            roleArr.push(res[i].title);
            roleArr.push(res[i].id);
        }
            console.log(roleArr);
            console.log(res);
    })
        return roleArr;
        
} 

//Add an employee
const addEmployee = async ()=>{
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
            choices: await selectRole()
        }
        ]).then((result)=>{
            //Once key/values are figured out then we can access role id
            let role_id= roleArr.length+1;
            console.log(role_id);
    
            connection.query("INSERT INTO employee(first_name,last_name,manager_id, role_id) VALUES (?,?,?,?)",[result.first_name,result.last_name,result.manager_id, role_id],(err,res)=>{
                    if(err) throw err;
                        console.log("New employee has been added!");
                        console.table(res);
                        userOptions();
                    })
            })  
}  

const addDept = ()=>{
    inquirer.prompt({
            type:'input',
            name:'newDept',
            message:'What is the name of the new Department?'
    }).then((result)=>{
        if (err) throw err;
        connection.query("INSERT INTO department")
    })

}

const addRole = ()=>{

}

const updateEmployee = ()=>{
     
}

const deleteEmployee = ()=>{

}

const exit = ()=>{
    connection.end();
    process.exit();
}
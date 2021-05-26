const mysql = require("mysql");
const consoleTable = require("console.table");
const inquirer = require("inquirer");

const connection=mysql.createConnection({
    host:DB_HOST,
    port:DB_PORT,
    user:DB_USER,
    password:DB_PASS,
    database:DB_DATABASE
});

connection.connection((error)=>{
    if(error){
        console.log(error)
    }
});
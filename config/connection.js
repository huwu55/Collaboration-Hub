var mysql = require('mysql');
require("dotenv").config();

var mysql_pw = process.env.MYSQL;

var connection;

if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{
    connection = mysql.createConnection({
        host: "localhost",
    
        port: 3306,
    
        user: "root",
    
        password: mysql_pw,
        database: "todo_db"
    });    
}

module.exports = connection;
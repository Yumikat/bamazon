var mysql = require("mysql");
var inquirer = require("inquirer");
var idChosen = 0;
var unitChosen = 0;
var stock = 0;

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "bamazonDB"
});

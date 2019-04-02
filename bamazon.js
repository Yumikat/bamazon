var mysql = require("mysql");
var inquirer = require("inquirer");
var idChosen = 0;
var unitChosen = 0;

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;

    console.log(`You have connected as: ${connection.threadId}. Welcome to Bamazon- where you'll get the greatest deals never seen!!!`);
    begin();
});

function begin() {
    console.log(`Here's a list of all of our current products in stock: `);
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`Item id: ${res[i].item_id}, Name: ${res[i].product_name}, Price: ${res[i].price}.`);
            // console.log(res);
        }
        questionPrompt();
    });
}

function questionPrompt() {
    inquirer.prompt({
        name: "id",
        message: "Which product ID would you like to purchase?",
        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        validate: function (value) {
            if (isNaN(value) === false) {
                idChosen = value;
                return true;
            }
            console.log(` Please choose an item with the id #.`)
            return false;
        }
    })
        .then(function (answer) {
            switch (answer.id) {
                case "1":
                    console.log(`You have chosen the item id ${idChosen}.`);
                    units();
                    break;
                case "2":
                    console.log(`You have chosen the item id ${idChosen}.`);
                    units();
                    break;
                case "3":
                    console.log(`You have chosen the item id ${idChosen}.`);
                    units();
                    break;
                case "4":
                    console.log(`You have chosen the item id ${idChosen}.`);
                    units();
                    break;
                case "5":
                    console.log(`You have chosen the item id ${idChosen}.`);
                    units();
                    break;
                case "6":
                    console.log(`You have chosen the item id ${idChosen}.`);
                    units();
                    break;
                case "7":
                    console.log(`You have chosen the item id ${idChosen}.`);
                    units();
                    break;
                case "8":
                    console.log(`You have chosen the item id ${idChosen}.`);
                    units();
                    break;
                case "9":
                    console.log(`You have chosen the item id ${idChosen}.`);
                    units();
                    break;
                case "10":
                    console.log(`You have chosen the item id ${idChosen}.`);
                    units();
                    break;
                default:
                    console.log(`Sorry, choose a product ID that is displayed.`);
                    questionPrompt();
                    break;
            }
        });
}

function units() {
    inquirer.prompt({
        name: "unit",
        message: "How many units would you like to purchase?",
        validate: function (value) {
            if (isNaN(value) === false) {
                unitChosen = value;
                return true;
            }
            console.log(` Please enter a number.`)
            return false;
        }
    })
        .then(function (response) {
            connection.query("SELECT stock_quantity FROM products WHERE ?", { item_id: idChosen }, function (err, res) {
                if (err) throw err;

                else if (response.unit > parseInt(res[0].stock_quantity)) {
                    console.log(`Insufficient quantity!!!`);
                    connection.end();
                } else {
                    console.log(`You have successfully purchased ` + response.unit + ` item(s) with id ${idChosen}.`);
                    updateQuantity();
                }
            });
        });
}

function updateQuantity() {
    
}
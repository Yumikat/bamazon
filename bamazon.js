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

                // if((response.unit > parseInt(res[0].stock_quantity)) && (parseInt(res[0].stock_quantity == 0))) {
                //     console.log(`Sorry, we are currently out of that product!`);
                //     units();
                // }
                else if (response.unit > parseInt(res[0].stock_quantity)) {
                    console.log(`Insufficient quantity!!!`);
                    units();
                } else {
                    console.log(`You have successfully purchased ` + response.unit + ` item(s) with id ${idChosen}.`);
                    // stock = res[0].stock_quantity;
                    // console.log(`How many are in stock: ` + stock);
                    // console.log(`Amount chosen to purchase: ` + unitChosen);
                    updateQuantity();
                }
            });
        });
}

function updateQuantity() {
    connection.query("UPDATE products SET ? WHERE ?",
        [
            { stock_quantity: (stock - unitChosen) },
            { item_id: idChosen }],
        function (err, res) {
            if (err) throw err;

            // console.log(`You have successfully bought ${unitChosen} of item id ${idChosen}.`);
            totalCost();
        });
}

function totalCost() {
    connection.query("SELECT price FROM products WHERE ?", { item_id: idChosen }, function (err, res) {
        if (err) throw err;
        var price = parseFloat(res[0].price);
        // console.log(price);
        // console.log(unitChosen);
        var cost = parseFloat(price*unitChosen);
        console.log(`Your total cost is $` + cost +`.`);
        console.log(`\n--------------------------------------\n`);
        begin();
    });
}


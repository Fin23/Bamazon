var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "=LizWiens2342",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runSearch();
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM top5000   ", function (err, res) {
        if (err) throw err;
        console.log(res);
        // below will disconnect you from DB
        //connection.end();
    });
}

//required dependencies need installing before use

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");
//end of dependencies

//connecting to my database from mysql
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

connection.connect();

//beginning display when you run node <file name>

var display = function(){
    connection.query("SELECT * FROM products   ", function (err, res) {
        if (err) throw err;


        console.log("-------------------------------------------------");
        console.log("       Welcome to Bamazon the online Bazaar      ");
        console.log("-------------------------------------------------");
        console.log("");
        console.log("Find Your Wears  Below for reasonable prices");
        console.log("");
        
        // below will disconnect you from DB
        //connection.end();
  
//creates table in terminal that reflects mysql table, reason for cli table2 dependency 
        var table = new Table({
            head: ['id', 'product_name', 'department_id', 'price','stock_quantity'],
             colWidths: [12, 20, 20],
             colAligns: ['center', 'left', 'left'],
             style: {
                 head: ['aqua'],
                 compact: true
             }
        });


        for (var i = 0; i< res.length; i++){
            table.push([res[i].id, res[i].product_name, res[i].department_id, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log("");
        shopping();
    });
};
//prompt for product purchase input by user

function shopping(){
     inquirer.prompt({
        name:"productToBuy",
        type:"input",
        message:"Please enter the Product Id of the item you wish to purchase.",
        choices: [
            "Item ID",
            "Item Name"
        ]
    })
//takes answer and finds it with in the data base and returns information based on what is found 
    .then(function(answer1){
        var selection = answer1.productToBuy;
        connection.query("SELECT * FROM products WHERE Id=?", selection, function(err, res){
            if(err) throw err;
            if(res.length === 0){
                console.log("That Product doesn't exist ..idiot, Please enter a Product Id from the list above");
                shopping();
            }else{
                inquirer
                .prompt({
                    name:"quantity",
                    type:"input",
                    message: "How many items would you like to purchase from this totally real store?"
                })
                    .then(function(answer2){
                        var quantity = answer2.quantity;
                        if (quantity > res[0].stock_quantity - quantity){
                            console.log(
                                "Our Apologies  you are to greedy " +
                                res[0].stock_quantity + 
                                " Items of the product selected"
                            );
                            shopping();
                        }else{
                            var total = quantity * res[0].price;
                            console.log("");
                            console.log(res[0].product_name + " purchased ");
                            console.log(quantity + " unit(s) purchased at: $ "+ res[0].price + " total cost $ "+total + " doll hairs");

                            var newQuantity = res[0].stock_quantity - quantity;
                            connection.query(
                             "UPDATE products SET stock_quantity  = " + newQuantity + "  WHERE id = " + res[0].id, 

                             function(err, result){
                                    if (err) throw err;
                                    console.log("");
                                    console.log("Your Order has been Processed");
                                    console.log("Thank you for participating in the capitalist system of supply and demand...");
                                    console.log("");
                                    connection.end();
                                }
                            );
                        }
                    });
            }
        });
       
    });
}
display();
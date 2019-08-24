var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

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

// connection.connect(function(err){
//     if(err) throw err;
//     console.log("connected as id" + connection.threadId);
//     display();
//     //
// });

var display = function(){
    connection.query("SELECT * FROM products   ", function (err, res) {
        if (err) throw err;


        console.log("-------------------------------");
        console.log("       Welcome to Bamazon      ");
        console.log("-------------------------------");
        console.log("");
        console.log("Find Your Products Below");
        console.log("");
        
        // below will disconnect you from DB
        //connection.end();
  

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

    .then(function(answer1){
        var selection = answer1.productToBuy;
        connection.query("SELECT * FROM products WHERE Id=?", selection, function(err, res){
            if(err) throw err;
            if(res.length === 0){
                console.log("That Product doesn't exist, Please enter a Product Id from the list above");
                shopping();
            }else{
                inquirer
                .prompt({
                    name:"quantity",
                    type:"input",
                    message: "How many items would you like to purchase?"
                })
                    .then(function(answer2){
                        var quantity = answer2.quantity;
                        if (quantity > res[0].stock_quantity - quantity){
                            console.log(
                                "Our Apologies we only have " +
                                res[0].stock_quantity + 
                                " Items of the product selected"
                            );
                            shopping();
                        }else{
                            console.log("");
                            console.log(res[0].product_name + " purchased ");
                            console.log(quantity + " qty @ $ " + res[0].price);

                            var newQuantity = res[0].stock_quantity - quantity;
                            connection.query(
                            " UPDATE products SET stock_quantity  =  ' newQuantity'  WHERE id = ' res[0].id' ",

                             function(err, result){
                                    if (err) throw err;
                                    console.log("");
                                    console.log("Your Order has been Processed");
                                    console.log("Thank you for Shopping with us...");
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
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

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id" + connection.threadId);
    display();
    shopping();
});

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
            head: ['Product ID', 'Product Description/Name', 'D-id', 'Cost'],
             colWidths: [12, 50, 8],
             colAligns: ['center', 'left', 'right'],
             style: {
                 head: ['aqua'],
                 compact: true
             }
        });


        for (var i = 0; i< res.length; i++){
            table.push([res[i].id, res[i].product_name, res[i].department_id, res[i].price]);
        }
        console.log(table.toString());
        console.log("");
    });
};

function shopping(){
     inquirer.prompt({
        name:"action",
        type:"input",
        message:"Please enter the Product Id of the item you wish to purchase.",
        choices: [
            "Item ID",
            "Item Name"
        ]
    })

    .then(function(answer){
        switch(answer.action){
            case "Item ID":
                itemIdSearch();
            break;
            case "Item Name":
                itemNameSearch();
            break;
        }
    });
}

function itemIdSearch(){
    console.log(product_name);
}

//  function itemIdSearch(){
//     inquirer.prompt({
//         name: 'id',
//         type:'input',
//         message: 'What are you looking for?'
//    })

// .then(function(answer){
//         console.log(answer.id);

//         var query = "SELECT * FROM products WHERE Id=?";
//         connection.query(query,{id: answer.id},
//             function (err, res){
//                 if(err) throw err;
//                 for(var i = 0; i < res.length; i++){
//                     console.log("all is ok");
//                 }

//                 });
// });
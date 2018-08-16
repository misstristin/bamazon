var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "password",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    buyProduct();
  });
  
  function buyProduct() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log('PRODUCTS AVAILABLE')
      for (var i=0; i<res.length; i++){
        console.log(res[i].item_id + ') ' + res[i].product_name + ' = $' + res[i].price);
      }

      inquirer
        .prompt([
            {
            type: "list",
            message: "Which product ID number would you like to buy?",
            choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            name: "buyresponse",
            },
            {
                type: "input",
                message: "How many?",
                name: "quantitydesired",
                }
        ])
        .then(function(inquirerResponse) {

            var quantDes = inquirerResponse.quantitydesired;
            var itemPickedName = res[inquirerResponse.buyresponse - 1].product_name;
            var itemPickedQuant = res[inquirerResponse.buyresponse].stock_quantity;
            var itemPickedPrice = res[inquirerResponse.buyresponse - 1].price;
            var totalCost = itemPickedPrice * quantDes;


            console.log('YOU CHOSE ' + itemPickedName + ' x ' + quantDes + ' QUANTITY.');
            console.log('There are ' + itemPickedQuant + ' currently available.');

                if(quantDes>itemPickedQuant){
                    console.log('SORRY, INSUFFICIENT QUANTITY IN STOCK.');
                }else{
                    console.log('APPROVED, YOU HAVE ENOUGH TO PURCHASE.')
                    var newQuant = itemPickedQuant - quantDes;
                    var queryUpdate = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                        {
                            stock_quantity: newQuant
                        },
                        {
                            product_name: itemPickedName
                        }
                        ],
                        function(err, res) {
                        // console.log(res.affectedRows + " products updated!\n");

                        console.log('That costs $' + totalCost + '.');
                        console.log(itemPickedName + ' now has ' + newQuant + ' in stock.');

                        }
                    );
                }
        });

      connection.end();
    });
  }
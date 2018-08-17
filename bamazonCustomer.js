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
    buyProduct();
  });
  
  function buyProduct() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log('PRODUCTS AVAILABLE')
      for (var i=0; i<res.length; i++){
        console.log(res[i].item_id + ') ' + res[i].product_name + ' = $' + res[i].price + ' = ONLY ' + res[i].stock_quantity + ' LEFT IN STOCK!');
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

            var buyResponse = parseInt(inquirerResponse.buyresponse);

            var quantDes = parseFloat(inquirerResponse.quantitydesired);
            var itemPickedName = res[buyResponse - 1].product_name;
            var itemPickedQuant = parseFloat(res[buyResponse -1].stock_quantity);
            var itemPickedPrice = parseFloat(res[buyResponse - 1].price);
            var totalCost = itemPickedPrice * quantDes;
            // console.log(inquirerResponse.buyresponse);
            // console.log(inquirerResponse.quantitydesired);
            console.log('YOU CHOSE ' + itemPickedName + ' x ' + quantDes + ' QUANTITY.');
            console.log('There are ' + itemPickedQuant + ' currently available.');

                if(quantDes>itemPickedQuant){
                    console.log('SORRY, INSUFFICIENT QUANTITY IN STOCK.');
                    connection.end();

                }else{
                    console.log('APPROVED, WE HAVE ENOUGH TO SELL.')
                    var newQuant = itemPickedQuant - quantDes;
                    connection.query(
                        "UPDATE products SET stock_quantity = " + newQuant + " WHERE item_id = " + inquirerResponse.buyresponse,
                        function(err, res) {
                        // console.log(res.affectedRows + " products updated!\n");
                        // console.log(query.sql);
                        console.log('Your total comes to $' + totalCost + '.');
                        console.log(itemPickedName + ' now has ' + newQuant + ' in stock.');
                        connection.end();
                        }
                    );
                }
        });
    });
  }
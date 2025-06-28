const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'root',
    database: 'mychatapp',
  port : 8889
});



 const  mysqlConnection = () => {
     connection.connect((err) => {
         if (err) {
             console.log("error while connectino Mysql")
             throw new Error(err);
         }

         console.log("===========MYSQL Connected Successfully")
     })
}
 
module.exports = mysqlConnection
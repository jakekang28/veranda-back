const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "localhost",
    user: "veranda",
    password : "veranda123",
    database : "032c",
});

connection.connect();

module.exports = connection;
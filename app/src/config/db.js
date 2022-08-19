const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password : "kjh0628^^",
    database : "032c",
});

connection.connect();

module.exports = connection;
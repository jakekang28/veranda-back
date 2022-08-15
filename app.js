const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// routing
const home = require("./routes/home");

// app setting

app.set("views", "./views");
app.set("view engine", "ejs");




app.use("/", home); 


module.exports = app;

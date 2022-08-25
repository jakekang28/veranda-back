const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// routing
const home = require("./src/routes/home");
// app setting

app.use('/img', express.static(path.join(__dirname, './public/images')));


app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use("/", home);



module.exports = app;

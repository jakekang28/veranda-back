const express = require('express');
const cors = require('cors');

const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 80;

const corsOptions = {
    origin: true,
    credentials: true
  };

// routing
const home = require("./src/routes/home");
// app setting

app.use('/img', express.static(path.join(__dirname, './public/images')));

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors(corsOptions));
app.use(express.static('public'));
// app.get("/", (req, res) => {
//     console.log("request sended");
//     res.send();
// });

app.use("/", home);

module.exports = app;

const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');

var fs = require("fs");
const { render } = require('ejs');


const port = 3000

// File
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index", {
        page: req.query.page ? req.query.page : "home" 
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
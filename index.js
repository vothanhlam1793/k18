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
    if(req.query.page == "baitap1_read"){
        fs.readFile(__dirname + "/storage/bt1.txt", function(err, data){
            if(err){
                res.render("index", {
                    page: req.query.page,
                    data: "Tải dữ liệu bị lỗi" + err
                });
            } else {
                res.render("index", {
                    page: req.query.page,
                    data: data
                });
            }
        });
    } else {
        res.render("index", {
            page: req.query.page ? req.query.page : "home",
            status: req.query.status ? req.query.status : "",
        });
    }
})

app.post("/bt1", function(req, res){
    var str = "";
    if(req.body.data){
        str = req.body.data;
    }
    fs.writeFile(__dirname + "/storage/bt1.txt", str,function(err){
        if(err){
            res.send("ERR");
        } else {
            res.redirect("/?page=baitap1&status=saved");
        }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
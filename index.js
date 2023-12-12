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

app.get("/baitap1_read", function(req, res){
    fs.readFile(__dirname + "/storage/bt1.txt", function(err, data){
        if(err){
            res.render("index", {
                page: "baitap1_read",
                data: "Tải dữ liệu bị lỗi" + err,
                title: "NE: Notepad"
            });
        } else {
            res.render("index", {
                page: "baitap1_read",
                data: data,
                title: "NE: Notepad"
            });
        }
    });
});

app.get("/baitap1", function(req, res){
    res.render("index", {
        page: "baitap1",
        status: req.query.status ? req.query.status : "",
        title: "NE: Notepad"
    });
})

app.get("/baitap2", function(req, res){
    fs.readFile(__dirname + "/storage/bt2.txt", function(err, data){
        var items = [];
        if(err){
            
        } else {
            var str = data.toString();
            items = str.split("\n");
        }
        items = items.filter(element => element !== '');
                // console.log(items);
        res.render("index", {
            page: "baitap2",
            status: req.query.status ? req.query.status : "",
            items: items,
            title: "NE: To do list"
        });
    })
})

app.get("/delete", function(req, res){
    var index = parseInt(req.query.index);
    if(index >= 0){
        fs.readFile(__dirname + "/storage/bt2.txt", function(err, data){
            var items = [];
            if(err){
                
            } else {
                var str = data.toString();
                items = str.split("\n");items
            }
            items.splice(index, 1);
            fs.writeFile(__dirname + "/storage/bt2.txt", items.join("\n"), function(err, data){
                if(err){

                } else {

                }
                res.redirect("/baitap2");
            })
        })
    } else {
        res.redirect("/baitap2");
    }
});

app.get("/baitap3", function(req, res){
    res.render("index", {
        page: "baitap3",
        status: req.query.status ? req.query.status : "",
        title: "NE: Bai tap 3"
    });
})

app.get('/', (req, res) => {
    res.render("index", {
        page: "home",
        status: req.query.status ? req.query.status : "",
        title: "Nestech - EXPRESS"
    });
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
            res.redirect("/baitap1?status=saved");
        }
    });
});

app.post("/bt2", function(req, res){
    var str = "";
    if(req.body.data){
        str = req.body.data;
    }
    console.log(req.body);
    if(str == ""){
        res.redirect("/?page=baitap2?status=saved");
    } else {
        fs.appendFile(__dirname + "/storage/bt2.txt", "\n" + str,function(err){
            if(err){
                res.send("ERR");
            } else {
                res.redirect("/baitap2?status=saved");
            }
        });
    }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
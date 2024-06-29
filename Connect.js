var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', function(req,res){
    var user_name = req.body.user_name;
    var user_address = req.body.user_address;
    var user_email = req.body.user_email;
    var user_phone =req.body.user_phone;
    var option = req.body.option;
    var user_msg =req.body.user_msg;
    var feed1 = req.body.feed1;
    
    var data = {
        "user_name": user_name,
        "user_address ":user_address ,
        "user_email":user_email,
        "user_phone":user_phone,
        "option":option,
        "user_msg":user_msg,
        "feed1":feed1,

    }
db.collection('Orders').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('success.html');
})
app.listen(8000);
console.log("server listening at port 8000");

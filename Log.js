var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/login');
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
  
app.post('/log_in', function(req,res){
    var Uname = req.body.username;
    var Pwd = req.body.pass;
        
db.collection('users').findOne({name:Uname}).
then(customer => {
    if(!customer)
    {
        return res.send('Invalid username');
        
    }
    else if(customer.password === Pwd)
        {
            return res.redirect('success.html');
        }
else{
    return res.send('Invalid password!');
}
    
  });
    
})
app.listen(3000);
console.log("server listening at port 3000")

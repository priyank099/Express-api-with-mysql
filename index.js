var express = require("express");
var app = express();
var path = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
     database: "mydb"
});

connection.connect(function(err){
  if(err) throw err;
  console.log('connected..');
})

app.get('/',function(req,res){
       res.sendFile(path.join(__dirname+'/index.html'));
   });

app.post('/submit', function (req, res) {
     
    var sql = "insert into user values('"+req.body.name+"', '"+req.body.type+"','"+req.body.phoneno+"')";
    connection.query(sql, function(error){
      if (error) throw error;
     
      console.log("Data inserted successfully");
      res.end();
    })
    res.redirect('/');
    connection.end();    
  });

app.get('/getdata', function (req,res){
  console.log(req);
  connection.query('select * from user', function(error,result){
    if(error) throw error;
    res.end(JSON.stringify(result));
  });
});

app.put('/upddata', function (req,res){
  console.log(req);
  connection.query('UPDATE `user` SET `type`=? where `name`=?', function(error,result){
    if(error) throw error;
    res.end(JSON.stringify(result));
  });
});

app.listen(5000);
console.log("Running at Port 5000");


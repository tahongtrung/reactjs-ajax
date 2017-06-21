var express = require("express");
var bodyParser=require('body-parser');
var parser = bodyParser.urlencoded({extended:false});

var app = express();
app.use(express.static("public")); //all file load from here
app.set("view engine","ejs");
app.set("views","./views");
app.listen(3008);

var mang =["php","android","asp","react","mongodb"];

app.get("/",function(req,res){
	res.render("home");
});
app.post("/getNotes",function(req,res){
	res.send(mang);
});

app.post("/add",parser,function(req,res){
	var newNote = req.body.note;
	mang.push(newNote);
	res.send(mang);
});

app.post("/delete",parser,function(req,res){
	var id = req.body.iddel;
	mang.splice(id,1);
	res.send(mang);
});
app.post("/edit",parser,function(req,res){
	var id = req.body.idEdit;
	mang[id]=req.body.noidung;
	res.send(mang);
});
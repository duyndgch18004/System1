const express = require('express');
const engines = require('consolidate');
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

//npm i handlebars consolidate --save
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

var MongoClient = require('mongodb').MongoClient;
var url ='mongodb+srv://hungdtgch190219:Hungbeo50@cluster0.yvnfp.gcp.mongodb.net/test'
app.get('/all',async function(req,res){
    let client= await MongoClient.connect(url);
    let dbo = client.db("GCH0719");
    let results = await dbo.collection("Test").find({}).toArray();
    res.render('allSanPham',{sanPham:results});
})
const PORT = process.env.PORT || 5000;
var server = app.listen(process.env.PORT || 5000,function() {
    console.log("server is running at " + PORT);
});
var express=require("express");
var request = require('request');

var app=express();
app.set("view engine","ejs");

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


app.get("/results",function(req,res){
    
    // request("http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb",function(error,response,body){
        
    //   if(!error && response.statusCode===200){
    //       var data=JSON.parse(body);
    //       res.render("results",{data,data});
    //   } 
    // });
    
    
    res.render("results");
    
});


app.get("/search",function(req,res){
    
  var moviename=req.query.movieName;

        var requestmovie="http://www.omdbapi.com/?s="+moviename+"&apikey=thewdb";
   
       request(requestmovie,function(error,response,body){
        
        if(!error && response.statusCode===200){
            var data=JSON.parse(body);
            console.log(data);
            //res.render("search",{data,data});
         } 
     });
   
    
});




app.listen(process.env.PORT,process.env.ID,function(){
    
    console.log("movie app connected");
});
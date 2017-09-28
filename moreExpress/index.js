var express=require("express");
var index=express();
index.use(express.static("public"));
index.set("view engine","ejs");

index.get("/",function(req,res){
    res.render("home");
   
});

index.get("/fallinlovewith/:thing",function(req,res){
    var thing=req.params.thing;
    
    
    res.render("love",{thingVar:thing}); 
});


index.get("/posts",function(req,res){
   
   var posts1=[
       {title: "Post 1",author: "susy"},
       {title: "Post 2",author: "susy"},
       {title: "Post 3",author: "susy"}
       
       ]; 
       
       res.render("posts",{posts2:posts1});
    
});




index.listen(process.env.PORT,process.env.IP,function(){
    console.log("server is listening");
});
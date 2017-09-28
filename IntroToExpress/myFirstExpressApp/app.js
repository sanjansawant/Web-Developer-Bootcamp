
var express=require("express");
var app=express();



//Routes
app.get("/",function(req,res){
    res.send("Hi There!!!");
    
});

app.get("/bye",function(req,res){
    
   res.send("Good Bye"); 
});

app.get("/dog",function(req,res){
    console.log("Someone made a request to dog");
   res.send("Meow!!!"); 
});


app.get("/r/:subredditname",function(req,res){
    
    var subreddit=req.params.subredditname;
    
   res.send("welsome to subreddit "+subreddit.toUpperCase()); 
});

app.get("/r/:subredditname/comments/:id/:title",function(req,res){
        console.log(req.params);
   res.send("Welcome to my world"); 
});


app.get("*",function(req,res){
    
   res.send("You are a star"); 
});





//Tell express to listen for request(start server)
//number will come from cloud 9,env variable
app.listen(process.env.PORT, process.env.IP,function(){
    
    console.log("server has started");
});

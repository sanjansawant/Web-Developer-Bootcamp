var express=require("express");

var app=express();

app.get("/",function(req,res){
    console.log("visiting /");
    res.send("Hi There, welcome to my assignment");
    
});

app.get("/speak/:pig",function(req,res){
    
    if(req.params.pig==="pig"){
        res.send("the pig says \'oink\'");
    } else if(req.params.pig==="cow"){
        res.send("the pig says \'MOO\'");
        
    }else{
         res.send("the dog says \'Woof Woof\'");
    }
    
    
});



app.get("/repeat/:hello/:id",function(req,res){
    
    var num=Number(req.params.id);
    

    var string = "";
    for(var i=0;i<num;i++){
        string=string+" "+req.params.hello;
    };
    res.send(string);
});

app.get("*",function(req,res){
    res.send("Page not found");
});


app.listen(process.env.PORT,process.env.ID,function(){
   console.log("the process has started");
});
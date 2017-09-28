var express=require("express");
var app=express();

var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static("public"));

 var campgrounds=[
       {name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
       {name:"Granite Hill",image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
       {name:"Mountain Goat's Rest",image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"}
       ];


app.get("/",function(req,res){
    
   res.render("landing"); 
});



app.get("/campgrounds",function(req,res){
  
       
       res.render("campgrounds",{campgrounds:campgrounds});
    
});



app.get("/campgrounds/new",function(req,res){
    
   res.render("new"); 
    
});

//rest
app.post("/campgrounds",function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name:name, image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    
});




app.listen(process.env.PORT, process.env.IP,function(){
    
   console.log("Yelp Camp Server connected"); 
});
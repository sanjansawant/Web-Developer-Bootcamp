var express=require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
//Schema setup


var campgroundSchema=new mongoose.Schema({
    
    name: String,
    image: String,
    description: String
});
var Campground=mongoose.model("Campground",campgroundSchema);




// Campground.create({
//     name:"Granite Hill",
//     image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful Granite"
    
// },function(err,campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("NEWLY CREATED CAMPGROUND: ");
//         console.log(campground);
//     }
// });


app.get("/",function(req,res){
    
   res.render("landing"); 
});


// INDEX
app.get("/campgrounds",function(req,res){
  
       Campground.find({},function(err,allCampgrounds){
           if(err){
               console.log(err);
           }else{
               res.render("index",{campgrounds:allCampgrounds});
           }
       });
       //res.render("campgrounds",{campgrounds:campgrounds});
    
});



//CREATE
app.post("/campgrounds",function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    
    var newCampground={name:name, image:image, description: description};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
        
    })
});

//NEW ROUTE
app.get("/campgrounds/new",function(req,res){
    
   res.render("new"); 
    
});

//SHOW

app.get("/campgrounds/:id",function(req,res){
    
    
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground:foundCampground});
        }
        
    });

});

app.listen(process.env.PORT, process.env.IP,function(){
    
   console.log("Yelp Camp Server connected"); 
});


var express=require("express");
var router=express.Router({mergeParams: true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");




//================================================================================
//COMMENTS ROUTES
//================================================================================

//NEW

router.get("/new", isLoggedIn, function(req,res){
    
    var id=req.params.id;
    Campground.findById(req.params.id,function(err,campground){
        
        if(err){
            
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground}); 
        }
        
    });
    
   
    
});


//CREATE comment 

router.post("/", isLoggedIn, function(req,res){
    
   Campground.findById(req.params.id,function(err,campground){
       
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else{
                   //add username and id to comment
                   //save comment
                   comment.author.id=req.user._id;//since using isLoggedIn
                   comment.author.username=req.user.username;
                   //console.log("New Comments username will be "+req.user.username);
                   comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect("/campgrounds/"+req.params.id);
               }
               
               
           })
           
          
           
       }
   }) 
    
    
});

//if you want user to be signed in to access any page use this function 
//middleware
function isLoggedIn(req,res,next){
    
    if(req.isAuthenticated()){
        
        return next();
    }
    res.redirect("/login");
    
};

module.exports=router;
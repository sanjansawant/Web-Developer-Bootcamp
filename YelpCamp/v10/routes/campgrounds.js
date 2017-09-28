
var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware/index.js");


//================================================================================
//CAMPGROUNDS ROUTES
//================================================================================





// INDEX - SHOW all campgrounds
router.get("/",function(req,res){
    
    console.log(req.user);
  
       Campground.find({},function(err,allCampgrounds){
           if(err){
               console.log(err);
           }else{
               //console.log("I am here here here here here "+req.user.username);
               res.render("campgrounds/index",{campgrounds:allCampgrounds});
           }
       });
       //res.render("campgrounds",{campgrounds:campgrounds});
    
});




//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
    
   res.render("campgrounds/new"); 
    
});

//through postman can use to create campground 
//CREATE
router.post("/", middleware.isLoggedIn, function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    
    var author={
        
        id: req.user._id,
        username: req.user.username
        
    };
    
    var newCampground={name:name, image:image, description: description, author: author};
    
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
        
    })
});


//SHOW

router.get("/:id",function(req,res){
    
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
        
    });

});


//EDIT route

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    //authorization not authentication
    
   
        Campground.findById(req.params.id, function(err,foundCampground){
       
       if(err){
           console.log(err);
       }else{
          
         res.render("/campgrounds/edit",{campground:foundCampground});     
             
        }
   }); 
    
});



//UPDATE ROUTE


router.put("/:id", middleware.checkCampgroundOwnership,function(req,res){
    
    var data={
        
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
        
    };
    Campground.findByIdAndUpdate(req.params.id, data, function(err,campground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            
            res.redirect("/campgrounds/"+req.params.id);
        }
        
        
    });
    
    
});


//DELETE Route
router.delete("/:id",  middleware.checkCampgroundOwnership,function(req,res){
    
   Campground.findByIdAndRemove(req.params.id,function(err, campground){
       
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds");
       }
       
   }) ;
    
});



// //middleware
// function checkCampgroundOwnership(req, res, next){
    
    
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id, function(err,foundCampground){
       
//       if(err){
//           res.redirect("back");
//       }else{
//           if(foundCampground.author.id.equals(req.user._id)){
//                 next();
//           }else{
               
//                 res.redirect("back");       
//           }
               
//         }
//   }); 
//     }else{
        
//         res.redirect("back");
//     }
// };



// //if you want user to be signed in to access any page use this function 
// //middleware
// function isLoggedIn(req,res,next){
    
//     if(req.isAuthenticated()){
        
//         return next();
//     }
//     res.redirect("/login");
    
// };


module.exports=router;

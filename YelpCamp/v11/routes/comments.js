

var express=require("express");
var router=express.Router({mergeParams: true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware/index.js");




//================================================================================
//COMMENTS ROUTES
//================================================================================

//NEW

router.get("/new", middleware.isLoggedIn, function(req,res){
    
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

router.post("/", middleware.isLoggedIn, function(req,res){
    
   Campground.findById(req.params.id,function(err,campground){
       
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   req.flash("error", "something went wrong");
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
                    req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/"+req.params.id);
               }
               
               
           })
           
          
           
       }
   }) 
    
    
});



//EDIT Route

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    
    
           Comment.findById(req.params.comment_id,function(err,foundComment){
               if(err){
                   res.redirect("back");
               }else{
                   
                   res.render("comments/edit",{ comment:foundComment, campground_id:req.params.id})
                   
               }
           });
    
});


//Comment Update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
        
    });
    
    
});



//DELETE Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    
   Comment.findByIdAndRemove(req.params.comment_id, function(err,commentDeleted){
      if(err){
          res.redirect("back");
      } else{
          req.flash("success","Comment deleted");
          res.redirect("/campgrounds/"+req.params.id);
      }
       
   }); 
    
});




// //middleware
// function checkCommentOwnership(req,res,next){
    
    
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err,foundComment){
       
//       if(err){
//           res.redirect("back");
//       }else{
//           if(foundComment.author.id.equals(req.user._id)){
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
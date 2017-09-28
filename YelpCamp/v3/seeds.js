var mongoose=require("mongoose");
var Comment=require("./models/comment");
var Campground=require("./models/campground");

var data=[
    {name: "Cloud's rest", image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg", description: "blah blah balh"},
   {name: "Desert Mesa", image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg", description: "blah blah balh"},
    {name: "Canyon Floor", image: "https://farm5.staticflickr.com/4101/4961777592_322fea6826.jpg", description: "blah blah balh"}
    ]



function seedDB(){
    //Remove Campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log("removed backgrounds");
        }
        console.log("removed campgrounds!");
        
         
    //Add a few Campgrounds
    
    data.forEach(function(seed){
        
        Campground.create(seed, function(err,campground){
            
            if(err){
                console.log(err);
            }else{
                console.log("added");
                 //add a few comments
                 Comment.create({text: "This place is great, But I wish there was internet",author: "Homer"},function(err,comment){
                    if(err){
                        console.log(err);
                    }    else{
                     campground.comments.push(comment);
                     campground.save();
                    console.log("Created new comment");
                        
                    }
                     
                 });
                
            }
        });
        
    });
    
    });
   
    
    
    
   
}

module.exports= seedDB;
var express=require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var Campground=require("./models/campground");
var seedDB=require("./seeds");
var Comment=require("./models/comment");
var User=require("./models/user");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname+"/public");


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    
    
    secret: "Once again Rusty wins",
    resave: false,
    saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Will give you current user
app.use(function(req,res,next){
    
    res.locals.currentUser= req.user;//else will stop here itself
   next();// move on next 
});






//Schema setup

app.get("/",function(req,res){
    
   res.render("landing"); 
});


// INDEX - SHOW all campgrounds
app.get("/campgrounds",function(req,res){
    
    console.log(req.user);
  
       Campground.find({},function(err,allCampgrounds){
           if(err){
               console.log(err);
           }else{
               res.render("campgrounds/index",{campgrounds:allCampgrounds});
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
    
   res.render("campgrounds/new"); 
    
});

//SHOW

app.get("/campgrounds/:id",function(req,res){
    
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
        
    });

});

//============================
//COMMENTS ROUTES
//===========================


//NEW

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
    
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

app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
    
   Campground.findById(req.params.id,function(err,campground){
       
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else{
                   
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+req.params.id);
               }
               
               
           })
           
          
           
       }
   }) 
    
    
});



//===============================
//AUTH ROUTES
//===============================

app.get("/register",function(req,res){
    
    res.render("register");
});

//handle sIGNUP Logic
app.post("/register",function(req,res){
    
    var newUser=new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err,user){
       
       if(err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req,res, function(){
           
          res.redirect("/campgrounds"); 
       });
       
   }) ;
    
});


// show login form

app.get("/login", function(req,res){
    
   res.render("login"); 
    
});
//hadle login logic
app.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    
}),function(req, res){
    
    
});



//logout

app.get("/logout", function(req,res){
    
    req.logout();
    res.redirect("/campgrounds");
});



function isLoggedIn(req,res,next){
    
    if(req.isAuthenticated()){
        
        return next();
    }
    res.redirect("/login");
    
}


app.listen(process.env.PORT, process.env.IP,function(){
    
   console.log("Yelp Camp Server connected"); 
});
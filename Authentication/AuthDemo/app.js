var express                   =   require("express"),
mongoose                      =   require("mongoose"),
passport                      =   require("passport"),
bodyParser                    =   require("body-parser"),
User                          =   require("./models/user"),
LocalStrategy                 =   require("passport-local"),
passportLocalMongoose         =   require("passport-local-mongoose");


mongoose.connect("mongodb://localhost/auth_demo_app");
var app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    //to encode and decode the sessions
    secret: "Rusty is the best",
    resave: false,
    saveUninitialized: false
    
    
}));





//Anytime we use passport
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));// from user.js file

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());//Used for reading the session taking the data from the session thats encoded and unencoding it
//we get this method from user.js passportlocalmongoose

//=======================
// ROUTES 
//=======================

app.get("/", function(req,res){
    
   res.render("home"); 
    
});


app.get("/secret", isLoggedIn, function(req,res){
    
    
   res.render("secret"); 
});


// Auth Routes

//show sign up form
app.get("/register", function(req,res){
    
    
   res.render("register"); 
});


app.post("/register",function(req,res){
    
  
   User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       
    //hashed password    
     if(err){
        console.log(err);
        return res.render('register');
     }
     //loggedin
     passport.authenticate("local")(req, res, function(){
         
        res.redirect("/secret");
        
         
     });
    
       
   });
   
    
});


//LOGIN ROUTES
//render login form
app.get("/login", function(req,res){
    
    res.render("login");
});

//login logic

app.post("/login", passport.authenticate("local",{   //middleware==>code that runs before our final route callback
    
    successRedirect: "/secret",
    failureRedirect: "/login"
    
}), function(req,res){
    
    
    
});



app.get("/logout",function(req,res){
    //passport is destroying all the users data in the session its no longer keeping track of this users data in the session from request to request
   req.logout();
   res.redirect("/");
});


function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
    }
    
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.ID, function(){
    
   console.log("server started"); 
    
});
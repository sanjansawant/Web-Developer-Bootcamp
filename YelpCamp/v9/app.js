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


//Schema setup//require routes
//================================================================================
//Landing Route inside Auth Route
//================================================================================




//================================================================================
//CAMPGROUNDS ROUTES
//================================================================================


var campgroundRoutes=require("./routes/campgrounds");





//================================================================================
//COMMENTS ROUTES
//================================================================================

var commentRoutes=require("./routes/comments");



//===================================================================================
//AUTH ROUTES
//===================================================================================

var indexRoutes=require("./routes/index");

//seed the database
//seedDB();

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


// Will give you current user  for login signup condition navbar
app.use(function(req,res,next){
    //what we put inside res.locals is what is available inside of our template
   res.locals.currentUser = req.user;//else will stop here itself
   next();// move on next 
});
//will run for every routes


app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP,function(){
    
   console.log("Yelp Camp Server connected"); 
});
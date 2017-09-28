var mongoose=require("mongoose");

var passportLocalMongoose=require("passport-local-mongoose");


var UserSchema=mongoose.Schema(
    {
        
       username : String,
       password : String
        
    });
    
//add methods od passportLocalMongoose to userSchema    
UserSchema.plugin(passportLocalMongoose);    
    
    
module.exports=mongoose.model("User", UserSchema);
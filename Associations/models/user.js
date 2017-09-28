var mongoose=require("mongoose");

var userSchema=new mongoose.Schema({
    
    email: String,
    name: String,
    
    //arrays of object id
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
        
    }]
    
});

module.exports=mongoose.model("User",userSchema);
const mongoose = require("mongoose");

//DEfine User Schema
const UserSchema = new mongoose.Schema({

    //name of the user
    name:{
        require: true,
        type: String
    },

    //email of the user
    email:{
        require: true,
        type: String
    },

    //password of the user
    password:{
        require: true,
        type: String
    },
    
    //role of the user
    role:{
        type:String,
        enum:["Admin", "Visitor"]
    },

    Attended_event:[{
        requrie:true,
        type:Array
    }]
    
});


module.exports = mongoose.model("User", UserSchema);

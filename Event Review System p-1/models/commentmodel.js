//fetch mongoose
const mongoose = require("mongoose");

//define Schema
const commentSchema = new mongoose.Schema({

    //which user is commeting
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    //on which event user want to comment
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },

    //what is comment
    body:{
        require: true,
        type: String
    },

    //is any reply for this comment
    reply:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Reply"
    },

    like:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }],

    report:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Report"
    }]

});


module.exports = mongoose.model("Comment", commentSchema);
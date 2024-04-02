//feetch mongoosee
const mongoose = require("mongoose");

//Schema define
const likeSchema = new mongoose.Schema({

    //on which event user want to like
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },

    //which user is liking
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    //which user is liking
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }

});

//export
module.exports = mongoose.model("Like", likeSchema);
//fetch mongoose
const mongoose = require("mongoose");

//Schema
const ratingSchema = new mongoose.Schema({

    //on which event user is rating
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },

    //which user giving rating
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    //rating between 0 to 10
    rating:{
        type: Number,
        required: true
    }

});

module.exports = mongoose.model("Rating", ratingSchema);
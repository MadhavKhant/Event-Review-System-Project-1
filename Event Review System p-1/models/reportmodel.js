const mongoose = require("mongoose");

//define Schema
const reportmodel = new mongoose.Schema({

    //which user is reporting
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    //on which event user is reporting
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event"
    },

    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }

});

module.exports = mongoose.model("Report", reportmodel);
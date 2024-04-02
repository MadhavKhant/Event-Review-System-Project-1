//fetch mongoose
const mongoose = require("mongoose");

//define Schema
const eventSchema = new mongoose.Schema({
    
    //title of Event
    title:{
        type: String,
        required: true
    },

    //body of event
    body:{
        type: String,
        required: true
    },

    //likes on this event
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }],

    //coments on this event
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],

    //replys on this event
    replys:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reply"
    }],

    //all rating of this event
    rating: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Rating"
    }],

    //reports on this event
    report:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Report"
    }],

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

});

//export
module.exports = mongoose.model("Event", eventSchema);
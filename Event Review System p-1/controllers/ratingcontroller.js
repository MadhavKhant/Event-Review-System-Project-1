//fetch models
const Event = require("../models/eventmodel");
const Rating = require("../models/rating");

//controllers
exports.rateEvent = async (req, res) => {
    try{
        //fetch data from req
        const {event, rating} = req.body;
        const userId = req.user.id;

        //for invalid rating 
        if(rating<0 || rating>10)
        {
            return res.status(400).json({
                message:"Give valid rating from 0 to 10"
            });
        }

        //make object of rating
        const rate = new Rating({
            event, user:userId, rating
        });

        //save object in rating database
        const savedRating = await rate.save();

        //save id of current rating in given event
        const updatedEvent = await Event.findByIdAndUpdate(
                            event, 
                            {$push: {rating: savedRating._id}}, 
                            {new: true});

        //send response
        res.json({
            success:true,
            message:"Rated event successfully",
            message:"after rating event is here",
            event: updatedEvent
        });
    }
    catch(error)
    {
        res.status(500).json({
            error:"error during rating",
            error:error.message
        })
    }
    
}
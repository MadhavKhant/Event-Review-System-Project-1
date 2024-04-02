const Event = require("../models/eventmodel");

exports.getRatingSecond = async(req, res) => {
    try{

        const event = await Event.findOne({title: "second event"});

        if(!event)
        {
            return res.status(404).json({
                success: false,
                message: "Event with title 'second event' not found"
            });
        }

        const rating = event.rating;

        // If the event is found, return it
        return res.status(200).json({
            success: true,
            message:"all rating of second event",
            rating
        });
        
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"error during fetching rating of second event"
        })
    }
}
const Event = require("../models/eventmodel");

exports.getRatingThird = async(req, res) => {
    try{

        const event = await Event.findOne({title: "third event"});

        if(!event)
        {
            return res.status(404).json({
                success: false,
                message: "Event with title 'third event' not found"
            });
        }

        const rating = event.rating;

        // If the event is found, return it
        return res.status(200).json({
            success: true,
            message:"all rating of third event",
            rating
        });
        
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"error during fetching rating of third event"
        })
    }
}
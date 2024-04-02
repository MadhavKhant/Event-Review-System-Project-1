const Event = require("../models/eventmodel");

exports.getRatingFirst = async(req, res) => {
    try{

        const event = await Event.findOne({title: "first event"});
        
        if(!event)
        {
            return res.status(404).json({
                success: false,
                message: "Event with title 'first event' not found"
            });
        }

        const rating = event.rating;

        // If the event is found, return it
        return res.status(200).json({
            success: true,
            message:"all rating of first event",
            rating
        });

    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"error during fetching rating of first event"
        })
    }
}
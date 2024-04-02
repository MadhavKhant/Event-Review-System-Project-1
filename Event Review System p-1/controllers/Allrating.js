const Event = require("../models/eventmodel");

exports.Allrating = async(req, res) => {
    try{

        //fetch all event
        const events = await Event.find();

        //make empty array
        const allrating = [];

        //fetch all rating array from each event and put in allrating array
        for(const event of events)
        {
            const rating = event.rating;
            allrating.push(rating);
        }

        return res.status(200).json({
            success:true,
            message:"All rating from each event is here: ",
            allrating
        })

    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"error during fetching Allrating"
        })
    }
}
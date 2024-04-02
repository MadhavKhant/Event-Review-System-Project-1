//fetch model
const Event = require("../models/eventmodel");

//function controller
exports.createEvent = async (req, res) => {
    try{
        //fetch data from request
        const {title, body} = req.body;

        //make object
        const event = new Event({
            title, body
        });

        //push in database
        const savedEvent = await event.save();

        //send response
        res.json({
            success:true,
            message:"successfully created new Event By Admin",
            message:"new Created event by Admin is here",
            event:savedEvent,
        });

    } 
    catch(error){
        return res.status(400).json({
            error: "error during creating post",
        });
    }
}

//fetch all posts
exports.getAllEvents = async (req, res) => {
    try{

        const events = await Event.find()
                                .populate("comments")
                                .populate("likes")
                                .populate("replys")
                                .populate("rating")
                                .exec();
                                
        res.json({
            events,
        });


    }
    catch(error)
    {
        return res.status(400).json({
            error: "error during fetching all posts"
        })
    }
}
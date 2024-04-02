//fetch model
const Comment = require("../models/commentmodel");
const Event = require("../models/eventmodel");
const User = require("../models/usermodel");
 
//function logic
exports.createComment = async (req, res) => {
    try{
        //fetch data from req body
        const {event, body} = req.body;
        const userId = req.user.id;
        
        //fetch userdetail
        const userDetail = await User.findById(userId);
        
        // Flatten the array of arrays
        const flattenedAttendedEvents = userDetail.Attended_event.flat();

        // Check if the given event ID is present in the flattened array
        const check = flattenedAttendedEvents.includes(event) ? flattenedAttendedEvents.indexOf(event) : -1;

        //not attended event
        if(check == -1)
        {
            return res.status(400).json({
                success:false,
                message:"you did not attend this event"
            });
        }

        //create comment object 
        const comment = new Comment({
            event, user:userId, body
        });

        //save the new comment in databasse
        const savedComment = await comment.save();

        //find event from Event and add id of given comment
        const updatedEvent = await Event.findByIdAndUpdate(
                                    event, 
                                    {$push: {comments: savedComment._id}}, 
                                    {new: true})
                                    .populate("comments")
                                    .exec();

        
        //Show event in response
        res.json({
            success:true,
            message:"comment successfully added on given event",
            message:"comment added is here",
            savedComment,
            message:"Updated Event is here",
            updatedEvent
        });

    }
    catch{
        return res.status(500).json({
            error:"error while creating comment"
        });
    }
}


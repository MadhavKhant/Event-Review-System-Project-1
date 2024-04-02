//fetch model
const Comment = require("../models/commentmodel");
const Reply = require("../models/replymodel");
const Event = require("../models/eventmodel");

//function logic
exports.replyOnComment = async (req, res) => {
    try{

        //fetch data from req body
        const {event, comment, body} = req.body;

        //create reply object 
        const reply = new Reply({
            event, comment, body
        });
        
        //save the new reply in databasse
        const savedReply = await reply.save();
        
        //add id of reply on comment
        const updatedComment = await Comment.findByIdAndUpdate(
                                    comment, 
                                    {$push: {reply: savedReply._id}}, 
                                    {new: true})
                                    .populate("reply")
                                    .exec();

        
        //add id of reply in current event
         const updatedEvent = await Event.findByIdAndUpdate(
                                    event, 
                                    {$push: {replys: savedReply._id}},
                                    {new: true})
                                    .populate("comments")
                                    .populate("replys")
                                    .exec();

                                    console.log("updatedEvent is: ", updatedEvent);
        //send response
        res.json({
            success:true,
            updatedComment,
            message:"Updated event after reply is here",
            event: updatedEvent
        });
    }
    catch{
        return res.status(500).json({
            error:"error while replying comment"
        });
    }
}


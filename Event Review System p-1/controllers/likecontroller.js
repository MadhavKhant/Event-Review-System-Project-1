//fetch all models
const Event = require("../models/eventmodel");
const Like = require("../models/likemodel");
const Comment = require("../models/commentmodel");

//controller for like
exports.likeEvent = async(req, res) => {
    try{

        //fetch data from request
        const { event, comment } = req.body;
        const userId = req.user.id;

        //make Like object
        const like = new Like({
            event, user:userId, comment
        });

        //add in database in Like array
        const savedlike = await like.save();


        //add like id in comment model
        //add id of like in current liked event
        const updatedComemnt = await Comment.findByIdAndUpdate(
                                    comment, 
                                    {$push: {like: savedlike._id}}, 
                                    {new:true})
                                    .populate("like").exec();

        //add id of like in current liked event
        const updatedEvent = await Event.findByIdAndUpdate(
                                    event, 
                                    {$push: {likes: savedlike._id}}, 
                                    {new:true})
                                    .populate("likes").exec();

        //send response
        res.status(200).json({
            success:true,
            message:"updated comment after like is here",
            comment:updatedComemnt
        })

    }
    catch(error)
    {
        return res.status(400).json({
            error:"error during likeconntroller"
        });
    }
}


//unlike the post
exports.UnlikeEvent = async (req, res) => {
    try{

        const {event, like} = req.body;
        
        //find id from the like and delete fromt that collection
        const deletedlike = await Like.findOneAndDelete({event:event, _id:like});

        //update the post collection
        const updatedEvent = await Event.findByIdAndUpdate(
                                    event, 
                                    {$pull: {likes:like}}, 
                                    {new:true});
  
        //return response
        res.json({
            success:true,
            message:"successfully removed like",
            message:"updated post after removing like is here",
            updatedEvent
        })

    }
    catch(error)
    {
        return res.status(400).json({
            error: "error during Unlike"
        });
    }
}


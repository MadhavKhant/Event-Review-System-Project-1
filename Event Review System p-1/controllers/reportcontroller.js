//fetch models
const Report = require("../models/reportmodel");
const Event = require("../models/eventmodel");
const Comment = require("../models/commentmodel");

//controllers
exports.reportController = async(req, res) => {
    try{

        //fetch data from request
        const {event, comment} = req.body;
        const userId = req.user.id;

        // Check the size of the array of given comment's report
        const userReportCount = await Report.countDocuments({ user: userId, comment: comment, event: event });
        
        //if user reported given event more than 5 times
        if (userReportCount >= 5) {
            return res.status(400).json({
                success: false,
                message: "You have already reported this event atleast 5 times",
            });
        }
        
        // If the user has not reported the post 5 times, 
        //create a new report entry
        const report = new Report({
            user: userId,
            comment,
            event,
        });
     
        //save object in database
        const savedReport = await report.save();
        
        const updatedComemnt = await Comment.findByIdAndUpdate(
                                comment, 
                                {$push: {report: savedReport._id}}, 
                                {new:true});

        //save id of report on given post
        const updatedEvent = await Event.findByIdAndUpdate(
                                    event, 
                                    {$push: {report: savedReport._id}}, 
                                    {new: true});

        //send response
        res.status(200).json({
            success: true,
            savedReport,
            message:"after reporting updated current event is here",
            updatedEvent,
            message:"Updated comment is:",
            updatedComemnt
        });

    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"error during make report",
            error:error.message
        })
    }
}
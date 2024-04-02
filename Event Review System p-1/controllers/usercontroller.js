const User = require("../models/usermodel");

exports.getAllUserData = async(req, res) => {
    try{

        const userData = await User.find();

        res.json({
            userData
        });

    }
    catch(error)
    {
        return res.status(400).json({
            error:"error during fetching all user's data"
        })
    }
}
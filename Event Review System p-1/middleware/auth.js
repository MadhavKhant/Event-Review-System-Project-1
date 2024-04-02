//fetch jwt and config as jwtsecret is in .env file
const jwt = require("jsonwebtoken");
require("dotenv").config();

//function logic
exports.auth = (req, res, next) => {
    try{

        //fetch token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        //if token not available or undefined
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
        } 
        catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }

        //for next middleware
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }
}


//for visitor
exports.isVisitor = (req, res, next) => {
    try{
            if(req.user.role !== "Visitor") {
                return res.status(401).json({
                    success:false,
                    message:'THis is a protected route for students',
                });
            }

            next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.role !== "Admin") {
            return res.status(401).json({
                success:false,
                message:'THis is a protected route for admin',
            });
        }

        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}
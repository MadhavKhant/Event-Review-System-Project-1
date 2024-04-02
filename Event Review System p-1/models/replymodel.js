//fetch mongoose
const mongoose = require("mongoose");

//define Schema
const replySchema = new mongoose.Schema({

    //on which event Admin is repling
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event"
    },

    //on which comment Admin is repling
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },

    //What is reply
    body:{
        type:String,
        require : true
    }
});

//post middleware
fileSchema.post("save", async function(doc) {
    try{
        console.log("DOC",doc)

        //transporter 
        //TODO: shift this configuration under /config folder
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        //send mail 
        let info = await transporter.sendMail({
            from:`Madhav From NIT-Allahabad`,
            to: doc.email,
            subject: "You got reply on your comment",
            // html:`<h2>Hello ...</h2> <p>Reply is: `${doc.body}`  </p>`,
        })
        
        console.log("INFO", info);


    }
    catch(error) {
        console.error(error);
    }
})

module.exports = mongoose.model("Reply", replySchema);
module.exports = File;
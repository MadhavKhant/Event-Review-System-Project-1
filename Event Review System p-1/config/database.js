const mongoose = require("mongoose");


require("dotenv").config(); 


const connectWithdb = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).
    then(console.log("db conncected successfully")).
    catch( (error) => {
        console.log("db conncetion facing issues");
        console.log(error);
        process.exit(1);
    });
};

module.exports = connectWithdb;
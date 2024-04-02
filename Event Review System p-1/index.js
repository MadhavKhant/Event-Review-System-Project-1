//fetch express ans cookieParser
const express = require("express");
const cookieParser = require("cookie-parser");

//make app usign express
const app = express();

//app use cookieParser and jason of express
app.use(cookieParser());
app.use(express.json());

//fetch PORT and load .env file in express object
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//fetch routes and mount app
const blog = require("./routes/blog");
app.use("/api/v1", blog);

//connect app with database
const connectWithdb = require("./config/database");
connectWithdb();

//start app at port number PORT
app.listen(PORT, (req, res) => {
    console.log(`App is started at ${PORT}`);
});

//test at home page
app.get("/", (req, res) => {
    res.send(`<h1>this is home get...</h1>`);
});

//fetch express and router
const express = require("express");
const router = express.Router();

//fetch controllers 
const { auth, isVisitor, isAdmin } = require("../middleware/auth");
const { login } = require("../controllers/Auth");
const { signup } = require("../controllers/Auth");
const { createEvent } = require("../controllers/eventcontroller");
const { getAllEvents } = require("../controllers/eventcontroller");
const { getAllUserData } = require("../controllers/usercontroller");
const { likeEvent } = require("../controllers/likecontroller");
const { UnlikeEvent } = require("../controllers/likecontroller");
const { createComment } = require("../controllers/commentcontroller");
const { replyOnComment } = require("../controllers/replycontroller");
const { rateEvent } = require("../controllers/ratingcontroller");
const { reportController } = require("../controllers/reportcontroller");
const { getRatingFirst } = require("../controllers/getRatingFirst");
const { getRatingSecond } = require("../controllers/getRatingSecond");
const { getRatingThird } = require("../controllers/getRatingThird");
const { Allrating } = require("../controllers/Allrating");

//Define routes

//For fetching all details
router.get("/events", auth, isAdmin, getAllEvents);
router.get("/getAllUserData", auth, isAdmin, getAllUserData);
router.get("/getRatingFirst", auth, isAdmin, getRatingFirst);
router.get("/getRatingSecond", auth, isAdmin, getRatingSecond); 
router.get("/getRatingThird", auth, isAdmin, getRatingThird); 
router.get("/Allrating", auth, isAdmin, Allrating); 

//for log in and signup newuser by Admin
router.post("/login", login);
router.post("/signup", auth, isAdmin, signup);

//Other routes
router.post("/events/create", auth, isAdmin, createEvent);
router.post("/events/replyOnComment", auth, isAdmin, replyOnComment);
router.post("/events/likeEvent", auth, likeEvent);
router.post("/events/UnlikeEvent", UnlikeEvent);
router.post("/events/createComment", auth, createComment);
router.post("/events/rateEvent", auth, rateEvent);
router.post("/events/reportEvent", auth, reportController);

//export router
module.exports = router;







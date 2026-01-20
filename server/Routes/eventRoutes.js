const express= require("express");
const router= express.Router();
const verifyToken= require("../Middlewares/verifyToken");

const {createEvent, registerUser, getEvents, getRegisteredEvents, getEventById, searchEvent, startEvent, endEvent}= require("../Controllers/eventController");

router.post("/create-event", verifyToken, createEvent);

router.put("/register/:id", verifyToken, registerUser);

router.get("/get-events",getEvents);

router.get("/registered-events", verifyToken, getRegisteredEvents);

router.get("/event/:id", getEventById);

router.get("/search-event", searchEvent);

router.put("/start-event/:id", verifyToken, startEvent);

router.put("/end-event/:id", verifyToken, endEvent);




module.exports= router;
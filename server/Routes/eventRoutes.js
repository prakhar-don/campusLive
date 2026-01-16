const express= require("express");
const router= express.Router();
const verifyToken= require("../Middlewares/verifyToken");

const {createEvent, registerUser, getEvents, getRegisteredEvents, getEventById, searchEvent, startEvent, endEvent}= require("../Controllers/eventController");

router.post("/create-event", verifyToken, createEvent);

router.put("/register-user/:eventId", verifyToken, registerUser);

router.get("/events",getEvents);

router.get("/registered-events", verifyToken, getRegisteredEvents);

router.get("/event/:eventId", getEventById);

router.get("/search-event", searchEvent);

router.put("/start-event/:eventId", verifyToken, startEvent);

router.put("/end-event/:eventId", verifyToken, endEvent);




module.exports= router;
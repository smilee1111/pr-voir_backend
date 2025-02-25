const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.post("/createEvent", eventController.createEvent);
router.get("/getAllEvent", eventController.getAllEvents);
router.get("/getEventById/:id", eventController.getEventById);
router.put("/updateEvent/:id", eventController.updateEvent);
router.delete("/deleteEvent/:id", eventController.deleteEvent);
// New route for fetching events on a specific date
router.get('/getEventsForDate', eventController.getEventsForDate);

module.exports = router;

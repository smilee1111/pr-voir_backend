const express = require("express");
const {
  createEventController,
  getAllEventsController,
  getEventsByDateController,
  updateEventController,
  deleteEventController,
} = require("../controller/eventController"); // Ensure correct path

const router = express.Router();

// Routes for event management
router.post("/", createEventController); // Create event
router.get("/", getAllEventsController); // Get all events
router.get("/events/:date", getEventsByDateController);// Get events by date
router.put("/:eventId", updateEventController); // Update event
router.delete("/:eventId", deleteEventController); // Delete event

module.exports = router;

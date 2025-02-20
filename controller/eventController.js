const Event = require("../model/event");



async function createEventController(req, res) {
  try {
    const { title, description, startDateTime, endDateTime, location } = req.body;

    if (!title || !startDateTime || !endDateTime) {
      return res.status(400).json({ error: "Title, startDateTime, and endDateTime are required" });
    }

    const newEvent = await createEvent({ title, description, startDateTime, endDateTime, location });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("❌ Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



const getAllEventsController = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getEventsByDateController = async (req, res) => {
  try {
      let { date } = req.params;

      // Ensure the date is in YYYY-MM-DD format
      const formattedDate = date.split("T")[0]; 

      const events = await getEventsByDate(formattedDate);
      
      if (events.length === 0) {
          return res.status(404).json({ message: "No events found for this date" });
      }

      res.status(200).json(events);
  } catch (error) {
      console.error("Error fetching events by date:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

const updateEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, description, startDateTime, endDateTime, location } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, startDateTime, endDateTime, location },
      { new: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    await Event.findByIdAndDelete(eventId);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createEventController,
  getAllEventsController,
  getEventsByDateController,
  updateEventController,
  deleteEventController,
};

const { Op } = require('sequelize');
const Event = require("../model/event");

async function createEvent(req, res) {
    try {
        const { title, description, location, startdatetime, enddatetime, userId } = req.body;

        // Validate required fields
        if (!title || !description || !location || !startdatetime || !enddatetime || !userId) {
            return res.status(400).json({ message: "All fields, including userId, are required" });
        }

        // Validate date format
        if (isNaN(Date.parse(startdatetime)) || isNaN(Date.parse(enddatetime))) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Ensure enddatetime is after startdatetime
        if (new Date(startdatetime) >= new Date(enddatetime)) {
            return res.status(400).json({ message: "End date must be after start date" });
        }

        // Validate userId
        if (isNaN(userId) || userId <= 0) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        // Create new event
        const newEvent = await Event.create({
            title,
            description,
            location,
            startdatetime,
            enddatetime,
            userId,
        });

        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error in createEvent:", error.message);
        res.status(500).json({ error: "Failed to create event" });
    }
}

async function getAllEvents(req, res) {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
}

// New function to get events for a specific date
async function getEventsForDate(req, res) {
    try {
        const { date } = req.query; // Expecting 'YYYY-MM-DD' format from frontend
        const selectedDate = new Date(date); // Convert to Date object

        // Validate date format
        if (isNaN(selectedDate)) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Fetch events for the selected date (matching year, month, and day)
        const events = await Event.findAll({
            where: {
                startdatetime: {
                    [Op.gte]: new Date(selectedDate.setHours(0, 0, 0, 0)), // Start of the selected day
                    [Op.lt]: new Date(selectedDate.setHours(23, 59, 59, 999)) // End of the selected day
                }
            }
        });

        res.status(200).json(events);
    } catch (error) {
        console.error("Error in getEventsForDate:", error.message);
        res.status(500).json({ error: "Failed to fetch events for the selected date" });
    }
}

async function getEventById(req, res) {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving event" });
    }
}

async function updateEvent(req, res) {
    try {
        const { title, description, location, startdatetime, enddatetime, userId } = req.body;
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        await event.update({
            title,
            description,
            location,
            startdatetime,
            enddatetime,
            userId
        });

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to update event" });
    }
}

async function deleteEvent(req, res) {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        await event.destroy();
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
}


module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getEventsForDate // New route to get events by date
    
};

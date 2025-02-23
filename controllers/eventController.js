const Event = require("../model/event");

async function createEvent(req, res) {
    try {
        const { title, description, location, startdatetime, enddatetime, userId } = req.body;

        // Validate if all fields are present
        if (!title || !description || !location || !startdatetime || !enddatetime || !userId) {
            return res.status(400).json({ message: "All fields, including userId, are required" });
        }

        // Create new event
        const newEvent = await Event.create({ 
            title, 
            description, 
            location, 
            startdatetime, 
            enddatetime,
            userId 
        });

        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
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

        // Update the event with new details
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
};

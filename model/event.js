const pool = require("../database/db"); // PostgreSQL connection

// Create an event
async function createEvent({ title, description, startDateTime, endDateTime, location }) {
  try {
    const query = `
      INSERT INTO event (title, description, startdatetime, enddatetime, location)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [title, description, startDateTime, endDateTime, location];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Database error while creating event");
  }
}

// Get all events
async function getAllEvents() {
  try {
    const query = "SELECT * FROM event ORDER BY startdatetime ASC;";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Database error while fetching events");
  }
}

// Get events for a specific date
async function getEventsByDate(date) {
  try {
    const query = `
      SELECT * FROM event
      WHERE DATE(startdatetime) = $1
      ORDER BY startdatetime ASC;
    `;
    const result = await pool.query(query, [date]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching events by date:", error);
    throw new Error("Database error while fetching events by date");
  }
}

// Update an event
async function updateEvent(eventId, { title, description, startDateTime, endDateTime, location }) {
  try {
    const query = `
      UPDATE event
      SET title = $1, description = $2, startdatetime = $3, enddatetime = $4, location = $5
      WHERE eventid = $6
      RETURNING *;
    `;
    const values = [title, description, startDateTime, endDateTime, location, eventId];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Database error while updating event");
  }
}

// Delete an event
async function deleteEvent(eventId) {
  try {
    const query = "DELETE FROM event WHERE eventid = $1 RETURNING *;";
    const result = await pool.query(query, [eventId]);
    if (result.rowCount === 0) {
      throw new Error("Event not found");
    }
    return { message: "Event deleted successfully" };
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Database error while deleting event");
  }
}

module.exports = { createEvent, getAllEvents, getEventsByDate, updateEvent, deleteEvent };

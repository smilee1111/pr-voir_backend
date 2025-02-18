// model/task.js
const pool = require("../database/db"); // your pg Pool

/**
 * Create a new task in 'DailyTask' table.
 * @param {Object} data 
 * @param {string} data.title
 * @param {string} data.description
 * @param {string} data.dueTime
 * @param {string} data.priority
 * @returns {Promise<Object>} The created task record
 */
// model/task.js
async function createTask({ title, description, dueTime, priority, status }) {
  const query = `
    INSERT INTO dailytask(title, description, duetime, status, priority)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [title, description, dueTime, status, priority]; // Add status here
  const result = await pool.query(query, values);
  return result.rows[0];
}

/**
 * Get all tasks.
 * @returns {Promise<Array>}
 */
async function getAllTasks() {
  const query = `
    SELECT * FROM dailytask
    ORDER BY taskid ASC;
  `;
  const result = await pool.query(query);
  return result.rows;
}

/**
 * Get a single task by ID.
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
async function getTaskById(id) {
  const query = `
    SELECT * FROM dailytask
    WHERE taskid = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

/**
 * Update a task.
 * @param {number} id 
 * @param {Object} data 
 * @param {string} data.title
 * @param {string} data.description
 * @param {string} data.dueTime
 * @param {boolean} data.status
 * @param {string} data.priority
 * @returns {Promise<Object|null>}
 */
async function updateTask(id, { title, description, dueTime, status, priority }) {
  const query = `
    UPDATE dailytask
    SET title = $1,
        description= $2,
        duetime = $3,
        status = $4,
        priority = $5
    WHERE taskid = $6
    RETURNING *;
  `;
  const values = [title, description, dueTime, status, priority, id];
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

/**
 * Delete a task by ID.
 * @param {number} id 
 * @returns {Promise<Object>}
 */
async function deleteTask(id) {
  const query = `
    DELETE FROM dailytask
    WHERE taskid = $1;
  `;
  await pool.query(query, [id]);
  return { message: "Task deleted successfully" };
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

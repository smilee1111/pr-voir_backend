// model/user.js
const pool = require("../database/db");

/**
 * Insert a new user into the database.
 */
async function createUser({ username, email, phonenumber, password }) {
  const query = `
    INSERT INTO users (username, email, phonenumber, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, email, phonenumber, password;
  `;
  const values = [username, email, phonenumber, password];
  const result = await pool.query(query, values);
  return result.rows[0]; // return newly created user
}

/**
 * Find a user by email.
 */
async function findUserByEmail(email) {
  const query = `
    SELECT * FROM users WHERE email = $1
  `;
  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
}

/**
 * Find a user by username.
 */
async function findUserByUsername(username) {
  const query = `
    SELECT * FROM users WHERE username = $1
  `;
  const result = await pool.query(query, [username]);
  return result.rows[0] || null;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
};

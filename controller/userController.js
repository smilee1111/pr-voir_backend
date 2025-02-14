const pool = require('../database/db'); // Adjust the path if necessary
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE username = $1";
    const userResult = await pool.query(userQuery, [username]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "your_secret_key", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const registerUser = async (req, res) => {
  try {
    const { username, email, phonenumber, password } = req.body;

    if (!username || !email || !phonenumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Received Data:", req.body); // ✅ Log incoming request data

    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUser = await pool.query(
      'INSERT INTO users(username, email, phonenumber, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email',
      [username, email, phonenumber, hashedPassword]
    );

    console.log("New User Created:", newUser.rows[0]); // ✅ Log new user data
    res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });

  } catch (error) {
    console.error("❌ Error in registerUser:", error.stack); // Print full error stack
    res.status(500).json({ message: "Server error", error: error.message });

  }
};

module.exports = { registerUser, loginUser };


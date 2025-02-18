// controllers/userController.js
const { createUser, findUserByEmail, findUserByUsername } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /users/register
const registerUser = async (req, res) => {
  try {
    const { username, email, phonenumber, password } = req.body;

    if (!username || !email || !phonenumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await createUser({
      username,
      email,
      phonenumber,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        phonenumber: newUser.phonenumber,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /users/login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");  // Ensure correct path
const taskRoutes = require("./routes/taskRoutes");
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for frontend requests

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

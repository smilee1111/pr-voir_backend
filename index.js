const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");  // Ensure correct path

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for frontend requests

app.use("/api/users", userRoutes); // This ensures your frontend request matches the route

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

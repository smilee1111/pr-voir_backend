const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");  

const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const eventRoute = require("./routes/eventRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define Routes
app.use("/users", userRoute);
app.use("/task", taskRoute);
app.use("/event", eventRoute);

// 404 Not Found Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server Running on  ...................... PORT ${PORT}`);
});
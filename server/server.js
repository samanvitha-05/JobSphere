const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Home Route
app.get("/", (req, res) => {
    res.send("JobSphere Backend is Running...");
});

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
console.log("Registering job routes...");
app.use("/api/jobs", jobRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
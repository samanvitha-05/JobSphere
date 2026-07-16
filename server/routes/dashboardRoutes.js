const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getDashboardStats
} = require("../controllers/dashboardController");

router.get("/", protect, getDashboardStats);

const {
    recruiterDashboard
} = require("../controllers/dashboardController");

router.get("/recruiter", protect, recruiterDashboard);

module.exports = router;
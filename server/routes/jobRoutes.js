const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createJob,
    getAllJobs,
    getJobById
} = require("../controllers/jobController");

// Get all jobs
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Create job
router.post("/create", protect, createJob);

module.exports = router;
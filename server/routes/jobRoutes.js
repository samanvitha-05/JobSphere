const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

console.log("deleteJob =", deleteJob);

// Public Routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Protected Routes
router.post("/create", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

console.log("✅ PUT Route Registered");
module.exports = router;
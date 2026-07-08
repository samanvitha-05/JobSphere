const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
} = require("../controllers/jobController");

console.log("deleteJob =", deleteJob);
console.log("getMyJobs =", getMyJobs);

// Protected Routes
router.post("/create", protect, createJob);

// Public Routes
router.get("/", getAllJobs);
router.get("/my/jobs", protect, getMyJobs);
router.get("/:id", getJobById);


router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

console.log("✅ PUT Route Registered");
module.exports = router;
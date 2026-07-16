const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createJob,
    getAllJobs,
    searchJobs,
    filterJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
} = require("../controllers/jobController");

const jobController = require("../controllers/jobController");

console.log(jobController);


console.log("deleteJob =", deleteJob);
console.log("getMyJobs =", getMyJobs);

console.log({
    createJob,
    getAllJobs,
    searchJobs,
    filterJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
});

// Protected Routes
router.post("/create", protect, createJob);

// Public Routes
router.get("/", getAllJobs);
router.get("/my-jobs", protect, getMyJobs);
router.get("/search", searchJobs);
router.get("/filter", filterJobs);

router.get("/:id", getJobById);


router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

console.log("✅ PUT Route Registered");
module.exports = router;
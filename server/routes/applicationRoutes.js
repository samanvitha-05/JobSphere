const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    applyJob,
    getMyApplications
} = require("../controllers/applicationController");

router.post("/apply/:jobId", protect, applyJob);

router.get("/my", protect, getMyApplications);

module.exports = router;
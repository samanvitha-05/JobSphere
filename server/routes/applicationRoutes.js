const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    applyJob,
    getMyApplications,
    getApplicantsForJob
} = require("../controllers/applicationController");

router.post("/apply/:jobId", protect, applyJob);

router.get("/my", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicantsForJob);

module.exports = router;
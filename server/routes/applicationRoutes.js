console.log("✅ Application Routes Loaded");
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    applyJob,
    getMyApplications,
    getApplicantsForJob,
    updateApplicationStatus
} = require("../controllers/applicationController");

router.post("/apply/:jobId", protect, applyJob);

router.get("/my", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicantsForJob);
router.put("/status/:applicationId", protect, updateApplicationStatus);

console.log(router.stack.map(layer => ({
    path: layer.route?.path,
    methods: layer.route?.methods
})));

module.exports = router;
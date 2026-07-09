console.log("✅ Application Routes Loaded");
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    applyJob,
    getMyApplications,
    getApplicantsForJob,
    updateApplicationStatus,
    uploadResume
} = require("../controllers/applicationController");

router.post("/apply/:jobId", protect, applyJob);

router.get("/my", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicantsForJob);
router.put("/status/:applicationId", protect, updateApplicationStatus);
router.post(
    "/upload/:applicationId",
    protect,
    upload.single("resume"),
    uploadResume
);

console.log(router.stack.map(layer => ({
    path: layer.route?.path,
    methods: layer.route?.methods
})));

module.exports = router;
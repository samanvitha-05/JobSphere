const SavedJob = require("../models/SavedJob");

// ======================
// Save Job
// ======================
const saveJob = async (req, res) => {
    try {

        const existing = await SavedJob.findOne({
            student: req.user.id,
            job: req.params.jobId
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Job already saved"
            });
        }

        const savedJob = await SavedJob.create({
            student: req.user.id,
            job: req.params.jobId
        });

        res.status(201).json({
            success: true,
            message: "Job saved successfully",
            savedJob
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================
// Get Saved Jobs
// ======================
const getSavedJobs = async (req, res) => {
    try {

        const jobs = await SavedJob.find({
            student: req.user.id
        }).populate("job");

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================
// Remove Saved Job
// ======================
const removeSavedJob = async (req, res) => {
    try {

        await SavedJob.findOneAndDelete({
            student: req.user.id,
            job: req.params.jobId
        });

        res.status(200).json({
            success: true,
            message: "Saved job removed successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    saveJob,
    getSavedJobs,
    removeSavedJob
};
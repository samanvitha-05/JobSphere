const Job = require("../models/Job");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJob");

const getDashboardStats = async (req, res) => {
    try {

        const totalJobs = await Job.countDocuments();

        const myJobs = await Job.countDocuments({
            recruiter: req.user.id
        });

        const myApplications = await Application.countDocuments({
            student: req.user.id
        });

        const savedJobs = await SavedJob.countDocuments({
            student: req.user.id
        });

        res.status(200).json({
            success: true,
            stats: {
                totalJobs,
                myJobs,
                myApplications,
                savedJobs
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getDashboardStats
};
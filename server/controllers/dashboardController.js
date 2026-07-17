const Job = require("../models/Job");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJob");

const getDashboardStats = async (req, res) => {

    try {

        const totalJobs = await Job.countDocuments();

        const totalStudents = await Application.db
            .model("User")
            .countDocuments({ role: "student" });

        const totalRecruiters = await Application.db
            .model("User")
            .countDocuments({ role: "recruiter" });

        const totalApplications = await Application.countDocuments();

        res.status(200).json({

            success: true,

            stats: {

                totalJobs,
                totalStudents,
                totalRecruiters,
                totalApplications

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const recruiterDashboard = async (req, res) => {
    try {

        const jobs = await Job.find({
            recruiter: req.user.id
        });

        const jobIds = jobs.map(job => job._id);

        const totalApplications = await Application.countDocuments({
            job: { $in: jobIds }
        });

        res.status(200).json({
            success: true,
            stats: {
                jobs: jobs.length,
                activeJobs: jobs.length,
                totalApplications
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
    getDashboardStats,
    recruiterDashboard
};
const Job = require("../models/Job");

// ======================
// Create Job
// ======================
const createJob = async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            salary,
            jobType,
            experience,
            description,
            skills
        } = req.body;

        const job = await Job.create({
            title,
            company,
            location,
            salary,
            jobType,
            experience,
            description,
            skills,
            recruiter: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Job Created Successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ======================
// Get All Jobs
// ======================
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("recruiter", "name email");

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
// Get Job By ID
// ======================
const getJobById = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id)
            .populate("recruiter", "name email");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById
};
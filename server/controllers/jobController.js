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
// Update Job
const updateJob = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Only recruiter who created the job can update it
        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this job"
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job: updatedJob
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Job
const deleteJob = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Only recruiter who created the job can delete it
        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this job"
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================
// Get My Posted Jobs
// ======================
const getMyJobs = async (req, res) => {
    try {

        const jobs = await Job.find({
            recruiter: req.user.id
        });

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

console.log("Inside jobController:");
console.log({
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
});

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
};
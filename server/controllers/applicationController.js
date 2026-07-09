const Application = require("../models/Application");
const Job = require("../models/Job");

// ======================
// Apply for Job
// ======================
const applyJob = async (req, res) => {
    try {

        const { jobId } = req.params;

        // Check if job exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Check if already applied
        const existingApplication = await Application.findOne({
            student: req.user.id,
            job: jobId
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        // Create application
        const application = await Application.create({
            student: req.user.id,
            job: jobId
        });

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================
// My Applications
// ======================
const getMyApplications = async (req, res) => {
    try {

        const applications = await Application.find({
            student: req.user.id
        })
        .populate("job")
        .populate("student", "name email");

        res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================
// Get Applicants for a Job
// ======================
const getApplicantsForJob = async (req, res) => {
    try {

        const applications = await Application.find({
            job: req.params.jobId
        })
        .populate("student", "name email")
        .populate("job", "title company");

        res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================
// Update Application Status
// ======================
const updateApplicationStatus = async (req, res) => {
    console.log("✅ updateApplicationStatus called");

    try {
        
        const { status } = req.body;

        const application = await Application.findById(req.params.applicationId);

        if (!application) {

            return res.status(404).json({
                success: false,
                message: "Application not found"
            });

        }

        application.status = status;

        await application.save();

        res.status(200).json({

            success: true,
            message: "Application status updated successfully",
            application

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
    applyJob,
    getMyApplications,
    getApplicantsForJob,
    updateApplicationStatus
};
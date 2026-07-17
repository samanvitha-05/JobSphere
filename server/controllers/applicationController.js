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
        .populate(
            "student",
            "name email phone resume"
        )
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
        console.log("Received status:", status);

        const application = await Application.findById(req.params.applicationId);

        console.log("Application found:", application);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        application.status = status;

        console.log("Before save:", application);

        await application.save();

        const Notification = require("../models/Notification");
        await Notification.create({
            user: application.student,
            title: "Application Status Updated",
            message: `Your application has been ${status}.`
        });

        console.log("After save");

        res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application
        });

    } catch (error) {

        console.log("FULL ERROR:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================
// Upload Resume
// ======================
const uploadResume = async (req, res) => {

    try {

        const application = await Application.findById(req.params.applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume"
            });
        }

        application.resume = req.file.path;

        await application.save();

        res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resume: req.file.path
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
    updateApplicationStatus,
    uploadResume
};
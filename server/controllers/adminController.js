const User = require("../models/User");
const Job = require("../models/Job");
const Company = require("../models/Company");
const Application = require("../models/Application");

const getAdminStats = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalCompanies = await Company.countDocuments();
        const totalApplications = await Application.countDocuments();

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalJobs,
                totalCompanies,
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
    getAdminStats
};
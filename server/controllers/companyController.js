const Company = require("../models/Company");

// Create Company
const createCompany = async (req, res) => {

    try {

        const company = await Company.create({

            ...req.body,
            owner: req.user.id

        });

        res.status(201).json({

            success: true,
            company

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Get All Companies
const getCompanies = async (req, res) => {

    try {

        const companies = await Company.find();

        res.status(200).json({

            success: true,
            count: companies.length,
            companies

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Get Company By ID
const getCompany = async (req, res) => {

    try {

        const company = await Company.findById(req.params.id);

        if (!company) {

            return res.status(404).json({

                success: false,
                message: "Company not found"

            });

        }

        res.status(200).json({

            success: true,
            company

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Update Company
const updateCompany = async (req, res) => {

    try {

        const company = await Company.findByIdAndUpdate(

            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }

        );

        res.status(200).json({

            success: true,
            company

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Delete Company
const deleteCompany = async (req, res) => {

    try {

        await Company.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,
            message: "Company deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    createCompany,
    getCompanies,
    getCompany,
    updateCompany,
    deleteCompany

};
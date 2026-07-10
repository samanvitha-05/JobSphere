const User = require("../models/User");

// Get My Profile
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Profile
const updateProfile = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(

            req.user.id,
            req.body,
            {
                new: true,
                runValidators: true
            }

        ).select("-password");

        res.status(200).json({

            success: true,
            message: "Profile updated successfully",
            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    getProfile,
    updateProfile

};
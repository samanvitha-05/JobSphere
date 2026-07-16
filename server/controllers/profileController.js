const User = require("../models/User");

// Get My Profile
const getProfile = async (req, res) => {

    try {

        console.log("========== UPDATE PROFILE ==========");
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);
        console.log("content-type:", req.headers["content-type"]);
        console.log("====================================");
        
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
// Update Profile

const updateProfile = async (req, res) => {

    try {

        console.log("req.body =", req.body);
        console.log("req.file =", req.file);
        console.log("Content-Type =", req.headers["content-type"]);

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        const body = req.body || {};
        
        user.name = body.name || user.name;
        user.phone = body.phone || user.phone;
        user.bio = body.bio || user.bio;
           
        if (body.skills) {
            
            if (Array.isArray(body.skills)) {
                user.skills = body.skills;
            } else {
                user.skills = [body.skills];
            }

        }

        if (req.body.skills) {

            if (Array.isArray(req.body.skills)) {

                user.skills = req.body.skills;

            } else {

                user.skills = [req.body.skills];

            }

        }

        // Save uploaded resume path
        if (req.file) {

            user.resume = `/uploads/${req.file.filename}`;

        }

        await user.save();

        const updatedUser = await User.findById(req.user.id).select("-password");

        res.status(200).json({

            success: true,
            message: "Profile updated successfully",
            user: updatedUser

        });

    } catch (error) {

    console.error(error);

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
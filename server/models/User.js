const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["student", "recruiter", "admin"],
        default: "student",
    },

    phone: {
        type: String,
        default: ""
    },
    
    bio: {
        type: String,
        default: ""
    },

    skills: [{
        type: String
    }],
    
    profilePic: {
        type: String,
        default: ""
    },

    skills: {
        type: [String],
        default: [],
    },

    resume: {
        type: String,
        default: "",
    },

    profilePhoto: {
        type: String,
        default: "",
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
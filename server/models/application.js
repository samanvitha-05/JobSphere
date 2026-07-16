const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    status: {
        type: String,
        enum: ["Applied", "Accepted", "Rejected"],
        default: "Applied"
    },

    resume: {
    type: String,
    default: ""
},

},
{
    timestamps: true
});

console.log(
    "Application enum:",
    applicationSchema.path("status").enumValues
);

module.exports = mongoose.model("Application", applicationSchema);
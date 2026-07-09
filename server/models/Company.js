const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    website: String,

    location: String,

    description: String,

    logo: String,

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Company", companySchema);
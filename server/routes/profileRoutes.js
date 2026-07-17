const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile
} = require("../controllers/profileController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {

        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }

    }
});

router.get("/", protect, getProfile);

router.put(
    "/",
    protect,
    upload.single("resume"),
    updateProfile
);



module.exports = router;
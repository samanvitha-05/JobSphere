const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination(req, file, cb) {
        console.log("📁 Destination middleware called");
        cb(null, "uploads/");
    },

    filename(req, file, cb) {
        console.log("📄 File received:", file.originalname);
        cb(null, Date.now() + path.extname(file.originalname));
    }

});

const upload = multer({ storage });

module.exports = upload;
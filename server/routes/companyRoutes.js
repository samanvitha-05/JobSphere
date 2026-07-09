const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    createCompany,
    getCompanies,
    getCompany,
    updateCompany,
    deleteCompany

} = require("../controllers/companyController");

router.post("/", protect, createCompany);

router.get("/", getCompanies);

router.get("/:id", getCompany);

router.put("/:id", protect, updateCompany);

router.delete("/:id", protect, deleteCompany);

module.exports = router;
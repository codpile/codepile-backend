const express = require("express");
const { addStudent } = require("../controllers/studentController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/add-student", protect, addStudent);

module.exports = router;

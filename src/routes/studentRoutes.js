const express = require("express");
const { addStudent, getStudent } = require("../controllers/studentController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/add-student", protect, addStudent);
router.get("/get-student/:studentId", protect, getStudent);

module.exports = router;

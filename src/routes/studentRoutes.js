const express = require("express");
const {
  addStudent,
  getStudent,
  updateStudent,
} = require("../controllers/studentController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/add-student", protect, addStudent);
router.get("/get-student/:studentId", protect, getStudent);
router.patch("/update-student/:studentId", protect, updateStudent);

module.exports = router;

const express = require("express");
const {
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/add-student", protect, addStudent);
router.get("/get-student/:studentId", protect, getStudent);
router.patch("/update-student/:studentId", protect, updateStudent);
router.delete("/delete-student/:studentId", protect, deleteStudent);

module.exports = router;

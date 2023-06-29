const express = require("express");
const {
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getStudentsByUser,
} = require("../controllers/studentController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/add-student", protect, addStudent);
router.get("/get-student/:studentId", protect, getStudent);
router.get("/get-students-by-user", protect, getStudentsByUser);
router.get("/get-all-students", protect, getAllStudents);
router.patch("/update-student/:studentId", protect, updateStudent);
router.delete("/delete-student/:studentId", protect, deleteStudent);

module.exports = router;

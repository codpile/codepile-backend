const express = require("express");
const {
  addSubject,
  getAllSubjects,
} = require("../controllers/subjectController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/add-subject", protect, addSubject);
router.get("/get-all-subjects", protect, getAllSubjects);

module.exports = router;

const Subject = require("../models/subject");
const AppError = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");

const addSubject = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const subjectName = req.body.subjectName;
  if (!subjectName) {
    return next(new AppError("Please provide subject name", 400));
  }
  const newSubject = await Subject.create(subjectName);

  res.status(201).json({
    status: "success",
    data: newSubject,
    message: "Student added successfully",
  });
});

const getAllSubjects = asyncHandler(async (req, res, next) => {
  const subjects = await Subject.findAll();
  if (!subjects) return next(new AppError("No subject is found!", 404));
  res.status(201).json({
    status: "success",
    data: subjects,
    message: "subject fetched successfully",
  });
});

module.exports = { addSubject, getAllSubjects };

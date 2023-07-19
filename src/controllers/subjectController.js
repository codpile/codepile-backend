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

const updateSubject = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const subjectId = req.params.subjectId;
  const subjectName = req.body.subjectName;
  if (!subjectId) {
    return next(new AppError("Please provide subjectId", 400));
  }
  if (!subjectName) {
    return next(new AppError("Please provide subject name", 400));
  }
  const updatedSubject = await Subject.update(subjectId, req.body);
  res.status(200).json({
    status: "success",
    message: "subject updated successfully",
    data: updatedSubject,
  });
});

module.exports = { addSubject, getAllSubjects, updateSubject };

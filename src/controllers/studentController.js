const Student = require("../models/student");
const AppError = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");

const addStudent = asyncHandler(async (req, res, next) => {
  const { addedById, firstName, LastName, gender, age, district, region } =
    req.body;
  if (!addedById) return next(new AppError("Please provide a user id", 400));
  if (!firstName || !LastName || !gender || !age || !district || !region) {
    return next(new AppError("Please fill out all fields", 400));
  }
  const newStudent = await Student.create(req.body);

  res.status(201).json({
    status: "success",
    data: newStudent,
  });
});

const getStudent = asyncHandler(async (req, res, next) => {
  const studentId = req.params.studentId;

  if (!studentId) return next(new AppError("Please provide a student id", 400));
  const student = await Student.findById(studentId);
  res.status(200).json({
    status: "success",
    data: student,
  });
});

const updateStudent = asyncHandler(async (req, res, next) => {
  const studentId = req.params.studentId;
  const { firstName, LastName, gender, age, district, region } = req.body;

  if (!studentId) return next(new AppError("Please provide a student id", 400));
  if (!firstName || !LastName || !gender || !age || !district || !region) {
    return next(new AppError("Please fill out all fields", 400));
  }
  const updatedStudent = await Student.update(studentId, req.body);
  res.status(200).json({
    status: "success",
    data: updatedStudent,
  });
});

module.exports = { addStudent, getStudent, updateStudent };

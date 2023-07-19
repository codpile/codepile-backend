const Student = require("../models/student");
const AppError = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");

const addStudent = asyncHandler(async (req, res, next) => {
  const { addedById, firstName, lastName, gender, age, district, region } =
    req.body;
  if (!addedById) return next(new AppError("Please provide a user id", 400));
  if (!firstName || !lastName || !gender || !age || !district || !region) {
    return next(new AppError("Please fill out all fields", 400));
  }
  req.body.age = parseInt(req.body.age);

  const newStudent = await Student.create(req.body);

  res.status(201).json({
    status: "success",
    data: newStudent,
    message: "Student added successfully",
  });
});

const getStudent = asyncHandler(async (req, res, next) => {
  const studentId = req.params.studentId;

  if (!studentId) return next(new AppError("Please provide a student id", 400));
  const student = await Student.findById(studentId);
  if (!student) {
    return next(new AppError(`No student with id ${studentId} is found!`, 404));
  }
  res.status(200).json({
    status: "success",
    data: student,
  });
});

const getStudentsByUser = asyncHandler(async (req, res, next) => {
  const addedById = req.params.addedById;
  if (!addedById) return next(new AppError("Please provide user id", 400));

  const students = await Student.findByAddedBy(addedById);
  res.status(200).json({
    status: "success",
    data: students,
  });
});

const getAllStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.findAll();
  res.status(200).json({
    status: "success",
    data: students,
  });
});

const updateStudent = asyncHandler(async (req, res, next) => {
  const studentId = req.params.studentId;
  const { firstName, lastName, gender, age, district, region } = req.body;

  if (!studentId) return next(new AppError("Please provide a student id", 400));
  if (!firstName || !lastName || !gender || !age || !district || !region) {
    return next(new AppError("Please fill out all fields", 400));
  }
  const updatedStudent = await Student.update(studentId, req.body);
  res.status(200).json({
    status: "success",
    data: updatedStudent,
    message: "Student updated successfully",
  });
});

const deleteStudent = asyncHandler(async (req, res, next) => {
  const studentId = req.params.studentId;
  if (!studentId) return next(new AppError("Please provide a student id", 400));
  await Student.delete(studentId);

  res.status(200).json({
    status: "success",
    message: "Student deleted successfully",
  });
});

module.exports = {
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getStudentsByUser,
};

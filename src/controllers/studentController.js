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

module.exports = { addStudent };

const Prediction = require("../models/prediction");
const AppError = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");

const remark = `With an excellent attendance of 90%, it's notable that your physics exam score was 67%. To improve, consider seeking help, studying concepts thoroughly, and utilizing study resources such as textbooks, online tutorials, and guidance from your teacher. Strive for better results in future exams.`;

const makePrediction = asyncHandler(async (req, res, next) => {
  const { studentId, subjectId, predictedById, previousExamMark, attendance } =
    req.body;
  if (!studentId) {
    return next(new AppError("Please provide a student id!", 400));
  }
  if (!predictedById) {
    return next(new AppError("Please provide a user id!", 400));
  }
  if (!subjectId) return next(new AppError("Please provide subject id!"));
  if (!previousExamMark || !attendance) {
    return next(new AppError("Please fill out all fields", 400));
  }
  req.body.previousExamMark = parseInt(req.body.previousExamMark);
  req.body.attendance = parseInt(req.body.attendance);
  req.body.predictedMark = 73;
  req.body.remark = remark;

  const newPrediction = await Prediction.create(req.body);

  res.status(201).json({
    status: "success",
    data: newPrediction,
    message: "prediction made successfully",
  });
});

const getPredictionsByStudent = asyncHandler(async (req, res, next) => {
  const studentId = req.params.studentId;
  if (!studentId) return next(new AppError("Please a student id!", 400));
  const predictions = await Prediction.findByStudent(studentId);
  if (!predictions[0]) {
    return next(new AppError("No predictions are found for this student", 404));
  }
  res.status(201).json({
    status: "success",
    data: predictions,
    message: "fetched  successfully",
  });
});

const getPredictionsByPredictedBy = asyncHandler(async (req, res, next) => {
  const predictedById = req.params.predictedById;
  if (!predictedById) return next(new AppError("Please a student id!", 400));
  const predictions = await Prediction.findByPredictedBy(predictedById);

  if (!predictions[0]) {
    return next(new AppError("No predictions are found for this user!", 404));
  }
  res.status(201).json({
    status: "success",
    data: predictions,
    message: "fetched  successfully",
  });
});

module.exports = {
  makePrediction,
  getPredictionsByStudent,
  getPredictionsByPredictedBy,
};

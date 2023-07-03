const Prediction = require("../models/prediction");
const AppError = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");

const remark = `I must commend you on your consistent attendance
   throughout the academic year, with an impressive
    90% class attendance! Your commitment to being present
     and engaged in the learning process is commendable. 
     However, I have noticed that your performance in the physics 
     exam was not reflective of your attendance, with a score of 67%. 
     To improve your results, I recommend dedicating extra time to review
      and practice physics concepts, utilizing resources like textbooks, online 
      tutorials, and seeking clarification from your teacher. By bridging this gap, 
      I am confident you will excel in future exams. Keep up the good work and never
   hesitate to ask for assistance when needed!`;

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
  req.body.predictedMark = 76;
  req.body.remark = remark;

  // TODO: perform actual prediction here
  const newPrediction = await Prediction.create(req.body);

  res.status(201).json({
    status: "success",
    data: newPrediction,
    message: "Student added successfully",
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

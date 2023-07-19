const Prediction = require("../models/prediction");
const Student = require("../models/student");
const Subject = require("../models/subject");
const AppError = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const makePrediction = asyncHandler(async (req, res, next) => {
  const { studentId, subjectId, predictedById, attendance } = req.body;
  if (!studentId) {
    return next(new AppError("Please provide a student id!", 400));
  }
  if (!predictedById) {
    return next(new AppError("Please provide a user id!", 400));
  }
  if (!subjectId) return next(new AppError("Please provide subject id!"));
  if (!attendance) {
    return next(new AppError("Please provide student's attendance", 400));
  }
  req.body.previousExamMark = 1;
  req.body.attendance = parseInt(req.body.attendance);
  req.body.remark = "good";

  const student = await Student.findById(studentId);
  const subject = await Subject.findById(subjectId);
  console.log("student", student);
  console.log("subject", subject);

  console.log("About send request to flask server");
  const response = await axios.post(
    `${process.env.CODEPILE_MODEL}/api/v1/predict`,
    {
      age: student.age,
      gender: student.gender,
      district: student.district,
      region: student.region,
      subject: subject.subjectName,
      attendance: parseInt(req.body.attendance),
    }
  );
  console.log(response.data);
  req.body.predictedMark = response.data.predicted_mark;

  const newPrediction = await Prediction.create(req.body);
  console.log("newPrediction");
  console.log(newPrediction);

  res.status(201).json({
    status: "success",
    data: response.data,
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

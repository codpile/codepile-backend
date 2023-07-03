const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Prediction = {};
const prediction = prisma.prediction;

Prediction.create = async (predictionObj) => {
  return await prediction.create({
    data: predictionObj,
    select: {
      predictionIndex: true,
      predictionId: true,
      predictedById: true,
      studentId: true,
      previousExamMark: true,
      predictedMark: true,
      remark: true,
      createdAt: true,
      updateAt: true,
    },
  });
};

Prediction.findById = async (predictionId) => {
  return await prediction.findFirst({
    where: {
      predictionId: { equals: predictionId },
    },
  });
};

Prediction.findByStudent = async (studentId) => {
  return await prediction.findMany({
    where: {
      studentId: { equals: studentId },
    },
  });
};

Prediction.findByPredictedBy = async (predictedById) => {
  return await prediction.findMany({
    where: {
      predictedById: { equals: predictedById },
    },
  });
};

Prediction.findAll = async () => {
  return await prediction.findMany({});
};

Prediction.delete = async (predictionId) => {
  return await prediction.delete({
    where: {
      predictionId: predictionId,
    },
  });
};

Prediction.deleteByStudent = async (studentId) => {
  return await prediction.delete({
    where: {
      studentId: studentId,
    },
  });
};

Prediction.deleteByPredictedBy = async (predictedById) => {
  return await prediction.delete({
    where: {
      predictedById: predictedById,
    },
  });
};

module.exports = Prediction;

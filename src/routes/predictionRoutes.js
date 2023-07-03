const express = require("express");
const {
  makePrediction,
  getPredictionsByStudent,
  getPredictionsByPredictedBy,
} = require("../controllers/predictionController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/make-prediction", protect, makePrediction);
router.get(
  "/get-predictions-by-student/:studentId",
  protect,
  getPredictionsByStudent
);
router.get(
  "/get-predictions-by-predictedBy/:predictedById",
  protect,
  getPredictionsByPredictedBy
);

module.exports = router;

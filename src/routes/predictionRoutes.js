const express = require("express");
const {
  makePrediction,
  getPredictionsByStudent,
} = require("../controllers/predictionController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/make-prediction", protect, makePrediction);
router.get(
  "/get-predictions-by-student/:studentId",
  protect,
  getPredictionsByStudent
);

module.exports = router;

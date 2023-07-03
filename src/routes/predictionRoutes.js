const express = require("express");
const { makePrediction } = require("../controllers/predictionController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/make-prediction", protect, makePrediction);

module.exports = router;

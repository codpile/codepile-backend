const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  uploadPhoto,
  upload,
} = require("../controllers/userController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/update-password", protect, updatePassword);
router.post("/update-profile", protect, updateProfile);
router.post("/upload-photo/:userId", protect, upload.none(), uploadPhoto);

// TODO: forgot password, update password

module.exports = router;

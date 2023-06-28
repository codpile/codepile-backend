const User = require("../models/user");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { firebaseApp } = require("../config/firebaseConfig");
const { getStorage, deleteObject } = require("firebase/storage");
const { ref, uploadString, getDownloadURL } = require("firebase/storage");
const path = require("path");
const AppError = require("../utils/error");
const Email = require("../utils/email");
const { asyncHandler } = require("../utils/asyncHandler");
const { createHash } = require("crypto");
require("dotenv").config();

const assignToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRETE_TOKEN);
};

const createSendToken = (user, statusCode, res) => {
  const token = assignToken(user.userId);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

const signup = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findUserByEmail(email);

  if (user) return next(new AppError("Email already exists", 400));
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

const login = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findUserByEmail(email);
  if (!user) return next(new AppError("Email does not exist", 403));
  if (!(await User.comparePasswords(password, user.password))) {
    return next(new AppError("Incorrect password", 403));
  }
  const userObj = {
    userIndex: user.userIndex,
    userId: user.userId,
    userName: user.userName,
    email: user.email,
    imageUrl: user.imageUrl,
  };
  createSendToken(userObj, 200, res);
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  console.log("email");
  console.log(email);
  if (!email) return next(new AppError("Please fill out all fields", 400));
  const user = await User.findUserByEmail(email);

  if (!user) return next(new AppError("Supplied email is invalid", 403));

  const resetToken = User.createPasswordResetToken();
  await User.savePasswordResetToken(user.userId, resetToken);

  const resetURL = `${req.protocol}://letschat-frontend.netlify.app/reset-password/${resetToken}`;
  // const resetURL = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;
  const subject = "Reset Password";

  await new Email(email, subject).sendPasswordReset(resetURL, user.userName);

  res.status(200).json({ status: "success", message: "Token sent to email" });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const token = req.params.token;
  if (!token) return next(new AppError("Please a reset token"));
  const hashedToken = createHash("sha256").update(token).digest("hex");

  const user = await User.findByToken(hashedToken);

  if (!user) return next(new AppError("Supplied token is invalid"));

  if (User.passwordResetExpired(user.passwordResetExpires)) {
    return next(new AppError("Token is expired", 400));
  }
  const password = req.body.password;
  await User.updatePassword(user.userId, password);

  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await User.updatePasswordResetToken(user);

  const userObj = {
    userIndex: user.userIndex,
    userId: user.userId,
    userName: user.userName,
    email: user.email,
    imageUrl: user.imageUrl,
  };
  createSendToken(userObj, 200, res);
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const userId = req.body.userId;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const user = await User.findUserById(userId);

  if (!(await User.comparePasswords(currentPassword, user.password))) {
    return next(new AppError("Incorrect current password", 403));
  }
  if (await User.comparePasswords(newPassword, user.password)) {
    return next(new AppError("New password same as current password", 403));
  }
  await User.updatePassword(userId, newPassword);
  res.status(200).json({ status: "success" });
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const userId = req.body.userId;
  const userName = req.body.userName;
  const email = req.body.email;
  if (!userId || !userName || !email) {
    return next(new AppError("Please fill out all fields", 400));
  }
  let user = await User.findUserById(userId);
  if (user.email !== email) {
    user = await User.findUserByEmail(email);
    if (user) {
      return next(
        new AppError("Can't update to already registered email", 400)
      );
    }
  }
  user = await User.updateProfile(userId, userName, email);

  res.status(200).json({
    status: "success",
    user,
  });
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fieldSize: 20 * 1024 * 1024 },
});

const randomNumber = () => {
  return Math.floor(Math.random() * 100000000);
};

const uploadPhoto = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const imageDataUrl = req.body.photo;
  if (!imageDataUrl) return next(new AppError("Please provide a photo", 400));

  const extension = path.extname("image.jpeg");
  const imageName = `letschat-${randomNumber()}-${userId}${extension}`;

  let user = await User.findUserById(userId);

  const firebaseStorage = getStorage(firebaseApp);
  let usersImageRef, delImageRef;

  if (process.env.NODE_ENV === "production") {
    usersImageRef = ref(firebaseStorage, `prod/images/users/${imageName}`);
    delImageRef = ref(firebaseStorage, `prod/images/users/${user.imageName}`);
  } else {
    usersImageRef = ref(firebaseStorage, `dev/images/users/${imageName}`);
    delImageRef = ref(firebaseStorage, `dev/images/users/${user.imageName}`);
  }

  await uploadString(usersImageRef, imageDataUrl, "data_url");
  const downloadURL = await getDownloadURL(usersImageRef);

  if (user.imageUrl) {
    await deleteObject(delImageRef);
  }
  user = await User.updatePhoto(userId, imageName, downloadURL);
  res.status(200).json({ status: "success", user: user });
});

// TODO: explore users (users you haven't chatted with)

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  uploadPhoto,
  upload,
};

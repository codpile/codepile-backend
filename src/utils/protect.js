const jwt = require("jsonwebtoken");
const AppError = require("./error");
const { asyncHandler } = require("./asyncHandler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged! Please to get access"));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRETE_TOKEN);
  const user = await User.findUserById(decoded.userId);
  if (!user) {
    return next(new AppError("The user belonging to this token no exists!"));
  }
  // req.id = decoded.userId;
  // next();
  req["user"] = user;
  res.locals.user = user;
  next();
});

module.exports = { protect };

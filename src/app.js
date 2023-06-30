const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const { errorHandler } = require("./controllers/errorController");
const logger = require("morgan");

const app = express();

let url;

if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: process.env.PRODUCTION_URL }));
  url = process.env.PRODUCTION_URL;
} else {
  app.use(cors());
  url = "http://localhost:5173";
}

app.use(express.json());
app.use(logger("dev"));

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use(errorHandler);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "error end point not found!",
    // message: req.originalUrl,
    message: "End-point not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server started and running on port ${PORT}...`)
);

module.exports = app;

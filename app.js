const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors")

const errorMiddleware = require("./middleware/error");
const { userRouter } = require("./routes/userRoutes");
const { meetingRoutes } = require("./routes/meetingRoutes");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "../backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));






app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000', 'https://appointment-ifvu.onrender.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});


app.use("/api/v1", userRouter)


app.use("/api/v1", meetingRoutes)







app.use(errorMiddleware);

module.exports = app;

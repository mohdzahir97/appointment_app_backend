const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const cors=require("cors")

const errorMiddleware = require("./middleware/error");
const { userRouter } = require("./routes/userRoutes");
const { meetingRoutes } = require("./routes/meetingRoutes");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "../backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(cors({
//   origin:["*"],
//   credentials:true
// }))


app.use("/api/v1",userRouter)


app.use("/api/v1",meetingRoutes)







app.use(errorMiddleware);

module.exports = app;

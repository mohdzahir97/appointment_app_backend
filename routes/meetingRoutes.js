const express = require("express")
const { SignInUser, registerUser, loginUser, demo, logout, profileDetails, updateProfileDetails, getAllUserDetails, getSingleUserDetails } = require("../controller/userController")
const { isAuthenticatedUser } = require("../middleware/auth")
const { scheduleMeeting, getUpComingMeeting, getgMeetingDetails } = require("../controller/meetingController")

const meetingRoutes = express.Router()


meetingRoutes.route("/schedule/meeting").post(isAuthenticatedUser, scheduleMeeting);

meetingRoutes.route("/upcoming/meeting").get(isAuthenticatedUser, getUpComingMeeting);

meetingRoutes.route("/meeting").get(isAuthenticatedUser, getgMeetingDetails)


module.exports = { meetingRoutes }
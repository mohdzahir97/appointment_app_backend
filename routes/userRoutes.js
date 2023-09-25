const express = require("express")
const { SignInUser, registerUser, loginUser, demo, logout, profileDetails, updateProfileDetails, getAllUserDetails, getSingleUserDetails, changePassword, userActivate } = require("../controller/userController")
const { isAuthenticatedUser } = require("../middleware/auth")

const userRouter = express.Router()


userRouter.route("/register").post(registerUser)

userRouter.route("/login").post(loginUser)

userRouter.route("/logout").get(logout)

userRouter.route("/profile").get(isAuthenticatedUser, profileDetails)

userRouter.route("/profile/update").put(isAuthenticatedUser, updateProfileDetails)


userRouter.route("/get/alluser").get(isAuthenticatedUser, getAllUserDetails)


userRouter.route("/get/single/user/:id").get(isAuthenticatedUser,getSingleUserDetails)



userRouter.route("/password/update").put(isAuthenticatedUser,changePassword)


userRouter.route("/me/activate").put(isAuthenticatedUser,userActivate)



userRouter.route("/get").get(isAuthenticatedUser).get(demo)

module.exports = { userRouter }
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {



    const { username, email, phone, password } = req.body;

    if (!username || !phone || !email || !password) {
        return next(new ErrorHandler("Please Fill All Fields...", 400));
    }

    const user = await userModel.create({
        username,
        email,
        phone,
        password,
    });

    sendToken(user, 201, res);
});


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});


exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

exports.demo = catchAsyncErrors(async (req, res, next) => {


    // const user=await userModel({req.user})

    res.status(200).json({
        sucess: true,
        message: "hello from xyz"
    })
})


exports.profileDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await userModel.findById({ _id: req.user.id })

    if (!user) {
        return next(new ErrorHandler("User Details Not Found...", 401))
    }

    res.status(200).json({
        sucess: true,
        user: user
    })
})

exports.updateProfileDetails = catchAsyncErrors(async (req, res, next) => {


    let user = await userModel.findById({ _id: req.user.id })

    if (!user) {
        return next(new ErrorHandler("User Details Not Found...", 401))
    }

    user = await userModel.findByIdAndUpdate({ _id: req.user.id }, req.body, {
        new: true
    })

    res.status(200).json({
        sucess: true,
        user: user
    })
})

exports.getAllUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await userModel.find()

    if (!user) {
        return next(new ErrorHandler("User Details Not Found...", 401))
    }

    res.status(200).json({
        sucess: true,
        user: user
    })
})

exports.getSingleUserDetails = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params;

    const user = await userModel.findById({ _id: id })


    if (!user) {
        return next(new ErrorHandler("User Details Not Found...", 401))
    }

    res.status(200).json({
        sucess: true,
        user: user
    })
})


// update User password
exports.changePassword = catchAsyncErrors(async (req, res, next) => {


    const user = await userModel.findById(req.user.id).select("+password");


    const isPasswordMatched = await user.comparePassword(req.body.oldpassword);

    if (!isPasswordMatched) {

        return next(new ErrorHandler("Old password is incorrect", 400));
    }


    // const { newPassword,confirmpassword} = req.body;
    // console.log(newPassword == confirmpassword);
    // if (req.body.newPassword !== req.body.confirmpassword) {
    //     return next(new ErrorHandler("password does not match", 400));
    // }

    user.password = req.body.newpassword;

    await user.save();

    sendToken(user, 200, res);
});


exports.userActivate = catchAsyncErrors(async (req, res, next) => {

    const { isActive } = req.body;

    let user = await userModel.findByIdAndUpdate({ _id: req.user.id }, { isActive: isActive }, {
        new: true
    })

    res.status(200).json({
        sucess: true,
        user: user
    })
});










const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const { scheduleMeetingModel } = require("../model/scheduleMeetingModel");

exports.scheduleMeeting = catchAsyncErrors(async (req, res, next) => {

    const { id, title, agenda, guest, email, meeting_date, country, phone, profession } = req.body



    if (!id || !title || !agenda || !guest || !email || !meeting_date || !country || !phone || !profession) {
        return next(new ErrorHandler("Please Fill All Fields...", 400));
    }


    let newObject = {
        title: title,
        agenda: agenda,
        guest: guest,
        meeting_date: meeting_date,
        country: country,
        phone: phone,
        profession: profession,
        guest_id: id,
        meeting_owner_id: req.user.id,
        isOwner: true
    }

    const user = await scheduleMeetingModel.create(newObject);

    res.status(200).json({
        sucess: true,
        user: user
    })

});



exports.getUpComingMeeting = catchAsyncErrors(async (req, res, next) => {

    const user = await scheduleMeetingModel.find({ guest_id: req.user.id})


    if (!user) {
        return next(new ErrorHandler("User Details Not Found...", 401))
    }

    res.status(200).json({
        sucess: true,
        user: user,
        message:"upcoming"
    })
})

exports.getgMeetingDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await scheduleMeetingModel.find({ meeting_owner_id: req.user.id })


    if (!user) {
        return next(new ErrorHandler("User Details Not Found...", 401))
    }

    res.status(200).json({
        sucess: true,
        user: user,
        message:"fix meeting"
    })
})
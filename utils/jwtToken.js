
const sendToken = (user, statusCode, res) => {

  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: true,
    sameSite: "none",
    httpOnly: true,
  };

  // res
  //   .cookie('access_token', token, {
  //     expires: new Date(Date.now() + 604800000),
  //     secure: env.ENVIRONMENT === 'LIVE',
  //     sameSite: env.ENVIRONMENT === 'LIVE' ? 'none' : 'lax',
  //     httpOnly: true,
  //   })

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;

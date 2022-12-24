const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//User register...
exports.userRegister = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avators",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//User login
exports.userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email & password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email & password", 401));
  }
  sendToken(user, 200, res);
});

//user logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out.",
  });
});

//Forget password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    next(new ErrorHandler("User not found.", 400));
  }

  const resetToken = user.getRestPasswordToken();

  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "E-commerce password recovery.",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password..
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    next(new ErrorHandler("ResetPassword is invalid has ben expired.", 404));
  }
  if (req.body.password !== req.body.confirmPassword) {
    next(new ErrorHandler("Password Doesn't match.", 404));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//UserDetails
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//User update password..

exports.userPasswordUpdate = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesn't match", 401));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//update user profile.
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const UserNewInfo = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avators",
      width: 150,
      crop: "scale",
    });
    UserNewInfo.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, UserNewInfo, {
    new: true,
  });
  if (!user) {
    next(new ErrorHandler(`User doesn\'t exist with ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
  });
});

//get all user {admin}
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  const userCount = await User.countDocuments();
  res.status(200).json({
    success: true,
    users,
    userCount,
  });
});

//get single user admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new ErrorHandler(`User doesn\'t exist with ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//update user role --{admin}
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const UserNewInfo = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, UserNewInfo, {
    new: true,
  });
  if (!user) {
    next(new ErrorHandler(`User doesn\'t exist with ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
  });
});

//user delete --{admin}
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new ErrorHandler(`User doesn\'t exist with ${req.params.id}`, 404));
  }
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully..",
  });
});

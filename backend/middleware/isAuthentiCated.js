const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require('../model/userModel');
const jwt = require('jsonwebtoken')

exports.userAuthenticated = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;

    if (!token) {
        next(new ErrorHandler('please login to access this resource',401));
    }

    const {id} = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(id)
    next()
})

//admin role
exports.authorizeRoles = (...roles) => {
   return (req,res,next)=>{
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Reole: ${req.user.role} is not allow access this resource.`,403)
            )
        }
        next()
   }
}
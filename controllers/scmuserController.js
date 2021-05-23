const { catchAsyncError } = require("../helper");
const SCMUser = require("../models/SCMUser");
const AppError = require("../AppError");

module.exports.getSCMUsers = catchAsyncError(async (req, res, next) => {
  const role = req.params.role;
  if (!role) {
    return next(new AppError(400, "User role is not specified"));
  }
  const data = await SCMUser.get(role);
  res.status(200).json({
    status: "success",
    data,
  });
});

module.exports.getSCMUserById = catchAsyncError(async (req, res, next) => {
  const { role, userId } = req.params;
  if (!role || !userId) {
    return next(new AppError(404, "User role/id is not specified"));
  }
  const data = await SCMUser.getById({ role, id: userId });
  res.status(200).json({
    status: "success",
    data,
  });
});

module.exports.createSCMUser = catchAsyncError(async (req, res, next) => {
  newUser = new SCMUser(req.body);
  const data = await newUser.set();
  res.status(200).json({
    status: "success",
    data,
  });
});

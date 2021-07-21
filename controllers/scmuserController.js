const path = require("path");

const multer = require("multer");

const { catchAsyncError } = require("../helper");
const SCMUser = require("../models/SCMUser");
const AppError = require("../AppError");

const multerStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    const avatarPath = `${file.fieldname}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    req.avatarPath = avatarPath;
    cb(null, avatarPath);
  },
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public/images`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Please upload a valid image file"), false);
  }
};

module.exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("avatarPath");

module.exports.getSCMUsers = catchAsyncError(async (req, res, next) => {
  const role = req.params.role;
  if (!role) {
    return next(new AppError(400, "User role is not specified"));
  }
  const data = await SCMUser.get({ role });
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
  if (req.file) {
    req.body.avatarPath = req.avatarPath;
  } else {
    req.body.avatarPath = "default.jpg";
  }
  newUser = new SCMUser(req.body);
  const data = await newUser.set();
  res.status(200).json({
    status: "success",
    data,
  });
});

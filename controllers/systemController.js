const { catchAsyncError } = require("../helper");
const { SystemHistorian, SystemIdentities } = require("../models/System");

module.exports.getSystemHistorian = catchAsyncError(async (req, res, next) => {
  const data = await SystemHistorian.get();
  res.status(200).json({
    status: "success",
    data,
  });
});

module.exports.getSystemIdentities = catchAsyncError(async (req, res, next) => {
  const data = await SystemIdentities.get();
  res.status(200).json({
    status: "success",
    data,
  });
});

module.exports.getSystemHistorianById = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const data = await SystemHistorian.getById({ id });
    res.status(200).json({
      status: "success",
      data,
    });
  }
);

module.exports.getSystemIdentitiesById = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const data = await SystemIdentities.getById({ id });
    res.status(200).json({
      status: "success",
      data,
    });
  }
);

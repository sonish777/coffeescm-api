const AppError = require("../AppError");
const { catchAsyncError, getUpdateType } = require("../helper");
const Batch = require("../models/Batch");

module.exports.getAllBatches = catchAsyncError(async (req, res, next) => {
  const data = await Batch.get();
  return res.status(200).json({
    status: "success",
    data,
  });
});

module.exports.getBatch = catchAsyncError(async (req, res, next) => {
  const { batchId } = req.params;
  if (!batchId) return next(new AppError(400, "Batch Id must be provided"));
  const data = await Batch.getById({ id: batchId });
  return res.status(200).json({
    status: "success",
    data,
  });
});

module.exports.updateBatch = catchAsyncError(async (req, res, next) => {
  const { batchId, updateType } = req.params;
  if (!batchId) return next(new AppError(400, "Batch Id must be provided"));
  if (!updateType)
    return next(new AppError(400, "Update type must be provided"));
  const currentBatch = await Batch.getById({ id: batchId });
  if (!currentBatch)
    return next(new AppError(404, "Batch for given ID was not found"));
  const typecastedObj = new Batch({ ...currentBatch });
  const updateTypeString = getUpdateType(updateType);
  const updatedBatch = await typecastedObj.update({
    type: updateTypeString,
    ...req.body,
  });
  return res.status(200).json({
    status: "success",
    data: updatedBatch,
  });
});
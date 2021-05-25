const AppError = require("../AppError");
const { catchAsyncError } = require("../helper");
const Contract = require("../models/Contract");

module.exports.getAllContracts = catchAsyncError(async (req, res, next) => {
  const data = await Contract.get();
  return res.status(200).json({
    status: "success",
    data,
  });
});

module.exports.getContract = catchAsyncError(async (req, res, next) => {
  const { contractId } = req.params;
  if (!contractId)
    return next(new AppError(400, "Please provide a contract ID"));
  const data = await Contract.getById({ id: contractId });
  return res.status(200).json({
    status: "success",
    data,
  });
});

module.exports.createContract = catchAsyncError(async (req, res, next) => {
  const newContract = new Contract({ ...req.body });
  const data = await newContract.set();
  return res.status(201).json({
    status: "success",
    data,
  });
});

module.exports.addContractParticipants = catchAsyncError(
  async (req, res, next) => {
    const { contractId } = req.params;
    if (!contractId)
      return next(new AppError(400, "Please provide a contract ID"));
    const currentContract = await Contract.getById({ id: contractId });
    if (!currentContract)
      return next(new AppError(404, "Contract for given ID was not found"));
    const typecastedObject = new Contract({ ...currentContract });
    const updatedContract = await typecastedObject.update({ ...req.body });
    return res.status(200).json({
      status: "success",
      data: updatedContract,
    });
  }
);

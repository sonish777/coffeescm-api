const AppError = require("./AppError");

module.exports.extractErrorMessage = (error) => {
  if (error.isAxiosError) {
    console.error("--------------------AXIOS ERROR---------------------");
    console.log(error.response.data);
    let message = error.response.data.error.message;
    if (message.includes("the object already exists")) {
      message = `The given id is already in use`;
    }
    return message;
  }
};

module.exports.catchAsyncError = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) =>
    next(new AppError(500, this.extractErrorMessage(err)))
  );
};

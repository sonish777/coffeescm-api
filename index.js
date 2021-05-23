const express = require("express");
const dotenv = require("dotenv");
const scmuserRoutes = require("./routes/scmuserRoutes");
const globalErrorHandler = require("./globalErrorHandler");
const AppError = require("./AppError");

// Loading environment variables
dotenv.config({ path: "config.env" });

// Configuring express app
const app = express();
app.use(express.json());

// Handling API routes
app.use("/api/scmusers", scmuserRoutes);

// Handling errors
app.all("*", (req, res, next) =>
  next(new AppError(404, "The route you are trying to access doesn't exist"))
);
app.use(globalErrorHandler);

// Start server
app.listen(process.env.BACKEND_PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit(-1);
  }
  console.log("Server listening on port", process.env.BACKEND_PORT);
});

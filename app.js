const path = require("path");
const express = require("express");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");

const app = express();

//body parser,reading data from body into req.body
app.use(express.json({ limit: "10kb" })); //middle wear
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3)ROUTERS

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// 4) START THE SERVER

module.exports = app;

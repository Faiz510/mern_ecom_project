import { ErrorRequestHandler, NextFunction } from "express";
import AppError from "../utils/AppError";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "failed";

  if (process.env.NODE_ENV === "development") {
    // if app is in development
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    // error is castError
    if (err.name === "CastError") {
      return res.status(err.statusCode).json({
        status: "failed",
        message: `error in  ${err.path} : ${err.value}`,
      });
    }

    // duplicate key error
    if (err.code === 11000) {
      return res.status(err.statusCode).json({
        status: "failed",
        message: `duplicate feild value ${err.keyValue.title} . plz use another value`,
      });
    }

    // ValidationError
    if (err.name === "ValidationError") {
      interface messageProps {
        message: string;
      }

      const validateErrorsVal: messageProps[] = err.errors
        ? Object.values(err.errors as messageProps[]).map((el) => ({
            message: el.message,
          }))
        : [];

      const message = `Invalid fields  ${validateErrorsVal
        .map((msg) => msg.message)
        .join(". ")}`;

      return res.status(err.statusCode).json({
        status: "failed",
        message: `${message}`,
      });
    }

    // if app is in production
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error(err);
      res.status(err.statusCode).json({
        status: "error",
        message: "something went wrong",
      });
    }
  }
};

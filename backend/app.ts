import express from "express";
import productRoute from "./route/ProductRoute";
import AppError from "./utils/AppError";
import { globalErrorHandler } from "./controller/errorController";

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRoute);

// Error Handling
app.all("*", (req, res, next) =>
  next(new AppError(`Can't find router ${req.originalUrl}`, 404))
);

app.use(globalErrorHandler);

export default app;
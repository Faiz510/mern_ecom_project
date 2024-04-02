import express from "express";
import productRoute from "./route/ProductRoute";
import userRoute from "./route/UserRoute";
import AppError from "./utils/AppError";
import { globalErrorHandler } from "./controller/errorController";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// Applying the rate limiting middleware to all requests.
app.use("/api", limiter);

app.use(express.json());

app.use(ExpressMongoSanitize());

app.use(
  hpp({
    whitelist: ["category", "price", "AvgRating", "tags"],
  })
);

app.use("/api/v1/products", productRoute);
app.use("/api/v1/user", userRoute);

// Error Handling
app.all("*", (req, res, next) =>
  next(new AppError(`Can't find router ${req.originalUrl}`, 404))
);

app.use(globalErrorHandler);

export default app;

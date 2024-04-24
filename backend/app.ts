import express from "express";
import productRoute from "./route/ProductRoute";
import userRoute from "./route/UserRoute";
import cartRoute from "./route/CartRoute";
import wishlistRoute from "./route/WishlistRoute";
import reviewsRoute from "./route/ReviewsRoute";
import AppError from "./utils/AppError";
import { globalErrorHandler } from "./controller/errorController";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

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

app.use(cookieParser());

app.use(ExpressMongoSanitize());

app.use(
  hpp({
    whitelist: ["category", "price", "AvgRating", "tags"],
  })
);

app.use("/api/v1/products", productRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/reviews", reviewsRoute);

// Error Handling
app.all("*", (req, res, next) =>
  next(new AppError(`Can't find router ${req.originalUrl}`, 404))
);

app.use(globalErrorHandler);

export default app;

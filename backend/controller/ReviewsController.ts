import catchAsyncHandler from "../utils/catchAsyncHandler";
import AppError from "../utils/AppError";
import { CustomRequest } from "./AuthController";
import Reviews, { productReviews } from "../modal/ReviewsModal/ReviewsModal";

export const addReview = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const reviewData = {
      userId: req.user.id,
      product: req.params.productId,
      review: req.body.review,
      rating: req.body.rating,
    };
    const reviews = await Reviews.create(reviewData);

    res.status(200).json({
      status: "sucess",
      reviews: reviews,
    });
  }
);

export const getReviews = catchAsyncHandler(async (req, res, next) => {
  let filter = {};
  if (req.params.productId) filter = req.params.productId;
  const reviews = await Reviews.find({ product: filter });

  res.status(200).json({
    status: "sucess",
    reviews: reviews,
  });
});

export const updateReview = catchAsyncHandler(async (req, res, next) => {
  const updateData = {
    rating: req.body.rating,
    review: req.body.review,
  };

  const review = await Reviews.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(new AppError("no review with this Id", 400));
  }

  res.status(200).json({
    status: "sucess",
    review,
  });
});

export const deleteReview = catchAsyncHandler(async (req, res, next) => {
  const review = await Reviews.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError("no review with this Id", 400));
  }

  res.status(200).json({
    status: "sucess",
    review: null,
  });
});

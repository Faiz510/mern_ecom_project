import mongoose, { Schema, Types } from "mongoose";
import { Document, Query } from "mongoose";
import Product from "../ProductModal/ProductModal";

export interface productReviews extends Document {
  review: string;
  rating: number;
  userId: Types.ObjectId;
  product: Types.ObjectId;
  createdAt: Date;
}

export interface ProductReviewModel extends mongoose.Model<productReviews> {
  calProductAvgRating(id: Types.ObjectId): Promise<void>;
}

const ReviewsSchema: Schema<productReviews> = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "productId must required"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user id must required"],
    },
    review: {
      type: String,
      minlength: 8,
      maxlength: 200,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "plz add rating"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

ReviewsSchema.index({ product: 1, userId: 1 }, { unique: true });

ReviewsSchema.statics.calProductAvgRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        numRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  const updateProductData = {
    reviewQuantity: stats[0].numRating,
    avgRating: stats[0].avgRating,
  };

  await Product.findByIdAndUpdate(productId, updateProductData);
};

ReviewsSchema.post("save", async function () {
  await (this.constructor as ProductReviewModel).calProductAvgRating(
    this.product
  );
});

//  poplute on find query
ReviewsSchema.pre(/^find/, function (this: productReviews, next) {
  this.populate({
    path: "userId",
    select: "username email",
  });
  next();
});

const Reviews = mongoose.model<productReviews>("Reviews", ReviewsSchema);

export default Reviews;

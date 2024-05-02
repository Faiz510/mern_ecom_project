import mongoose, { Schema, Types } from "mongoose";
import { Document, Model } from "mongoose";
import AppError from "../../utils/AppError";

// Interface for CartProduct
export interface Wishlistproduct extends Document {
  product: {
    _id: Types.ObjectId;
    title: string;
    price: number;
    thumbnail: string;
  };
}

// Interface for CartDocument
interface wishlistDocuments extends Document {
  userId: Types.ObjectId;
  products: Wishlistproduct[];
}

const WishlistSchema: Schema<wishlistDocuments> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      { product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" } },
    ],
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

// poplute on find query
WishlistSchema.pre(/^find/, function (this: wishlistDocuments, next) {
  this.populate({
    path: "products.product",
  });
  next();
});

const Wishlist = mongoose.model<wishlistDocuments>("Wishlist", WishlistSchema);

export default Wishlist;

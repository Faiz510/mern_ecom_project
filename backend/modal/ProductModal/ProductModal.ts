import mongoose, { set } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A product title is required"],
      unique: [true, "Title must be unique"],
    },
    description: {
      type: String,
      required: [true, "A product description is required"],
    },
    price: {
      type: Number,
      required: [true, "A product price is required"],
      min: [0, "A cant not be negative "],
    },
    thumbnail: {
      type: String,
      required: [true, "A product must have thumbnail"],
    },

    images: {
      type: [String],
      required: [true, "A product must have atleast 4 images"],
    },

    category: {
      type: [String],
      required: [true, "A product must have Category"],
    },
    tags: {
      type: [String],
    },
    reviewQuantity: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 4,
      required: [true, "a product rating is required"],
      min: [0, "A rating cannot be negative"],
      max: [5, "A rating cannot be greater than 5"],
      set: (val: number) => Math.round((val * 10) / 10),
    },
    discountPercentage: {
      type: Number,
      min: [0, "A cant not be negative"],
    },
    inStock: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
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

ProductSchema.virtual("reviews", {
  ref: "Reviews",
  foreignField: "product",
  localField: "_id",
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;

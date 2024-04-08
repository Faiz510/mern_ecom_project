import mongoose, { Schema, Types } from "mongoose";
import { Document, Model } from "mongoose";
import AppError from "../../utils/AppError";

// Interface for CartProduct
export interface CartProduct extends Document {
  product: {
    _id: Types.ObjectId;
    title: string;
    price: number;
    thumbnail: string;
  };
  quantity: number;
  total?: number;
}

// Interface for CartDocument
interface CartDocument extends Document {
  userId: Types.ObjectId;
  products: CartProduct[];
  totalProducts: number;
  totalQuantity: number;
  totalAmount: number;
  calculateTotalPrice(): void;
  calculateTotalItemAmount(): void;
}

const CartSchema: Schema<CartDocument> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: {
          type: Number,
          default: 1,
        },
        total: {
          type: Number,
        },
      },
    ],
    totalAmount: Number,
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

// totalNumber of product in cart
CartSchema.virtual("totalProducts").get(function () {
  return this.products.length;
});

// total Quantity of product in cart
CartSchema.virtual("totalQuantity").get(function (this: CartDocument) {
  return this.products.reduce((acc, val) => acc + val.quantity, 0);
});

// poplute on find query
CartSchema.pre(/^find/, function (this: CartDocument, next) {
  this.populate({
    path: "products.product",
    select: "title price thumbnail",
  });
  next();
});

// caluclate each product price with its quantity
CartSchema.methods.calculateTotalPrice = function (this: CartDocument) {
  this.products.forEach((p) => {
    p.total = p.quantity * p.product.price;
  });
};

// cal total amount
CartSchema.methods.calculateTotalItemAmount = function (
  this: CartDocument,
  val: number
) {
  return (this.totalAmount = this.products.reduce(
    (acc, amount) => acc + (amount?.total || 0),
    0
  ));
};

const Cart = mongoose.model<CartDocument>("Cart", CartSchema);

export default Cart;

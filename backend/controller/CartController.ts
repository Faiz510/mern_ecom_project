import catchAsyncHandler from "../utils/catchAsyncHandler";
import AppError from "../utils/AppError";
import Cart, { CartProduct } from "../modal/CartModal/CartModal";
import { CustomRequest } from "./AuthController";

export const addProductToCart = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const { products } = req.body;
    const existingCart = await Cart.findOne({ userId: req.user.id });

    // if card exists
    if (existingCart) {
      // if product already exists in cart
      const findItemIndex = existingCart.products.findIndex(
        (p) => p.product._id.toString() == products[0].product
      );

      if (findItemIndex > -1) {
        // if exist already exist in cart then increase quantity
        existingCart.products[findItemIndex].quantity +=
          products[0].quantity ?? 1;
      } else {
        // if product not exists in cart
        existingCart?.products.push(
          ...req.body.products.map((product: CartProduct) => ({
            product: products[0].product, // add product
            quantity: products[0].quantity, // add quantity
          }))
        );
      }

      await existingCart.save();
      res.status(201).json({
        status: "sucess",
        cart: existingCart,
      });
    } else {
      // if cart not exists then create
      const cartBody = {
        userId: req.user.id,
        products,
      };

      const newCart = await Cart.create(cartBody);

      res.status(201).json({
        status: "sucess",
        cart: newCart,
      });
    }
  }
);

export const allCartProduct = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const id = req.user;
    const cart = await Cart.findOne({ userId: id });

    if (!cart) return next(new AppError("cart not found ", 400));

    cart.calculateTotalPrice();

    cart.calculateTotalItemAmount();

    res.status(200).json({
      status: "sucess",
      cart,
    });
  }
);

export const removeCartItem = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const id = req.user;
    const cart = await Cart.findOne({ userId: id });
    const ObjId = req.params.objectId;

    const IdIndex = cart?.products.findIndex(
      (products) => products.id === ObjId
    );

    if (IdIndex === -1 || typeof IdIndex === "undefined")
      return next(new AppError("Item not in cart", 400));

    cart?.products.splice(IdIndex, 1);

    await cart?.save();

    res.status(200).json({
      status: "sucess",
      cart,
    });
  }
);

export const clearCartItem = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const id = req.user;
    const cart = await Cart.findOne({ userId: id });

    if (!cart) return next(new AppError("cart not found ", 400));

    cart.products = [];
    await cart.save();

    res.status(200).json({
      status: "sucess",
      cart,
    });
  }
);

export const updateQuantity = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const id = req.user;
    const cart = await Cart.findOne({ userId: id });
    const { quantity } = req.body;

    const ObjId = req.params.objectId;

    if (!cart) return next(new AppError("cart not found ", 400));

    const products = cart.products.find((product) => product.id === ObjId);

    if (!products) {
      return next(new AppError("no product item found with object Id", 400));
    }

    if (quantity < 0) {
      return next(new AppError("quantity than be in positive number", 400));
    }

    products.quantity = quantity;

    await cart.save();

    res.status(200).json({
      status: "sucess",
      cart,
    });
  }
);

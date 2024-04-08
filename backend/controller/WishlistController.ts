import catchAsyncHandler from "../utils/catchAsyncHandler";
import AppError from "../utils/AppError";
import Wishlist from "../modal/WishlistModal/WishlistModal";
import { CustomRequest } from "./AuthController";

export const addProductToWishlist = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const existingWishlist = await Wishlist.findOne({ userId: req.user.id });

    if (existingWishlist) {
      existingWishlist?.products.push(...req.body.products);

      await existingWishlist?.save();

      res.status(200).json({
        status: "sucess",
        wishlist: existingWishlist,
      });
    } else {
      const wishlistData = {
        userId: req.user.id,
        products: req.body.products,
      };

      const newWishlist = await Wishlist.create(wishlistData);

      res.status(200).json({
        status: "sucess",
        wishlist: newWishlist,
      });
    }
  }
);

export const allWishlistProduct = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const id = req.user;
    const wishlist = await Wishlist.findOne({ userId: id });

    if (!wishlist) return next(new AppError("cart not found ", 400));

    res.status(200).json({
      status: "sucess",
      wishlist,
    });
  }
);

export const clearWishlistItems = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const wishlist = await Wishlist.findOne({ userId: req.user.id });

    if (!wishlist) return next(new AppError("wishlist not exists", 400));

    wishlist.products = [];

    await wishlist.save();

    res.status(200).json({
      status: "sucess",
      wishlist,
    });
  }
);

export const removeWishlistItem = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const wishlist = await Wishlist.findOne({ userId: req.user.id });

    const ObjectId = req.params.objectId;

    if (!wishlist) return next(new AppError("wishlist not exist", 400));

    const wishlistItemIndex = wishlist.products.findIndex(
      (p) => p.id === ObjectId
    );

    if (wishlistItemIndex === -1 || typeof wishlistItemIndex === "undefined")
      return next(new AppError("Item did not exist in wishlist", 400));

    wishlist.products.splice(wishlistItemIndex, 1);

    await wishlist.save();

    res.status(200).json({
      status: "sucess",
      wishlist,
    });
  }
);

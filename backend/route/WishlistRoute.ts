import express from "express";
import { protectRoute, restrictToRoute } from "../controller/AuthController";
import {
  addProductToWishlist,
  allWishlistProduct,
  clearWishlistItems,
  removeWishlistItem,
} from "../controller/WishlistController";

const router = express.Router();

// wishlist

router.use(protectRoute, restrictToRoute("user")); // applied to all routes

router.route("/").post(addProductToWishlist).get(allWishlistProduct);

router.route("/clearWishlist").post(clearWishlistItems);

router.route("/removeItem/:objectId").patch(removeWishlistItem);

export default router;

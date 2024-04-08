import express from "express";
import { protectRoute, restrictToRoute } from "../controller/AuthController";
import {
  addProductToWishlist,
  allWishlistProduct,
  clearWishlistItems,
  removeWishlistItem,
} from "../controller/WishlistController";

const router = express.Router();

// products
router
  .route("/")
  .post(protectRoute, restrictToRoute("user"), addProductToWishlist)
  .get(protectRoute, restrictToRoute("user"), allWishlistProduct);

router
  .route("/clearWishlist")
  .post(protectRoute, restrictToRoute("user"), clearWishlistItems);

router
  .route("/removeItem/:objectId")
  .patch(protectRoute, restrictToRoute("user"), removeWishlistItem);

export default router;

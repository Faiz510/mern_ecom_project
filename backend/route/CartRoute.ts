import express from "express";
import { protectRoute, restrictToRoute } from "../controller/AuthController";
import {
  addProductToCart,
  allCartProduct,
  clearCartItem,
  removeCartItem,
  updateQuantity,
} from "../controller/CartController";

const router = express.Router();

// products
router
  .route("/")
  .post(protectRoute, restrictToRoute("user"), addProductToCart)
  .get(protectRoute, restrictToRoute("user"), allCartProduct);

router
  .route("/clearAll")
  .post(protectRoute, restrictToRoute("user"), clearCartItem);

router
  .route("/:objectId")
  .patch(protectRoute, restrictToRoute("user"), removeCartItem);
router
  .route("/updateQuantity/:objectId")
  .patch(protectRoute, restrictToRoute("user"), updateQuantity);

export default router;

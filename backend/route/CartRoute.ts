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

// Cart router

router.use(protectRoute, restrictToRoute("user")); // applied to all routes

router.route("/").post(addProductToCart).get(allCartProduct);

router.route("/clearAll").post(clearCartItem);

router.route("/:objectId").patch(removeCartItem);
router.route("/updateQuantity/:objectId").patch(updateQuantity);

export default router;

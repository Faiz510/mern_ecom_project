import express from "express";
import {
  AllProducts,
  createProduct,
  deleteProduct,
  productById,
  productCategoryNames,
  updateProduct,
} from "../controller/ProductController";
import { protectRoute, restrictToRoute } from "../controller/AuthController";

const router = express.Router();

// products
router
  .route("/")
  .post(protectRoute, restrictToRoute("admin"), createProduct)
  .get(AllProducts);

router.route("/product-categories").get(productCategoryNames);

router
  .route("/:id")
  .get(productById)
  .delete(protectRoute, restrictToRoute("admin"), deleteProduct)
  .put(protectRoute, restrictToRoute("admin"), updateProduct);

export default router;

import express from "express";
import {
  AllProducts,
  createProduct,
  deleteProduct,
  productById,
  productCategoryNames,
  updateProduct,
} from "../controller/ProductController";

const router = express.Router();

// products
router.route("/").post(createProduct).get(AllProducts);

router.route("/product-categories").get(productCategoryNames);

router.route("/:id").get(productById).delete(deleteProduct).put(updateProduct);

export default router;

import express from "express";
import {
  AllProducts,
  createProduct,
  deleteProduct,
  productById,
  updateProduct,
} from "../controller/ProductController";

const router = express.Router();

// products
router.route("/").post(createProduct).get(AllProducts);

router.route("/:id").get(productById).delete(deleteProduct).put(updateProduct);

export default router;

import express from "express";
import { createProduct } from "../controller/ProductController";

const router = express.Router();

router.route("/").post(createProduct);

export default router;

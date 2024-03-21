import { Request, Response } from "express";
import Product from "../modal/ProductModal/ProductModal";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json({
      status: "sucess",
      product: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `error in post : ${error}`,
    });
  }
};

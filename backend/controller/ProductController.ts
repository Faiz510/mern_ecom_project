import { Request, Response } from "express";
import Product from "../modal/ProductModal/ProductModal";

export const AllProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find();

    res.status(200).json({
      status: "sucess",
      productLength: product.length,
      products: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `error in post : ${error}`,
    });
  }
};

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

export const productById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.status(200).json({
      status: "sucess",
      products: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `error in post : ${error}`,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "sucess",
      products: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `error in post : ${error}`,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    res.status(200).json({
      status: "sucess",
      products: "",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `error in post : ${error}`,
    });
  }
};

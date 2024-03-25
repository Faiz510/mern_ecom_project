import { Request, Response, NextFunction } from "express";
import Product from "../modal/ProductModal/ProductModal";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import AppError from "../utils/AppError";

export const AllProducts = catchAsyncHandler(async (req, res, next) => {
  const product = await Product.find();

  res.status(200).json({
    status: "sucess",
    productLength: product.length,
    products: product,
  });
});

export const createProduct = catchAsyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    status: "sucess",
    product: product,
  });
});

export const productById = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product)
    return next(new AppError("product not found with this Id", 404));

  res.status(200).json({
    status: "sucess",
    products: product,
  });
});

export const updateProduct = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product)
    return next(new AppError("product not found with this Id", 404));

  res.status(200).json({
    status: "sucess",
    products: product,
  });
});

export const deleteProduct = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product)
    return next(new AppError("product not found with this Id", 404));

  res.status(200).json({
    status: "sucess",
    products: "",
  });
});

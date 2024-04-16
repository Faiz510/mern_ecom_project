import { Request, Response, NextFunction } from "express";
import Product from "../modal/ProductModal/ProductModal";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import AppError from "../utils/AppError";

export const AllProducts = catchAsyncHandler(async (req, res, next) => {
  // filtering
  const queryObj = { ...req.query };
  const excludedFields = ["page", "field", "limit", "sort"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced filtering
  let strObj = JSON.stringify(queryObj);
  strObj = strObj.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  let query = Product.find(JSON.parse(strObj));

  let CountQuery = Product.find(JSON.parse(strObj));

  // sort filtering
  if (req.query.sort) {
    const sort: string = req.query.sort.toString();
    const sortBy = sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // field filtering
  if (req.query.field) {
    const field: string = req.query.field.toString();
    const fields = field.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // pagination filter
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  //
  const product = await query;

  const productsCount = await CountQuery.countDocuments();
  if (req.query.page && skip >= productsCount) {
    return next(new AppError("page Note found", 404));
  }

  res.status(200).json({
    status: "sucess",
    productLenght: product.length,
    products: product,
    total: productsCount,
    skip: skip,
    limit: limit,
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

  const product = await Product.findById(id).populate("reviews");

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

export const productCategoryNames = catchAsyncHandler(
  async (req, res, next) => {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
        },
      },
      {
        $group: {
          _id: 0,
          categories: { $push: "$_id" },
        },
      },
    ]);

    const uniqueCategories =
      categories.length > 0 ? categories[0].categories.flat() : [];

    res.status(200).json({
      status: "success",
      categories: uniqueCategories,
    });
  }
);

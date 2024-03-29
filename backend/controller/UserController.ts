import User from "../modal/UserModal/UserModal";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import AppError from "../utils/AppError";
import { Request } from "express";

export const getAllUser = catchAsyncHandler(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: "sucess",
    users: user,
  });
});

export const updateUser = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError("user not found with this Id", 404));

  res.status(200).json({
    status: "sucess",
    user: user,
  });
});

export const userById = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) return next(new AppError("user not found with this Id", 404));

  res.status(200).json({
    status: "sucess",
    user: user,
  });
});

export const deleteUser = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) return next(new AppError("user not found with this Id", 404));

  res.status(200).json({
    status: "sucess",
    user: "",
  });
});

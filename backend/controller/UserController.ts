import User from "../modal/UserModal/UserModal";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import AppError from "../utils/AppError";
import { Request } from "express";
import { CustomRequest, JwtGeneratorHandler } from "./AuthController";

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

export const updateMyPassword = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const { curPassword, newPassword, confirmPassword } = req.body;
    // get user
    const user = await User.findById({ _id: req.user.id }).select("+password");

    if (!user) return next(new AppError("user not found with id", 400));

    // check posted password is correct
    const isCorrectPassword = await user.correctPassword(
      curPassword,
      user?.password
    );
    if (!isCorrectPassword)
      return next(new AppError("incorrect password or email", 400));

    // update password
    user.password = newPassword;
    user.confirmPassword = confirmPassword;
    await user.save();

    // generate token
    const token = JwtGeneratorHandler(next, user);

    res.status(200).json({
      status: "sucess",
      token,
    });
  }
);

export const updateCurrentUser = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    const { username, email, password, confirmPassword, role } = req.body;

    if (password || confirmPassword || role)
      return next(new AppError("you cannot access this password route", 400));

    // get user
    const updateData = {
      username,
      email,
    };
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) return next(new AppError("user not found with id", 400));

    res.status(200).json({
      status: "sucess",
      user,
    });
  }
);

export const deleteMe = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    // get user
    const user = await User.findByIdAndDelete({ _id: req.user.id });

    if (!user) return next(new AppError("user not found with id", 400));

    res.status(200).json({
      status: "sucess",
      user: null,
    });
  }
);

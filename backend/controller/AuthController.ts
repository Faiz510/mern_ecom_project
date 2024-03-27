import User, { UserDocument } from "../modal/UserModal/UserModal";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";

const JwtGeneratorHandler = (next: NextFunction, user: UserDocument | null) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = process.env.JWT_KEY_EXPIRES_IN;

  if (!secretKey || !expiresIn) {
    return next(new AppError("secret key is undefined", 400));
  }

  const token = jwt.sign({ id: user?._id }, secretKey, {
    expiresIn: expiresIn,
  });

  return token;
};

export const signup = catchAsyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });

  const token = JwtGeneratorHandler(next, user);

  res.status(201).json({
    status: "success",
    token,
    user,
  });
});

export const login = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("email and password is required", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError("user not found with this email", 400));

  //   console.log(password, user?.password);

  const isCorrectPassword = await user.correctPassword(
    password,
    user?.password
  );

  if (!isCorrectPassword)
    return next(new AppError("incorrect password or email", 400));

  const token = JwtGeneratorHandler(next, user);

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

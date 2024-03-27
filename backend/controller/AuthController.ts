import User from "../modal/UserModal/UserModal";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";

export const signup = catchAsyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });

  const secretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = process.env.JWT_KEY_EXPIRES_IN;

  if (!secretKey || !expiresIn)
    return next(new AppError("secret key is undefined", 400));

  const token = jwt.sign({ id: user._id }, secretKey, {
    expiresIn: expiresIn,
  });

  res.status(201).json({
    status: "success",
    token,
    user,
  });
});

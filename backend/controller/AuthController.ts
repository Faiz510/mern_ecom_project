import User, { UserDocument } from "../modal/UserModal/UserModal";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
import { NextFunction, Request, RequestHandler } from "express";
import sendNodeMail from "../utils/nodemailer";
import crypto from "crypto";

export interface CustomRequest extends Request {
  user?: any;
}

interface decodedType {
  id: string;
  iat: number;
  exp: number;
}

export const JwtGeneratorHandler = (
  next: NextFunction,
  user: UserDocument | null
) => {
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
  const { username, email, password, confirmPassword, role } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    confirmPassword,
    role,
  });

  // const token = JwtGeneratorHandler(next, user);

  // const Requser = userData

  res.status(201).json({
    status: "success",
    user,
  });
});

export const login = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email and password is required", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("user not found with this email", 400));

  const isCorrectPassword = await user.correctPassword(
    password,
    user?.password
  );
  if (!isCorrectPassword)
    return next(new AppError("incorrect password or email", 400));

  const token = JwtGeneratorHandler(next, user);

  res
    .cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(user);
});

export const protectRoute = catchAsyncHandler(
  async (req: CustomRequest, res, next) => {
    // getting token

    const token = req.cookies.jwtToken;
    if (!token)
      return next(new AppError("Invalid Token or you are not logged in", 401));

    // verify token
    if (!process.env.JWT_SECRET_KEY)
      return next(new AppError("Invalid jwt key", 401));

    const decoded: decodedType | jwt.JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as decodedType;

    // user still exists
    const currentUser = await User.findById({ _id: decoded.id });

    if (!currentUser) return next(new AppError("user not exist ", 400));

    // if user changes it password

    const decodedIat = decoded.iat || 0;
    const passwordChangeAt = await currentUser.passwordChangeAtMethod(
      decodedIat
    );

    if (passwordChangeAt) {
      return next(
        new AppError("your recently changed your . plz login again", 400)
      );
    }

    req.user = currentUser;

    next();
  }
);

export const restrictToRoute = (...roles: string[]): RequestHandler => {
  return (req: CustomRequest, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("You cannot access this route", 403));
    }
    next();
  };
};

export const forgotPassword = catchAsyncHandler(async (req, res, next) => {
  // getting user with email
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) return next(new AppError("no user with this email ", 400));

  // generating reset Password token
  const resetToken = user.createResetTokenMethod();

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}//api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password then send patch request on click on URL : ${resetURL}. if don't then ignore this message ?`;

  const subject = "forgot password message";

  // sending resetPasswordToken to user with nodemailer
  try {
    await sendNodeMail({ email: user.email, subject, message });

    res.status(200).json({
      status: "sucess",
      message: "token has been to your email",
    });
  } catch (error) {
    user.resetPasswordToken = "";
    user.resetPasswordExpiresIn = undefined;

    return next(new AppError("email didnot send", 400));
  }
  // save
  await user.save({ validateBeforeSave: false });
});

export const ResetPassword = catchAsyncHandler(async (req, res, next) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedPassword,
    resetPasswordExpiresIn: { $gt: new Date() },
  });

  if (!user || !user.resetPasswordExpiresIn) {
    return next(new AppError("Invalid token or token has been expired", 400));
  }

  // new password Data
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetPasswordToken = "";
  user.resetPasswordExpiresIn = undefined;
  await user.save();
});

export const logout = catchAsyncHandler(async (req, res, next) => {
  // Clear the JWT token cookie
  res.cookie("jwtToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  // Send the JSON response separately
  res.status(200).json({ status: "success" });
});

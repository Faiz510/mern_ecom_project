import mongoose, { Schema, Document } from "mongoose";
import bycrypt from "bcryptjs";
import crypto from "crypto";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  passwordChangeAt: Date;
  role: string;
  resetPasswordToken: string;
  resetPasswordExpiresIn: Date | undefined;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  passwordChangeAtMethod(timeStampLogin: number): Promise<boolean>;
  createResetTokenMethod(): Promise<string>;
}

const UserSchema: Schema<UserDocument> = new mongoose.Schema(
  {
    username: {
      type: String,
      min: [4, "username must be greater than 4"],
      max: [16, "username musbe lesser than 16"],
      unique: true,
      required: [true, "A username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "An email is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      min: [6, "password must be greater than 6"],
      max: [16, "password musbe lesser than 16"],
      required: [true, "A password is required"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "A confirm password is required"],
      validate: {
        validator: function (this: UserDocument, val: string) {
          return val === this.password;
        },
        message: "Passwords do not match",
      },
    },
    passwordChangeAt: Date,

    resetPasswordToken: String,
    resetPasswordExpiresIn: Date,
  },
  {
    timestamps: true,
  }
);

// bycrypt password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangeAt = new Date(Date.now() - 1000);
  return next();
});

// bycrypt password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashed = await bycrypt.hash(this.password, 12);
  this.password = hashed;
  this.confirmPassword = undefined;

  return next();
});

// check password method
UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bycrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.passwordChangeAtMethod = function (timeStampLogin: number) {
  if (this.passwordChangeAt) {
    const passwordChangeTime = Math.floor(
      this.passwordChangeAt.getTime() / 1000
    );
    return passwordChangeTime > timeStampLogin;
  }
  return false; // If passwordChangeAt is null or undefined
};

UserSchema.methods.createResetTokenMethod = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // encryt resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpiresIn = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;

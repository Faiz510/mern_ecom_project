import mongoose, { Schema, Document } from "mongoose";
import bycrypt from "bcryptjs";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
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
  },
  {
    timestamps: true,
  }
);

// bycrypt password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashed = await bycrypt.hash(this.password, 12);

  this.password = hashed;

  this.confirmPassword = undefined;

  return next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bycrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;

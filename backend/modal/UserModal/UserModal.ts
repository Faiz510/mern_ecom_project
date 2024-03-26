import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const UserSchema: Schema<UserDocument> = new mongoose.Schema({
  username: {
    type: String,
    min: 4,
    max: 16,
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
    min: 6,
    max: 20,
    required: [true, "A password is required"],
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
});

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;

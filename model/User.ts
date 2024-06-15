import mongoose, { Document, Schema } from "mongoose";
import { Message, MessageSchema } from "@/model/Message";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: number | null;
  verifyCodeExpiry: Date | null;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  verfiedAt?: Date;
  message: [{ type: mongoose.Schema.Types.ObjectId; ref: "MessageModel" }];
}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  verifyCode: {
    type: Number || null,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date || null,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verfiedAt: {
    type: Date || null,
    required: true,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    required: true,
    default: true,
  },
  message: [MessageSchema],
});

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

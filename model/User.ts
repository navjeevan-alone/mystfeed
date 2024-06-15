import mongoose, { Document, Schema } from "mongoose";
import { Message, MessageSchema } from "@/model/Message";
import { nullable } from "zod";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string | number | null;
  verifyCodeExpiry: Date | null;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  message: mongoose.Schema.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
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
    type: Schema.Types.Mixed, // Allows string, number, or null
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },

  isAcceptingMessage: {
    type: Boolean,
    required: true,
    default: true,
  },
  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

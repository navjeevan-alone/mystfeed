import mongoose, { Schema, Document } from "mongoose";
import { UserModel } from "@/model/User"; // Adjust the import path as needed

export interface Message extends Document {
  content: string;
  username: string;
  userId?: mongoose.Schema.Types.ObjectId;
  reply: string;
  createdAt: Date;
  isPublished: boolean;
}

const MessageSchema: Schema = new Schema({
  content: { type: String, required: true },
  username: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: false,
  },
  reply: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
});

const MessageModel = mongoose.model<Message>("Message", MessageSchema);

export { MessageSchema, MessageModel };

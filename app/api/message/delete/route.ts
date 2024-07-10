import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { MessageModel } from "@/model/Message";
import {auth } from "@/auth"
export async function DELETE(request: Request) {
  await dbConnect();

  try {
    const session = await auth();
    const username = session?.user.username
    const {messageId } = await request.json();

    // Check if user with the given username exists
    const user = await UserModel.findOne({ username });

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User doesn't exist",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!user.isVerified) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User is not verified",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the message exists and belongs to the user
    const message = await MessageModel.findOne({
      _id: messageId,
      userId: user._id,
    });

    if (!message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message not found or does not belong to the user",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Delete the message
    await MessageModel.deleteOne({ _id: messageId });

    // Remove the message reference from the user's messages
    user.message = user.message.filter(
      (msgId: any) => msgId.toString() !== messageId
    );
    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message deleted successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

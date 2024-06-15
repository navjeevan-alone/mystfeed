import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { MessageModel } from "@/model/Message";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, messageId, reply } = await request.json();

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

    // Check if user is verified
    if (!user.isVerified) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User is not verified",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the message belongs to the user
    if (!user.message.includes(messageId)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message does not belong to the user",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find the message by ID
    const message = await MessageModel.findById(messageId);

    if (!message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Update message reply
    message.reply = reply;
    await message.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message reply updated successfully",
        updatedMessage: message,
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

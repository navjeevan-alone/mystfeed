import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { MessageModel, Message } from "@/model/Message";
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, content } = await request.json();

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

    if (!user.isAcceptingMessage) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User is not accepting messages",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create the message
    const message = await MessageModel.create({
      content,
      username,
      userId: user._id,
    });

    // @ts-ignore working fine
    user.message.push(message);
    await user.save();
    revalidatePath("/")
    // revalidatePath(`/u`)

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully",
        mysticMessage: message,
      }),
      {
        status: 201,
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

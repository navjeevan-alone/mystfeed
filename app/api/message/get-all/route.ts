import { dbConnect } from "@/lib/dbConnect";
import { MessageModel } from "@/model/Message";
import {auth } from "@/auth"

export async function GET(request: Request) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const session = await auth()
    const username = session?.user.username ||  url.searchParams.get("username");
    console.log(username)
    if (!username) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Username is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch all messages by the given username
    const messages = await MessageModel.find({ username });

    if (!messages.length) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No messages found for this username",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Got all messages ",
        messages,
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

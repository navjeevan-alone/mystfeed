import { dbConnect } from "@/lib/dbConnect";
import { MessageModel } from "@/model/Message";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

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

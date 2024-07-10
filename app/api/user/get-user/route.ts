import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { MessageModel } from "@/model/Message";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const identifier = url.searchParams.get("identifier");

    if (!identifier) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Identifier is required",
          user: null,
        }),
        { status: 400 }
      );
    }
    await dbConnect();

    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Couldn't find user",
          user: null,
        }),
        { status: 404 }
      );
    }

    user.isAcceptingMessage = !user.isAcceptingMessage;
    await user.save();

    const message = user.isAcceptingMessage
      ? "Allowed accepting messages"
      : "Denied accepting messages";
    return new Response(JSON.stringify({ success: true, message, user }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
        user: null,
      }),
      { status: 500 }
    );
  }
}

import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { MessageModel } from "@/model/Message";

export async function GET(req: Request) {
  try {
    const { identifier } = await req.json();
    await dbConnect();

    const user = await MessageModel.findOne({ content: "Mystic Message 6" });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Couldn't find user" }),
        { status: 404 }
      );
    }

    user.isAcceptingMessage = !user.isAcceptingMessage;
    await user.save();

    const message = user.isAcceptingMessage
      ? "Allowed accepting messages"
      : "Denied accepting messages";
    return new Response(JSON.stringify({ success: true, message }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

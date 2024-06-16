import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    await dbConnect();

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Could't find user" }),
        {
          status: 404,
        }
      );
    }

    // Toggle the isAcceptingMessages field
    user.isAcceptingMessage = !user.isAcceptingMessage;
    await user.save();

    // Send a successful response with a meaningful message
    const message = user.isAcceptingMessage
      ? "Allowed accepting messages"
      : "Denied accepting messages";
    return new Response(JSON.stringify({ success: true, message }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}

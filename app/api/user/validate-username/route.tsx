import { z } from "zod";
import { usernameSchema } from "@/schemas/signUpSchema";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

const usernameQuerySchema = z.object({
    username: usernameSchema
});

export async function GET(request: Request): Promise<Response> {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get("username")
        };

        const result = usernameQuerySchema.safeParse(queryParam);

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return new Response(
                JSON.stringify({
                    success: false,
                    message: usernameErrors.length > 0 ? usernameErrors.join(",") : "Invalid query parameters"
                }),
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ username: result.data.username });

        if (!user) {
            return new Response(
                JSON.stringify({ success: true, message: "Username is unique" }),
                { status: 200 }
            );
        }

        return new Response(
            JSON.stringify({ success: false, message: "Username already exists, try another!" }),
            { status: 409 }
        );

    } catch (error: any) {
        console.error(error);
        return new Response(
            JSON.stringify({ success: false, message: error.message }),
            { status: 500 }
        );
    }
}

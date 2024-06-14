import { z } from "zod";
import { usernameSchema } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
    username: usernameSchema
});

export async function GET(request: Request): Promise<Response> {
    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get("username")
        };
        const result = usernameQuerySchema.safeParse(queryParam);
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return new Response(JSON.stringify({ success: false, message: usernameErrors.length > 0 ? usernameErrors.join(",") : "Invalid query parameters" }), { status: 400 });
        }
        console.log(result);
        return new Response(JSON.stringify({ success: true, message: "Username is unique" }));
    } catch (error: any) {
        console.log(error);
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}

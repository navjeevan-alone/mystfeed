import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(request: Request): Promise<Response> {
    await dbConnect();
    try {
        const { username, verifyCode } = await request.json();
        const decodedUsername = decodeURIComponent(username);
        console.log("Provided username:", username, "Decoded username:", decodedUsername);

        const user = await UserModel.findOne({ username: decodedUsername });

        console.log("User found:", user);

        if (user !== null) {
            if (user.verifyCode == verifyCode) {
                const now = new Date();
                if (user.verifyCodeExpiry && user.verifyCodeExpiry > now) {
                    // Update the user with isVerified = true and clear verifyCode
                    await UserModel.findOneAndUpdate(
                        { username: decodedUsername },
                        { $set: { isVerified: true, verifyCode: "" } },
                        { new: true } // Return the updated document
                    );

                    console.log(user)
                    return new Response(JSON.stringify({ success: true, message: "Verification successful! Your account is now verified." }), { status: 200 });
                }
                else {
                    return new Response(JSON.stringify({ success: false, message: "Verification code has expired. Please request a new verification code." }), { status: 400 });
                }
            } else {
                return new Response(JSON.stringify({ success: false, message: "Incorrect verification code. Please check the code and try again." }), { status: 400 });
            }
        } else {
            return new Response(JSON.stringify({ success: false, message: "No account found with the provided username. Please check the username and try again." }), { status: 404 });
        }
    } catch (error: any) {
        console.error("Error during verification process:", error);
        return new Response(JSON.stringify({ success: false, message: "An error occurred while processing your request. Please try again later." }), { status: 500 });
    }
}

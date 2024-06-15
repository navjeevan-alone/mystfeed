import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { genVerifyCode } from "@/lib/genVerifyCode";
import { hashPassword, comparePassword } from "@/lib/password";

// export async function POST(request: Request) {
//   await dbConnect();
//   try {
//     const { username, email, password } = await request.json();
//     console.log(username, email, password);
//     const now = new Date();
//     const verifyCodeExpiry = new Date(now.getTime() + 20 * 60000);
//     const { hashedPassword, success, error } = await hashPassword(password);
//     const verifyCode = genVerifyCode();
//     console.log(username, email, hashedPassword, verifyCode, verifyCodeExpiry);
//     if (success && !error) {
//       const user = await UserModel.create({
//         username,
//         email,
//         password: hashedPassword,
//         verifyCode,
//         verifyCodeExpiry,
//         isVerified: false, 
//       });
//       return new Response(JSON.stringify(user), {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   } catch (error: any) {
//     console.log(error.message);
//     return Response.json({ sucess: false, message: "Error registering user" });
//   }
// }

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    // Check if user with the same username exists
    const existingUserByUsername = await UserModel.findOne({ username });
    if (existingUserByUsername) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Username already exists",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user with the same email exists
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email already exists",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Everything good Create uesr
    const now = new Date();
    const verifyCodeExpiry = new Date(now.getTime() + 20 * 60000);
    const { hashedPassword, success, error } = await hashPassword(password);
    const verifyCode = genVerifyCode();
    if (success && !error) {
      const user = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
        isVerified: false,
      });
      return new Response(JSON.stringify(user), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

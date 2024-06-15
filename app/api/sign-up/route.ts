import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { genVerifyCode } from "@/lib/genVerifyCode";
import { hashPassword, comparePassword } from "@/lib/password";
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
      if (existingUserByEmail.isVerified) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Email already exists and is verified",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        // Update existingUserByEmail with new details
        existingUserByEmail.username = username;
        existingUserByEmail.password = JSON.stringify(
          await hashPassword(password)
        );
        existingUserByEmail.verifyCode = genVerifyCode().toString();
        existingUserByEmail.verifyCodeExpiry = new Date(
          new Date().getTime() + 24 * 60 * 60000
        );

        const updatedUser = await existingUserByEmail.save();
        const sendMail = sendVerificationEmail(
          email,
          username,
          existingUserByEmail.verifyCode.toString()
        );

        return new Response(
          JSON.stringify({
            user: updatedUser,
            mailStatus: {
              email,
              username,
              verifyCode: existingUserByEmail.verifyCode,
            },
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Create a new user with the provided details
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

      // Send verification email
      const sendMail = sendVerificationEmail(
        email,
        username,
        verifyCode.toString()
      );

      return new Response(
        JSON.stringify({ user, mailStatus: { email, username, verifyCode } }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

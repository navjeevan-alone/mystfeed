import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { genVerifyCode } from "@/lib/genVerifyCode"; 

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email } = await request.json();

    // Check if user with the same username exists
    const userByUsername = await UserModel.findOne({ username });
    const userByEmail = await UserModel.findOne({ email });

    if (!userByUsername && !userByEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No account found with the provided username or email.",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = userByUsername || userByEmail;
    if ((user !== null) && (user.isVerified ===false)) {
      console.log("old user :",user);
      const newVerifyCode = genVerifyCode().toString();
      const newVerifyCodeExpiry = new Date(new Date().getTime() + 20 * 60000);
       
      580841
      await UserModel.findOneAndUpdate(
          { username },
          {
              $set: {
            verifyCode: newVerifyCode,
            verifyCodeExpiry: newVerifyCodeExpiry,
          },
        },
        { new: true } // Return the updated document
        );
        console.log("New user :",user);

      const sendMail = sendVerificationEmail(
        user.email,
        user.username,
        newVerifyCode
      );

      return new Response(
        JSON.stringify({
          success: true,
          message: "Verification email resent successfully.",
           
          mailStatus: {
            email: user.email,
            username: user.username,
            verifyCode: newVerifyCode,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    else{
              return new Response(
        JSON.stringify({
          success: false,
          message: "User already verified!",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
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

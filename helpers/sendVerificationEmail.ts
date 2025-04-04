import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/verificationEmail2";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "MystFeed <onboarding@resend.dev>",
      to: "navjeevanalone352@gmail.com",
      subject: "MystFeed Verification Code",
      react: VerificationEmail({ username, verifyCode }),
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}

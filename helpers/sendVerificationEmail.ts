import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    return { success: true, message: "Email send successfully" };
  } catch (error: any) {
    console.log("failed to send email", error.message);
    return { success: false, message: "Failed to send Email" };
  }
}

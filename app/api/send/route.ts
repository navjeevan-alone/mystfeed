import EmailTemplate from "@/emails/verificationEmail";
import { Resend } from "resend";
import * as React from "react";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log(request);
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["shrialone352@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({
        username:usename,
        otp:otp,
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
 
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

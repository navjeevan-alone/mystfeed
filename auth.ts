import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserModel } from "@/model/User";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/dbConnect";

const credentialsConfig = {
  credentials: {
    email: {},
    password: {},
  },
  //@ts-ignore
  authorize: async (credentials) => {
    await dbConnect();

    const user = await UserModel.findOne({ email: credentials.email });
    console.log(user);
    if (!user) {
      throw new Error("User not found.");
    }

    // return user object with the their profile data
    return user;
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  // @ts-ignore
  providers: [CredentialsProvider(credentialsConfig)],
});

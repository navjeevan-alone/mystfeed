import { dbConnect } from "@/lib/dbConnect";
import { comparePassword, hashPassword } from "@/lib/password";
import { UserModel } from "@/model/User";
import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

interface CredentialsType {
  email: String;
  password: String;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials: CredentialsType, req: Request) {
        await dbConnect();
        try {
          // Destructure email and password from credentials object
          const { email, password } = credentials;

          // Find user by email in the database
          const user = await UserModel.findOne({
            $or: [{ email }, { username: email }],
          });

          // If user not found, return null (authentication failed)
          if (!user) {
            throw new Error("No User Found!");
          }
          if (user.isVerified) {
            throw new Error("Please verify your email first!");
          }
          const passwordMatch = await comparePassword(
            password.toString(),
            user.password
          );

          // If passwords match, return the user object (authentication successful)
          if (passwordMatch.isMatch) {
            return user;
          } else {
            throw new Error("Passwords didn't match, Try again!");
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null; // Return null on any error (authentication failed)
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user",
    // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET_KEY,
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.email = user.email?.toString();
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user._id = token._id?.toString();
        session.user.username = token.username?.toString();
        //@ts-ignore TODO: check types and solve error
        session.user.isVerified = token.isVerified;
        //@ts-ignore
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.email = token.email?.toString();
      }
      return session;
    },
  },
};

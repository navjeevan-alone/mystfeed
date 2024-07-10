import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Adjust the path as needed
export async function middleware(request) {
    // @ts-ignore
  const url = request.nextUrl.clone();
  const session = await auth(); // Adjust the function call if necessary

  if (!session?.user?.username) {
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to /dashboard/* paths
export const config = {
  matcher: ["/dashboard/:path*"],
};

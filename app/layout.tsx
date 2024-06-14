import type { Metadata } from "next";
import { Inter, Outfit ,Raleway,Poppins} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import AuthProvider from "@/context/AuthProvider";

const fontFamily = Outfit({ subsets: ["latin"],weight:["100","200","300","400"]});

export const metadata: Metadata = {
  title: "MystFeed",
  description: "Generated by create next app",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className={fontFamily.className}><ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
        <Toaster />

      </body>
    </html>
    </AuthProvider>
  );
}

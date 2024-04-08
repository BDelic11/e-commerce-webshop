import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";

import "../globals.css";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ToastProvider from "@/providers/toast-provider";

// const lato = Lato({weight:["100	"], subsets: ["latin"]});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kutak Topline",
  description:
    "Small business webshop that is selling unique, handmade christmas and easter ornaments made with love for you.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          {" "}
          <ToastProvider />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}

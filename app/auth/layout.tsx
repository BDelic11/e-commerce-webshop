import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "Authentification",
  description:
    "This is authentification page for login and register of my webshop",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

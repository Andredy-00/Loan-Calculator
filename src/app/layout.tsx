import type { Metadata } from "next";
import "./globals.css";
import { lato } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Loan Calculator",
  description: "Loan Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-white flex justify-center p-5 ${lato.className}`}>
        {children}
      </body>
    </html>
  );
}

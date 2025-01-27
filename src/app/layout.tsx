import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-white flex justify-center p-2">
        {children}
      </body>
    </html>
  );
}

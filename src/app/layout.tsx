import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cafe Billing System",
  description: "A modern cafe billing management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-amber-50 to-orange-100">
        {children}
      </body>
    </html>
  );
}

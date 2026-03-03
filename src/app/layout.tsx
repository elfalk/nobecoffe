import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noble Drip - Enterprise Coffee Platform",
  description: "Your trusted partner for premium coffee in Egypt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

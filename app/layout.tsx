import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VELOCE — Automotive Atelier",
  description: "An immersive collection of luxury, performance and electric automobiles.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

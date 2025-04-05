import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plaform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="w-screen h-screen flex flex-col">{children}</body>
    </html>
  );
}

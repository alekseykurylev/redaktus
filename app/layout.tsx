import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Redaktus",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`bg-gray-200 antialiased`}>{children}</body>
    </html>
  );
}

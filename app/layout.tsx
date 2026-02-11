import type { Metadata } from "next";


import { Zen_Kurenaido } from "next/font/google";

const zenKurenaido = Zen_Kurenaido({
  weight: ["400"],
});

import "./globals.css";

export const metadata: Metadata = {
  title: "Ghost Field Next Client",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${zenKurenaido.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

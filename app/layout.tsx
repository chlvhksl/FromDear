import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FromDear - 크리스마스 선물 상자 🎁",
  description: "친구들과 마음을 주고받는 따뜻한 익명 선물 상자",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}




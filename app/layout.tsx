import type { Metadata } from "next";
import "./globals.css";
import ShutdownNotice from "@/components/ShutdownNotice";

export const metadata: Metadata = {
  title: "FromDear - 선물함 🎁",
  description: "친구들과 마음을 주고받는 따뜻한 익명 선물함",
  metadataBase: new URL('https://fromdear.github.io'),
  openGraph: {
    title: 'FromDear - 선물함 🎁',
    description: '친구들과 마음을 주고받는 따뜻한 익명 선물함',
    url: 'https://fromdear.github.io',
    siteName: 'FromDear',
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: '/icon.png',
  },
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
      <body className="antialiased">
        {children}
        <ShutdownNotice />
      </body>
    </html>
  );
}




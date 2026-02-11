import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "코인던전 | 크립토 실전 퀘스트",
  description: "매일 한 층씩 깨는 크립토 던전. 읽기만 하지 말고, 직접 해보자.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body
        className={`${geistMono.variable}`}
        style={{ fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
      >
        <main className="mx-auto min-h-screen max-w-[480px] px-4 pb-20 pt-12">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}

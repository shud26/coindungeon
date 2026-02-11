import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "코인던전 | 크립토 실전 퀘스트",
  description: "매일 한 층씩 깨는 크립토 던전. 읽기만 하지 말고, 직접 해보자.",
  keywords: ["크립토", "코인", "블록체인", "디파이", "퀘스트", "학습"],
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
        className={`${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: "'Pretendard Variable', Pretendard, -apple-system, sans-serif" }}
      >
        <div className="min-h-screen pb-20">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = 'https://coindungeon.vercel.app';

export const metadata: Metadata = {
  title: {
    default: '코인던전 | 크립토 실전 퀘스트',
    template: '%s | 코인던전',
  },
  description: '매일 한 층씩 깨는 크립토 던전. 비트코인, 메타마스크, DeFi까지 직접 해보며 배우는 암호화폐 입문 가이드.',
  keywords: ['크립토', '암호화폐', '비트코인', '메타마스크', '블록체인', 'DeFi', '코인 입문', '가상화폐 공부', '크립토 퀘스트', '코인던전'],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: '코인던전 | 크립토 실전 퀘스트',
    description: '매일 한 층씩 깨는 크립토 던전. 비트코인, 메타마스크, DeFi까지 직접 해보며 배우는 암호화폐 입문 가이드.',
    url: BASE_URL,
    siteName: '코인던전',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '코인던전 | 크립토 실전 퀘스트',
    description: '매일 한 층씩 깨는 크립토 던전. 직접 해보며 배우는 암호화폐 입문.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'GOOGLE_VERIFICATION_CODE',
  },
  alternates: {
    canonical: BASE_URL,
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Course',
              name: '코인던전 - 크립토 실전 퀘스트',
              description: '매일 한 층씩 깨는 크립토 던전. 비트코인, 메타마스크, DeFi까지 직접 해보며 배우는 암호화폐 입문 가이드.',
              provider: {
                '@type': 'Organization',
                name: '코인던전',
                url: BASE_URL,
              },
              inLanguage: 'ko',
              isAccessibleForFree: true,
              educationalLevel: 'Beginner',
              about: ['암호화폐', '블록체인', '비트코인', 'DeFi'],
            }),
          }}
        />
      </head>
      <body
        className={`${geistMono.variable}`}
        style={{ fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
      >
        <main className="mx-auto min-h-screen max-w-[520px] px-5 pb-24 pt-14">
          {children}
        </main>
        <footer className="mx-auto max-w-[520px] px-5 pb-24 pt-2">
          <div className="border-t border-border pt-5">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-text-quaternary">
              <a href="/glossary" className="transition-colors hover:text-text-tertiary">용어사전</a>
              <a href="/guide" className="transition-colors hover:text-text-tertiary">가이드</a>
              <a href="/about" className="transition-colors hover:text-text-tertiary">소개</a>
              <a href="/contact" className="transition-colors hover:text-text-tertiary">문의</a>
              <a href="/privacy" className="transition-colors hover:text-text-tertiary">개인정보</a>
            </div>
            <p className="mt-4 text-center text-[12px] text-text-quaternary">
              &copy; 2026 코인던전 &middot; 교육 목적이며 투자 조언이 아닙니다
            </p>
          </div>
        </footer>
        <BottomNav />
      </body>
    </html>
  );
}

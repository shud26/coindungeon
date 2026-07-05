import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = 'https://coindungeon.games';

export const metadata: Metadata = {
  title: {
    default: '코인던전 | 크립토를 가장 쉽게 배우는 곳',
    template: '%s | 코인던전',
  },
  description: '시장은 던전이다, 살아서 나가라 — 청산 시뮬레이터 게임과 몬스터 도감으로 배우는 한국어 크립토 교육 사이트. 코인 세금, 디파이, 용어사전까지.',
  keywords: ['크립토', '암호화폐', '비트코인', '코인 세금', '가상자산 과세', '디파이', '에어드랍', '스테이킹', '크립토 용어', '크립토 입문', '코인던전'],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: '코인던전 | 크립토를 가장 쉽게 배우는 곳',
    description: '코인 세금·디파이·에어드랍을 초보 눈높이로 쉽게. 한국어 크립토 교육 사이트.',
    url: BASE_URL,
    siteName: '코인던전',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og/brand`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '코인던전 | 크립토를 가장 쉽게 배우는 곳',
    description: '어려운 크립토를 초보 눈높이로 쉽게 풀어주는 교육 사이트.',
    images: [`${BASE_URL}/api/og/brand`],
  },
  robots: {
    index: true,
    follow: true,
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
              name: '코인던전 - 실전 크립토 수익화',
              description: '펀딩비 차익거래, 에어드랍 파밍, 청산 사냥 등 실전 크립토 수익 전략.',
              provider: {
                '@type': 'Organization',
                name: '코인던전',
                url: BASE_URL,
              },
              inLanguage: 'ko',
              isAccessibleForFree: true,
              educationalLevel: 'Intermediate',
              about: ['암호화폐', '블록체인', '비트코인', 'DeFi'],
            }),
          }}
        />
      </head>
      <body
        className={`${geistMono.variable}`}
        style={{ fontFamily: "'NeoDGM', 'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif" }}
      >
        <TopNav />
        <main className="mx-auto min-h-screen max-w-[520px] px-5 pb-28 pt-12 md:max-w-[880px] md:px-6 md:pb-16 md:pt-28">
          {children}
        </main>
        <footer className="mx-auto max-w-[520px] px-5 pb-28 pt-2 md:max-w-[880px] md:px-6 md:pb-12">
          <div className="border-t border-white/[0.06] pt-6">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-text-quaternary">
              <a href="/glossary" className="transition-colors hover:text-text-secondary">용어사전</a>
              <a href="/playbook" className="transition-colors hover:text-text-secondary">플레이북</a>
              <a href="/about" className="transition-colors hover:text-text-secondary">소개</a>
              <a href="/contact" className="transition-colors hover:text-text-secondary">문의</a>
              <a href="/privacy" className="transition-colors hover:text-text-secondary">개인정보</a>
            </div>
            <p className="mt-4 text-center text-[12px] text-text-quaternary">
              &copy; 2026 코인던전 &middot; 교육 목적이며 투자 조언이 아닙니다
            </p>
          </div>
        </footer>
        <BottomNav />
        <Analytics />
      </body>
    </html>
  );
}

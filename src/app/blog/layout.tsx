import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '크립토 가이드',
  description: '코인 세금, 디파이, 에어드랍, 최신 트렌드까지 — 크립토를 가장 쉽게 풀어주는 가이드 모음.',
  alternates: { canonical: 'https://coindungeon.games/blog' },
  openGraph: {
    url: 'https://coindungeon.games/blog',
    title: '크립토 가이드 | 코인던전',
    description: '크립토를 가장 쉽게 풀어주는 가이드 모음.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

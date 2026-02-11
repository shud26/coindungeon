import type { Metadata } from 'next';

const BASE_URL = 'https://coindungeon.vercel.app';

export const metadata: Metadata = {
  title: '던전 지도 - 크립토 퀘스트 목록',
  description: '1층부터 시작하는 크립토 퀘스트 던전. 비트코인 기초부터 DeFi 스왑까지 단계별로 배우자.',
  openGraph: {
    title: '던전 지도 | 코인던전',
    description: '1층부터 시작하는 크립토 퀘스트 던전. 비트코인 기초부터 DeFi 스왑까지 단계별로 배우자.',
    url: `${BASE_URL}/dungeon`,
  },
  alternates: {
    canonical: `${BASE_URL}/dungeon`,
  },
};

export default function DungeonLayout({ children }: { children: React.ReactNode }) {
  return children;
}

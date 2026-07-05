import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '전략',
  description: '펀딩비 차익거래, 에어드랍 파밍, 청산 사냥 등 실전 크립토 수익 전략.',
  alternates: { canonical: 'https://coindungeon.games/strategies' },
  openGraph: {
    url: 'https://coindungeon.games/strategies',
    title: '전략 | 코인던전',
    description: '실전 크립토 수익 전략을 배우고 실행하세요.',
  },
};

export default function StrategiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '도구',
  description: '펀딩비 계산기, 포지션 사이징 등 크립토 트레이딩 도구.',
  alternates: { canonical: 'https://coindungeon.games/tools' },
  openGraph: {
    url: 'https://coindungeon.games/tools',
    title: '도구 | 코인던전',
    description: '실전 트레이딩에 필요한 계산기와 도구.',
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

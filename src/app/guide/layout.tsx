import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '가이드',
  description: '크립토 입문, 지갑 선택, 거래소 비교 등 실전 가이드를 제공합니다.',
  openGraph: {
    title: '가이드 | 코인던전',
    description: '크립토 입문부터 실전까지. 단계별 가이드.',
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}

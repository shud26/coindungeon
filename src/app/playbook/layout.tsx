import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '플레이북',
  description: '크립토 입문부터 실전까지, 단계별 실전 가이드.',
  openGraph: {
    title: '플레이북 | 코인던전',
    description: '크립토 입문부터 실전까지 단계별 가이드.',
  },
};

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  return children;
}

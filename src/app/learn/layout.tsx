import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '학습',
  description: '크립토 용어사전과 가이드를 통해 암호화폐를 쉽게 배워보세요.',
  openGraph: {
    title: '학습 | 코인던전',
    description: '용어사전 + 가이드로 크립토를 쉽게 배우세요.',
  },
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}

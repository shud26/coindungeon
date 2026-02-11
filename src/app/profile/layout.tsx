import type { Metadata } from 'next';

const BASE_URL = 'https://coindungeon.vercel.app';

export const metadata: Metadata = {
  title: '모험가 프로필 - 레벨 & 진행도',
  description: '코인던전 프로필. 레벨, XP, 스트릭, 퀴즈 점수를 확인하자.',
  openGraph: {
    title: '모험가 프로필 | 코인던전',
    description: '코인던전 프로필. 레벨, XP, 스트릭, 퀴즈 점수를 확인하자.',
    url: `${BASE_URL}/profile`,
  },
  alternates: {
    canonical: `${BASE_URL}/profile`,
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}

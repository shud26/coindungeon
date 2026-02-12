import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '용어사전',
  description: '블록체인, 비트코인, DeFi, NFT 등 크립토 핵심 용어 30개를 쉽게 설명합니다.',
  openGraph: {
    title: '용어사전 | 코인던전',
    description: '크립토 핵심 용어 30개를 쉽게 설명합니다.',
  },
};

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}

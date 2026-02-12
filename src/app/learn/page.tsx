import Link from 'next/link';
import { BookOpen, Compass } from 'lucide-react';
import { glossaryTerms } from '@/data/glossary';
import { guides } from '@/data/guides';

export default function LearnPage() {
  return (
    <div className="ambient-glow stagger">
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-widest text-text-quaternary">Learn</p>
        <h1 className="mt-2 text-3xl font-bold">학습</h1>
        <p className="mt-1 text-sm text-text-tertiary">크립토 지식을 쌓아보세요</p>
      </div>

      <div className="relative z-10 mt-6 flex flex-col gap-4">
        {/* 용어사전 */}
        <Link href="/glossary" className="gradient-border p-5 transition-all hover:scale-[1.01]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-dim">
              <BookOpen size={22} className="text-accent" />
            </div>
            <div>
              <p className="text-base font-bold">용어사전</p>
              <p className="mt-0.5 text-xs text-text-tertiary">
                {glossaryTerms.length}개 크립토 핵심 용어
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            블록체인, 비트코인, DeFi, NFT 등 꼭 알아야 할 용어를 쉽게 설명합니다.
          </p>
        </Link>

        {/* 가이드 */}
        <Link href="/guide" className="gradient-border p-5 transition-all hover:scale-[1.01]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success-dim">
              <Compass size={22} className="text-success" />
            </div>
            <div>
              <p className="text-base font-bold">가이드</p>
              <p className="mt-0.5 text-xs text-text-tertiary">
                {guides.length}개 실전 가이드
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            크립토 입문, 지갑 선택, 거래소 비교 등 실전에 필요한 가이드.
          </p>
        </Link>
      </div>
    </div>
  );
}

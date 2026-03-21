import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { glossaryTerms } from '@/data/glossary';
import { playbooks } from '@/data/playbooks';

export default function LearnPage() {
  return (
    <div>
      <div>
        <h1 className="text-[28px] font-extrabold tracking-tight">학습</h1>
        <p className="mt-2 text-[15px] text-text-secondary">크립토 지식을 쌓아보세요</p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Link href="/glossary" className="card p-5 group">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-dim text-[22px]">
              📚
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-bold">용어사전</p>
              <p className="mt-1 text-[13px] text-text-tertiary">
                {glossaryTerms.length}개 크립토 핵심 용어
              </p>
            </div>
            <ChevronRight size={18} className="shrink-0 text-text-quaternary opacity-40 group-hover:opacity-70 transition-opacity" />
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">
            블록체인, 비트코인, DeFi, NFT 등 꼭 알아야 할 용어를 쉽게 설명합니다.
          </p>
        </Link>

        <Link href="/playbook" className="card p-5 group">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-[22px]">
              🗺️
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-bold">플레이북</p>
              <p className="mt-1 text-[13px] text-text-tertiary">
                {playbooks.length}개 실전 가이드
              </p>
            </div>
            <ChevronRight size={18} className="shrink-0 text-text-quaternary opacity-40 group-hover:opacity-70 transition-opacity" />
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">
            크립토 입문부터 거래소 비교까지, 실전에 필요한 가이드.
          </p>
        </Link>
      </div>
    </div>
  );
}

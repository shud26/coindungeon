import Link from 'next/link';
import type { GlossaryTerm } from '@/data/glossary';

const categoryStyle: Record<string, string> = {
  기초: 'bg-indigo-500/10 text-indigo-400',
  트레이딩: 'bg-amber-500/10 text-amber-400',
  디파이: 'bg-emerald-500/10 text-emerald-400',
  온체인: 'bg-purple-500/10 text-purple-400',
  보안: 'bg-red-500/10 text-red-400',
  NFT: 'bg-pink-500/10 text-pink-400',
};

export default function GlossaryCard({ term }: { term: GlossaryTerm }) {
  return (
    <Link href={`/glossary/${term.slug}`} className="block card p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold">{term.titleKo}</p>
          <p className="mt-0.5 text-[13px] text-text-quaternary">{term.titleEn}</p>
        </div>
        <span className={`shrink-0 rounded-lg px-2 py-0.5 text-[11px] font-semibold ${categoryStyle[term.category] ?? 'bg-zinc-800 text-zinc-400'}`}>
          {term.category}
        </span>
      </div>
      <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-text-secondary">{term.shortDef}</p>
    </Link>
  );
}

import Link from 'next/link';
import type { GlossaryTerm } from '@/data/glossary';

const categoryStyle: Record<string, string> = {
  기초: 'bg-indigo-50 text-indigo-600',
  트레이딩: 'bg-amber-50 text-amber-600',
  디파이: 'bg-emerald-50 text-emerald-600',
  온체인: 'bg-purple-50 text-purple-600',
  보안: 'bg-red-50 text-red-600',
  NFT: 'bg-pink-50 text-pink-600',
};

export default function GlossaryCard({ term }: { term: GlossaryTerm }) {
  return (
    <Link href={`/glossary/${term.slug}`} className="block card p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold">{term.titleKo}</p>
          <p className="mt-0.5 text-[13px] text-text-quaternary">{term.titleEn}</p>
        </div>
        <span className={`shrink-0 rounded-lg px-2 py-0.5 text-[11px] font-semibold ${categoryStyle[term.category] ?? 'bg-gray-50 text-gray-600'}`}>
          {term.category}
        </span>
      </div>
      <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-text-secondary">{term.shortDef}</p>
    </Link>
  );
}

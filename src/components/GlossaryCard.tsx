import Link from 'next/link';
import type { GlossaryTerm } from '@/data/glossary';

const categoryColors: Record<string, string> = {
  기초: 'text-accent',
  트레이딩: 'text-warning',
  디파이: 'text-success',
  온체인: 'text-[#A78BFA]',
  보안: 'text-danger',
  NFT: 'text-[#F472B6]',
};

export default function GlossaryCard({ term }: { term: GlossaryTerm }) {
  return (
    <Link href={`/glossary/${term.slug}`} className="block card p-4 transition-all active:scale-[0.995]">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold">{term.titleKo}</p>
          <p className="mt-0.5 text-[13px] text-text-quaternary">{term.titleEn}</p>
        </div>
        <span className={`shrink-0 text-[12px] font-medium ${categoryColors[term.category] ?? 'text-accent'}`}>
          {term.category}
        </span>
      </div>
      <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-text-tertiary">{term.shortDef}</p>
    </Link>
  );
}

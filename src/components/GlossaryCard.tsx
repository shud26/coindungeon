import Link from 'next/link';
import type { GlossaryTerm } from '@/data/glossary';

const categoryColors: Record<string, string> = {
  기초: 'bg-accent-dim text-accent',
  트레이딩: 'bg-warning-dim text-warning',
  디파이: 'bg-success-dim text-success',
  온체인: 'bg-[rgba(139,92,246,0.10)] text-[#A78BFA]',
  보안: 'bg-danger-dim text-danger',
  NFT: 'bg-[rgba(236,72,153,0.10)] text-[#F472B6]',
};

export default function GlossaryCard({ term }: { term: GlossaryTerm }) {
  return (
    <Link href={`/glossary/${term.slug}`} className="block card p-4 transition-all active:scale-[0.99]">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold">{term.titleKo}</p>
          <p className="mt-0.5 text-sm text-text-quaternary">{term.titleEn}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[term.category] ?? 'bg-accent-dim text-accent'}`}>
          {term.category}
        </span>
      </div>
      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-text-tertiary">{term.shortDef}</p>
    </Link>
  );
}

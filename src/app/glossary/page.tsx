'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { glossaryTerms, CATEGORIES, type GlossaryCategory } from '@/data/glossary';
import GlossaryCard from '@/components/GlossaryCard';

export default function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GlossaryCategory | '전체'>('전체');

  const filtered = glossaryTerms.filter((t) => {
    const matchCategory = category === '전체' || t.category === category;
    if (!matchCategory) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      t.titleKo.toLowerCase().includes(q) ||
      t.titleEn.toLowerCase().includes(q) ||
      t.shortDef.toLowerCase().includes(q)
    );
  });

  return (
    <div className="ambient-glow stagger">
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-widest text-text-quaternary">Glossary</p>
        <h1 className="mt-2 text-3xl font-bold">용어사전</h1>
        <p className="mt-1 text-sm text-text-tertiary">크립토 핵심 용어 {glossaryTerms.length}개</p>
      </div>

      {/* 검색 */}
      <div className="relative z-10 mt-6 glass-card flex items-center gap-2 px-4 py-2.5">
        <Search size={16} className="shrink-0 text-text-quaternary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="용어 검색..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-text-quaternary"
        />
      </div>

      {/* 카테고리 필터 */}
      <div className="relative z-10 mt-3 flex gap-2 overflow-x-auto no-scrollbar">
        {(['전체', ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              category === c
                ? 'bg-accent text-white'
                : 'bg-bg-elevated text-text-tertiary hover:text-text-secondary'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 결과 */}
      <div className="relative z-10 mt-4 flex flex-col gap-3">
        {filtered.length > 0 ? (
          filtered.map((term) => <GlossaryCard key={term.slug} term={term} />)
        ) : (
          <p className="py-8 text-center text-sm text-text-quaternary">검색 결과가 없어요</p>
        )}
      </div>
    </div>
  );
}

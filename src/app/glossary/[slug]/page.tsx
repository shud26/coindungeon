import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Swords } from 'lucide-react';
import { glossaryTerms, getTermBySlug } from '@/data/glossary';
import { quests } from '@/data/quests';

const BASE_URL = 'https://coindungeon.vercel.app';

export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return { title: '용어를 찾을 수 없습니다' };

  return {
    title: `${term.titleKo} (${term.titleEn})`,
    description: term.shortDef,
    openGraph: {
      title: `${term.titleKo} (${term.titleEn}) | 코인던전 용어사전`,
      description: term.shortDef,
      url: `${BASE_URL}/glossary/${term.slug}`,
    },
    alternates: { canonical: `${BASE_URL}/glossary/${term.slug}` },
  };
}

const categoryColors: Record<string, string> = {
  기초: 'text-accent',
  트레이딩: 'text-warning',
  디파이: 'text-success',
  온체인: 'text-[#A78BFA]',
  보안: 'text-danger',
  NFT: 'text-[#F472B6]',
};

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return <p className="py-20 text-center text-text-quaternary">용어를 찾을 수 없습니다.</p>;

  const relatedTerms = term.relatedTermSlugs.map((s) => getTermBySlug(s)).filter(Boolean);
  const relatedQuests = term.relatedQuestIds.map((id) => quests.find((q) => q.id === id)).filter(Boolean);

  return (
    <div>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: term.titleKo,
            alternateName: term.titleEn,
            description: term.shortDef,
            inDefinedTermSet: {
              '@type': 'DefinedTermSet',
              name: '코인던전 용어사전',
              url: `${BASE_URL}/glossary`,
            },
          }),
        }}
      />

      {/* 뒤로가기 */}
      <div>
        <Link href="/glossary" className="inline-flex items-center gap-1.5 text-sm text-text-quaternary transition-colors hover:text-text-tertiary">
          <ArrowLeft size={15} /> 용어사전
        </Link>
      </div>

      {/* 헤더 */}
      <div className="mt-5">
        <span className={`text-[13px] font-medium ${categoryColors[term.category] ?? 'text-accent'}`}>
          {term.category}
        </span>
        <p className="mt-2 text-[13px] text-text-quaternary">{term.titleEn}</p>
        <h1 className="mt-1 text-[24px] font-bold">{term.titleKo}</h1>
      </div>

      {/* 요약 */}
      <div className="mt-6 card-accent p-5">
        <p className="text-[15px] leading-relaxed text-text-secondary">{term.shortDef}</p>
      </div>

      {/* 상세 설명 */}
      <div className="mt-4 card p-5">
        <div className="space-y-3">
          {term.explanation.split('\n\n').map((para, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-text-secondary" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>').replace(/\n/g, '<br/>') }} />
          ))}
        </div>
      </div>

      {/* 연관 용어 */}
      {relatedTerms.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-accent" />
            <h2 className="text-sm font-semibold">연관 용어</h2>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {relatedTerms.map((rt) => (
              <Link key={rt!.slug} href={`/glossary/${rt!.slug}`} className="rounded-full bg-bg-elevated px-3.5 py-1.5 text-sm text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary">
                {rt!.titleKo}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 연관 퀘스트 */}
      {relatedQuests.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Swords size={15} className="text-success" />
            <h2 className="text-sm font-semibold">연관 퀘스트</h2>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {relatedQuests.map((q) => (
              <Link key={q!.id} href={`/quest/${q!.id}`} className="card flex items-center gap-3 p-4 transition-all active:scale-[0.995]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-dim text-sm font-bold text-accent">{q!.floor}F</span>
                <span className="text-sm">{q!.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

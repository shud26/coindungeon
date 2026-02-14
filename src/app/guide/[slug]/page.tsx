import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Swords } from 'lucide-react';
import { guides, getGuideBySlug } from '@/data/guides';
import { getTermBySlug } from '@/data/glossary';
import { quests } from '@/data/quests';

const BASE_URL = 'https://coindungeon.vercel.app';

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: '가이드를 찾을 수 없습니다' };

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: `${guide.title} | 코인던전 가이드`,
      description: guide.description,
      url: `${BASE_URL}/guide/${guide.slug}`,
    },
    alternates: { canonical: `${BASE_URL}/guide/${guide.slug}` },
  };
}

const difficultyLabel: Record<string, string> = {
  beginner: '입문',
  intermediate: '중급',
  advanced: '고급',
};

const difficultyColor: Record<string, string> = {
  beginner: 'bg-success-dim text-success',
  intermediate: 'bg-warning-dim text-warning',
  advanced: 'bg-danger-dim text-danger',
};

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return <p className="py-20 text-center text-text-quaternary">가이드를 찾을 수 없습니다.</p>;

  const relatedTerms = guide.relatedTermSlugs.map((s) => getTermBySlug(s)).filter(Boolean);
  const relatedQuests = guide.relatedQuestIds.map((id) => quests.find((q) => q.id === id)).filter(Boolean);

  return (
    <div>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.description,
            inLanguage: 'ko',
            publisher: {
              '@type': 'Organization',
              name: '코인던전',
              url: BASE_URL,
            },
            mainEntityOfPage: `${BASE_URL}/guide/${guide.slug}`,
          }),
        }}
      />

      {/* 뒤로가기 */}
      <div>
        <Link href="/guide" className="inline-flex items-center gap-1.5 text-sm text-text-quaternary transition-colors hover:text-text-tertiary">
          <ArrowLeft size={15} /> 가이드
        </Link>
      </div>

      {/* 헤더 */}
      <div className="mt-5">
        <div className="flex items-center gap-2.5">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColor[guide.difficulty]}`}>
            {difficultyLabel[guide.difficulty]}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-quaternary">
            <Clock size={12} /> {guide.estimatedMinutes}분
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-bold leading-tight">{guide.title}</h1>
        <p className="mt-2 text-sm text-text-tertiary">{guide.description}</p>
      </div>

      {/* 섹션 */}
      <div className="mt-8 flex flex-col gap-4">
        {guide.sections.map((section, i) => (
          <div key={i} className="card p-5">
            <h2 className="text-base font-bold">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.content.split('\n\n').map((para, j) => (
                <p key={j} className="text-[15px] leading-relaxed text-text-secondary" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>').replace(/\n/g, '<br/>') }} />
              ))}
            </div>
          </div>
        ))}
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
              <Link key={q!.id} href={`/quest/${q!.id}`} className="card flex items-center gap-3 p-4 transition-all active:scale-[0.99]">
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

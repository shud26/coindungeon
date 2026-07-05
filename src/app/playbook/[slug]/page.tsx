import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Target } from 'lucide-react';
import { playbooks, getPlaybookBySlug } from '@/data/playbooks';
import { getTermBySlug } from '@/data/glossary';
import { strategies } from '@/data/strategies';

const BASE_URL = 'https://coindungeon.games';

export function generateStaticParams() {
  return playbooks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pb = getPlaybookBySlug(slug);
  if (!pb) return { title: '플레이북을 찾을 수 없습니다' };

  return {
    title: pb.title,
    description: pb.description,
    openGraph: {
      title: `${pb.title} | 코인던전 플레이북`,
      description: pb.description,
      url: `${BASE_URL}/playbook/${pb.slug}`,
    },
    alternates: { canonical: `${BASE_URL}/playbook/${pb.slug}` },
  };
}

const difficultyLabel: Record<string, string> = {
  beginner: '입문',
  intermediate: '중급',
  advanced: '고급',
};

const difficultyColor: Record<string, string> = {
  beginner: 'text-success',
  intermediate: 'text-warning',
  advanced: 'text-danger',
};

export default async function PlaybookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pb = getPlaybookBySlug(slug);
  if (!pb) return <p className="py-20 text-center text-text-quaternary">플레이북을 찾을 수 없습니다.</p>;

  const relatedTerms = pb.relatedTermSlugs.map((s) => getTermBySlug(s)).filter(Boolean);
  const relatedStrategies = pb.relatedStrategySlugs.map((s) => strategies.find((st) => st.slug === s)).filter(Boolean);

  return (
    <div>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pb.title,
            description: pb.description,
            inLanguage: 'ko',
            publisher: { '@type': 'Organization', name: '코인던전', url: BASE_URL },
            mainEntityOfPage: `${BASE_URL}/playbook/${pb.slug}`,
          }),
        }}
      />

      {/* 뒤로가기 */}
      <Link href="/playbook" className="inline-flex items-center gap-1.5 text-sm text-text-quaternary transition-colors hover:text-text-tertiary">
        <ArrowLeft size={15} /> 플레이북
      </Link>

      {/* 헤더 */}
      <div className="mt-5">
        <div className="flex items-center gap-2.5">
          <span className={`text-[13px] font-medium ${difficultyColor[pb.difficulty]}`}>
            {difficultyLabel[pb.difficulty]}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-text-quaternary">
            <Clock size={12} /> {pb.estimatedMinutes}분
          </span>
        </div>
        <h1 className="mt-3 text-[24px] font-bold leading-tight">{pb.title}</h1>
        <p className="mt-2 text-[14px] text-text-tertiary">{pb.description}</p>
      </div>

      {/* 섹션 */}
      <div className="mt-8 flex flex-col gap-4">
        {pb.sections.map((section, i) => (
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

      {/* 연관 전략 */}
      {relatedStrategies.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <Target size={15} className="text-success" />
            <h2 className="text-sm font-semibold">연관 전략</h2>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {relatedStrategies.map((s) => (
              <Link key={s!.slug} href={`/strategies/${s!.slug}`} className="card flex items-center gap-3 p-4 transition-all active:scale-[0.995]">
                <span className="text-sm font-medium">{s!.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 연관 용어 */}
      {relatedTerms.length > 0 && (
        <div className="mt-6">
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
    </div>
  );
}

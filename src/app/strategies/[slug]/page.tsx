import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Wrench } from 'lucide-react';
import { strategies } from '@/data/strategies';
import { getTermBySlug } from '@/data/glossary';
import { calculatorTools } from '@/data/tools';
import RecipeHeader from '@/components/RecipeHeader';
import RiskList from '@/components/RiskList';
import StrategyCompleteButton from './StrategyCompleteButton';

const BASE_URL = 'https://coindungeon.vercel.app';

export function generateStaticParams() {
  return strategies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const strategy = strategies.find((s) => s.slug === slug);
  if (!strategy) return { title: '전략을 찾을 수 없습니다' };

  return {
    title: strategy.title,
    description: strategy.subtitle,
    openGraph: {
      title: `${strategy.title} | 코인던전`,
      description: strategy.subtitle,
      url: `${BASE_URL}/strategies/${strategy.slug}`,
    },
    alternates: { canonical: `${BASE_URL}/strategies/${strategy.slug}` },
  };
}

export default async function StrategyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const strategy = strategies.find((s) => s.slug === slug);
  if (!strategy) return <p className="py-20 text-center text-text-quaternary">전략을 찾을 수 없습니다.</p>;

  const relatedTerms = strategy.relatedTermSlugs.map((s) => getTermBySlug(s)).filter(Boolean);
  const relatedTools = strategy.relatedToolSlugs.map((s) => calculatorTools.find((t) => t.slug === s)).filter(Boolean);

  return (
    <div>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: strategy.title,
            description: strategy.subtitle,
            inLanguage: 'ko',
            step: strategy.steps.map((step, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: step.title,
              text: step.content.slice(0, 200),
            })),
            publisher: { '@type': 'Organization', name: '코인던전', url: BASE_URL },
            mainEntityOfPage: `${BASE_URL}/strategies/${strategy.slug}`,
          }),
        }}
      />

      {/* 뒤로가기 */}
      <Link href="/strategies" className="inline-flex items-center gap-1.5 text-sm text-text-quaternary transition-colors hover:text-text-tertiary">
        <ArrowLeft size={15} /> 전략
      </Link>

      {/* 헤더 */}
      <div className="mt-5">
        <span className="text-[13px] font-medium text-accent">{strategy.category}</span>
        <h1 className="mt-2 text-[24px] font-bold leading-tight">{strategy.title}</h1>
        <p className="mt-2 text-[14px] text-text-tertiary">{strategy.subtitle}</p>
      </div>

      {/* 레시피 헤더 */}
      <div className="mt-6">
        <RecipeHeader strategy={strategy} />
      </div>

      {/* 스텝 */}
      <div className="mt-8 flex flex-col gap-4">
        {strategy.steps.map((step, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-dim text-[12px] font-bold text-accent">
                {i + 1}
              </span>
              <h2 className="text-[15px] font-bold">{step.title}</h2>
            </div>
            <div className="mt-3 space-y-3">
              {step.content.split('\n\n').map((para, j) => (
                <p
                  key={j}
                  className="text-[15px] leading-relaxed text-text-secondary"
                  dangerouslySetInnerHTML={{
                    __html: para
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>')
                      .replace(/\n- /g, '<br/>• ')
                      .replace(/\n(\d+)\. /g, '<br/>$1. ')
                      .replace(/\n/g, '<br/>'),
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 리스크 */}
      <div className="mt-6">
        <RiskList risks={strategy.risks} />
      </div>

      {/* 완료 버튼 */}
      <div className="mt-6">
        <StrategyCompleteButton slug={strategy.slug} xp={strategy.xp} />
      </div>

      {/* 연관 도구 */}
      {relatedTools.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <Wrench size={15} className="text-accent" />
            <h3 className="text-sm font-semibold">관련 도구</h3>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {relatedTools.map((tool) => (
              <Link key={tool!.slug} href={`/tools/${tool!.slug}`} className="card flex items-center gap-3 p-4 transition-all active:scale-[0.995]">
                <span className="text-[14px] font-medium">{tool!.title}</span>
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
            <h3 className="text-sm font-semibold">연관 용어</h3>
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

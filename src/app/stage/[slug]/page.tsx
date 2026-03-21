import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { stages, getStageBySlug } from '@/data/stages';
import StageDetail from './StageDetail';

const BASE_URL = 'https://coindungeon.vercel.app';

export function generateStaticParams() {
  return stages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stage = getStageBySlug(slug);
  if (!stage) return { title: '스테이지를 찾을 수 없습니다' };

  return {
    title: `${stage.floor} ${stage.title} - ${stage.subtitle}`,
    description: stage.description,
    openGraph: {
      title: `${stage.floor} ${stage.title} | 코인던전`,
      description: stage.description,
      url: `${BASE_URL}/stage/${stage.slug}`,
    },
    alternates: { canonical: `${BASE_URL}/stage/${stage.slug}` },
  };
}

export default async function StagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stage = getStageBySlug(slug);

  if (!stage) {
    return <p className="py-20 text-center text-text-quaternary">스테이지를 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-quaternary transition-colors hover:text-text-secondary">
        <ArrowLeft size={15} /> 던전 타워
      </Link>

      {/* Header */}
      <div className="mt-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-[28px]"
            style={{ background: stage.bossName ? 'rgba(139,124,255,0.15)' : 'rgba(139,124,255,0.10)' }}
          >
            {stage.icon}
          </div>
          <div>
            <p className="text-[13px] font-bold text-text-quaternary">{stage.floor}</p>
            <h1 className="text-[24px] font-extrabold tracking-tight">{stage.title}</h1>
          </div>
        </div>
        <p className="mt-3 text-[15px] text-text-secondary leading-relaxed">{stage.description}</p>
      </div>

      {/* Client-side interactive part */}
      <StageDetail stageId={stage.id} slug={stage.slug} quests={stage.quests} youtubeVideoId={stage.youtubeVideoId} bossName={stage.bossName} />
    </div>
  );
}

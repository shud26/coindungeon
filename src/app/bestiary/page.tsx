import type { Metadata } from 'next';
import Link from 'next/link';
import { Swords, BookOpen, ChevronDown } from 'lucide-react';
import { floors, getMonstersByFloor, type Monster } from '@/data/bestiary';
import { glossaryTerms } from '@/data/glossary';

export const metadata: Metadata = {
  title: '몬스터 도감',
  description:
    '코인던전 몬스터 도감 — 슬리피지 슬라임부터 블랙스완까지. 크립토 개념이 곧 몬스터의 행동 규칙. 공략법을 안다는 건 개념을 이해했다는 것.',
  alternates: { canonical: 'https://coindungeon.games/bestiary' },
  openGraph: {
    title: '몬스터 도감 | 코인던전',
    description: '슬리피지 슬라임부터 블랙스완까지 — 크립토 개념이 곧 몬스터.',
    url: 'https://coindungeon.games/bestiary',
  },
};

const rankStyle: Record<Monster['rank'], string> = {
  잡몹: 'bg-bg-subtle text-text-tertiary',
  일반: 'bg-accent-dim text-accent',
  엘리트: 'bg-warning-dim text-warning',
  보스: 'bg-danger-dim text-danger',
};

function glossaryTitle(slug: string): string {
  return glossaryTerms.find((t) => t.slug === slug)?.titleKo ?? slug;
}

function MonsterCard({ monster }: { monster: Monster }) {
  return (
    <details className="terminal-card group">
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
        {monster.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={monster.image} alt={monster.name} width={44} height={44} className="shrink-0 rounded-lg" />
        ) : (
          <span className="text-[24px] leading-none">{monster.emoji}</span>
        )}
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="text-[15px] font-bold">{monster.name}</span>
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${rankStyle[monster.rank]}`}>
              {monster.rank}
            </span>
          </span>
          <span className="mt-0.5 block truncate text-[12px] text-text-tertiary">{monster.concept}</span>
        </span>
        <ChevronDown
          size={15}
          className="shrink-0 text-text-quaternary transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="border-t border-white/[0.06] px-4 pb-4 pt-3.5">
        <p className="text-[13px] italic leading-relaxed text-text-tertiary">{monster.memeLine}</p>

        <p className="mono-label mt-4">MECHANISM</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-secondary">{monster.mechanism}</p>

        <p className="mono-label mt-4 !text-accent">공략 = 배움</p>
        <p className="mt-1.5 text-[13.5px] font-medium leading-relaxed">{monster.lesson}</p>

        {monster.glossarySlugs.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {monster.glossarySlugs.map((slug) => (
              <Link
                key={slug}
                href={`/glossary/${slug}`}
                className="tag transition-colors hover:bg-accent-dim hover:text-accent"
              >
                {glossaryTitle(slug)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

export default function BestiaryPage() {
  return (
    <div>
      {/* 헤더 */}
      <div>
        <p className="mono-label">BESTIARY // 도감</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight">몬스터 도감</h1>
        <p className="mt-1.5 text-[14.5px] leading-relaxed text-text-secondary">
          이 던전의 몬스터는 전부 실존한다 — 시장 어딘가에서.
          <br />
          공략법을 안다는 건, 개념을 이해했다는 것.
        </p>
      </div>

      {/* 층별 하강 */}
      <div className="mt-8 flex flex-col gap-9">
        {floors.map((floor) => {
          const list = getMonstersByFloor(floor.depth);
          if (list.length === 0) return null;
          return (
            <section key={floor.depth}>
              <div className="flex items-baseline justify-between">
                <p className="mono-num text-[13px] font-semibold text-accent">{floor.name}</p>
                <p className="mono-label !text-[10px]">DEPTH {floor.depth}</p>
              </div>
              <p className="mt-1 text-[12px] text-text-tertiary">{floor.theme}</p>
              <div className="mt-3 grid gap-2.5 md:grid-cols-2">
                {list.map((m) => (
                  <MonsterCard key={m.slug} monster={m} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* 게임 + 용어사전 연결 */}
      <div className="mt-10 grid grid-cols-2 gap-3">
        <a href="/game" className="terminal-card flex flex-col gap-2 p-4 transition-colors hover:border-accent/40">
          <Swords size={18} className="text-danger" />
          <p className="text-[14px] font-bold">던전 입장</p>
          <p className="text-[11.5px] leading-snug text-text-tertiary">직접 만나러 가기. 청산당해도 책임 안 짐.</p>
        </a>
        <Link
          href="/glossary"
          className="terminal-card flex flex-col gap-2 p-4 transition-colors hover:border-accent/40"
        >
          <BookOpen size={18} className="text-accent" />
          <p className="text-[14px] font-bold">전체 용어사전</p>
          <p className="text-[11.5px] leading-snug text-text-tertiary">
            {glossaryTerms.length}개 용어 전체 열람
          </p>
        </Link>
      </div>
    </div>
  );
}

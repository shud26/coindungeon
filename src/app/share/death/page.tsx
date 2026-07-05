import type { Metadata } from 'next';
import Link from 'next/link';
import { parseDeathParams, deathQueryString } from '@/lib/deathCard';

type SP = Promise<Record<string, string | string[] | undefined>>;

const BASE = 'https://coindungeon.games';

function ogUrl(sp: Record<string, string | string[] | undefined>): string {
  const p = parseDeathParams(sp);
  return `${BASE}/api/og/death?${deathQueryString({
    m: p.monster.key,
    f: String(p.floor),
    k: String(p.kills),
    c: p.cls.key,
    ...(p.clear ? { w: '1' } : {}),
  })}`;
}

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const sp = await searchParams;
  const p = parseDeathParams(sp);
  const title = p.clear
    ? `👑 ${p.cls.name}, 코인던전 정복 완료`
    : `💀 ${p.cls.name}, ${p.monster.name}에게 청산당함`;
  const description = p.clear
    ? '시장은 던전이다. 살아서 나갔다. 너도 도전해봐.'
    : `${p.monster.lesson} — 청산 시뮬레이터에서 미리 죽어보고, 진짜 돈은 지키자.`;
  const img = ogUrl(sp);
  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: { title, description, images: [{ url: img, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
  };
}

export default async function ShareDeathPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const p = parseDeathParams(sp);
  const img = ogUrl(sp);

  return (
    <div className="flex flex-col items-center pt-4 text-center">
      <p className="mono-label">
        {p.clear ? 'CLEAR REPORT' : 'LIQUIDATION REPORT'} // 공유됨
      </p>
      <h1 className="mt-3 text-[26px] font-bold leading-snug tracking-tight">
        {p.clear ? (
          <>👑 던전에서 살아 나간 사람이 나타났다</>
        ) : (
          <>
            💀 누군가 <span className="text-danger">{p.monster.name}</span>에게
            <br />
            청산당했습니다
          </>
        )}
      </h1>

      {/* 카드 이미지 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt="청산 리포트 카드"
        className="terminal-card mt-6 w-full"
        width={1200}
        height={630}
      />

      <p className="mt-5 text-[14px] leading-relaxed text-text-secondary">
        {p.clear ? '시장은 던전이다. 살아서 나가라.' : p.monster.lesson}
      </p>

      <div className="mt-6 flex w-full gap-2.5">
        <a
          href="/game"
          className="glow-accent flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-[14px] font-bold text-black transition-transform active:scale-[0.98]"
        >
          ⚔️ 나도 청산당하러 가기
        </a>
        {!p.clear && (
          <Link
            href={`/glossary/${p.monster.slug}`}
            className="flex items-center justify-center rounded-xl border border-white/[0.09] bg-bg-surface px-5 py-3.5 text-[14px] font-semibold text-text-secondary transition-colors hover:border-white/[0.16] hover:text-text-primary"
          >
            📖 왜 죽었는지 알아보기
          </Link>
        )}
      </div>

      <Link href="/bestiary" className="mt-6 text-[12.5px] text-text-quaternary transition-colors hover:text-text-tertiary">
        이 몬스터의 정체 → 몬스터 도감
      </Link>
    </div>
  );
}

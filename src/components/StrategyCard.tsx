import Link from 'next/link';
import { Zap } from 'lucide-react';
import DifficultyStars from './DifficultyStars';
import type { Strategy } from '@/data/strategies';

const categoryColor: Record<string, string> = {
  차익거래: 'bg-indigo-500/10 text-indigo-400',
  파밍: 'bg-emerald-500/10 text-emerald-400',
  분석: 'bg-amber-500/10 text-amber-400',
  디파이: 'bg-purple-500/10 text-purple-400',
  리스크관리: 'bg-red-500/10 text-red-400',
};

const emojiMap: Record<string, string> = {
  'funding-rate-arbitrage': '💰',
  'airdrop-farming': '🎁',
  'liquidation-hunting': '🎯',
  'smart-money-tracking': '🔍',
  'onchain-data-analysis': '📊',
};

export default function StrategyCard({ strategy }: { strategy: Strategy }) {
  const emoji = emojiMap[strategy.slug] ?? '📈';

  return (
    <Link href={`/strategies/${strategy.slug}`} className="block card p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-dim text-[22px]">
          {emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-bold">{strategy.title}</p>
          <div className="mt-2 flex items-center gap-2">
            <DifficultyStars difficulty={strategy.difficulty} />
            <span className={`rounded-lg px-2 py-0.5 text-[11px] font-semibold ${categoryColor[strategy.category] ?? 'bg-zinc-800 text-zinc-400'}`}>
              {strategy.category}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-text-secondary">{strategy.subtitle}</p>
      <div className="mt-3 flex items-center gap-4 text-[12px]">
        <span className="flex items-center gap-1 font-semibold text-accent">
          <Zap size={12} />{strategy.xp} XP
        </span>
        <span className="text-text-quaternary">수익 {strategy.expectedReturn}</span>
        <span className="text-text-quaternary">자본 {strategy.requiredCapital}</span>
      </div>
    </Link>
  );
}

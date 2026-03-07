import Link from 'next/link';
import { Zap } from 'lucide-react';
import DifficultyStars from './DifficultyStars';
import type { Strategy } from '@/data/strategies';

const categoryColor: Record<string, string> = {
  차익거래: 'bg-indigo-50 text-indigo-600',
  파밍: 'bg-emerald-50 text-emerald-600',
  분석: 'bg-amber-50 text-amber-600',
  디파이: 'bg-purple-50 text-purple-600',
  리스크관리: 'bg-red-50 text-red-600',
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
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-[22px]">
          {emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-bold">{strategy.title}</p>
          <div className="mt-2 flex items-center gap-2">
            <DifficultyStars difficulty={strategy.difficulty} />
            <span className={`rounded-lg px-2 py-0.5 text-[11px] font-semibold ${categoryColor[strategy.category] ?? 'bg-gray-50 text-gray-600'}`}>
              {strategy.category}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-text-secondary">{strategy.subtitle}</p>
      <div className="mt-3 flex items-center gap-4 text-[12px]">
        <span className="flex items-center gap-1 font-semibold text-indigo-500">
          <Zap size={12} />{strategy.xp} XP
        </span>
        <span className="text-text-quaternary">수익 {strategy.expectedReturn}</span>
        <span className="text-text-quaternary">자본 {strategy.requiredCapital}</span>
      </div>
    </Link>
  );
}

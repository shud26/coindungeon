import Link from 'next/link';
import { ArrowLeftRight, Gift, Crosshair, Eye } from 'lucide-react';
import DifficultyStars from './DifficultyStars';
import type { Strategy } from '@/data/strategies';

const iconMap: Record<string, typeof ArrowLeftRight> = {
  ArrowLeftRight,
  Gift,
  Crosshair,
  Eye,
};

const categoryColor: Record<string, string> = {
  차익거래: 'text-accent',
  파밍: 'text-success',
  분석: 'text-warning',
  디파이: 'text-[#A78BFA]',
  리스크관리: 'text-danger',
};

export default function StrategyCard({ strategy }: { strategy: Strategy }) {
  const Icon = iconMap[strategy.icon] ?? ArrowLeftRight;

  return (
    <Link href={`/strategies/${strategy.slug}`} className="block card p-5 transition-all active:scale-[0.995]">
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-dim">
          <Icon size={18} className="text-accent" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold">{strategy.title}</p>
          <div className="mt-1.5 flex items-center gap-2.5">
            <DifficultyStars difficulty={strategy.difficulty} />
            <span className={`text-[12px] font-medium ${categoryColor[strategy.category] ?? 'text-accent'}`}>
              {strategy.category}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-text-tertiary">{strategy.subtitle}</p>
      <div className="mt-3 flex items-center gap-4 text-[12px] text-text-quaternary">
        <span>수익 {strategy.expectedReturn}</span>
        <span>자본 {strategy.requiredCapital}</span>
      </div>
    </Link>
  );
}

import { strategies, STRATEGY_CATEGORIES } from '@/data/strategies';
import StrategyCard from '@/components/StrategyCard';

export default function StrategiesPage() {
  return (
    <div>
      <div>
        <h1 className="text-[28px] font-bold tracking-tight">전략</h1>
        <p className="mt-1.5 text-[15px] text-text-secondary">실전 검증된 크립토 수익 전략</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {STRATEGY_CATEGORIES.map((cat) => {
          const count = strategies.filter((s) => s.category === cat).length;
          return (
            <span key={cat} className="rounded-full bg-bg-elevated px-3 py-1 text-[12px] text-text-tertiary">
              {cat} ({count})
            </span>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {strategies.map((strategy) => (
          <StrategyCard key={strategy.slug} strategy={strategy} />
        ))}
      </div>

      <p className="mt-8 text-center text-[13px] text-text-quaternary">
        더 많은 전략 준비 중...
      </p>
    </div>
  );
}

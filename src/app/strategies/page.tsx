import { strategies, STRATEGY_CATEGORIES } from '@/data/strategies';
import StrategyCard from '@/components/StrategyCard';

export default function StrategiesPage() {
  return (
    <div>
      <div>
        <h1 className="text-[28px] font-extrabold tracking-tight">전략</h1>
        <p className="mt-2 text-[15px] text-text-secondary">실전 검증된 크립토 수익 전략</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {STRATEGY_CATEGORIES.map((cat) => {
          const count = strategies.filter((s) => s.category === cat).length;
          return (
            <span key={cat} className="rounded-lg bg-bg-subtle px-3 py-1.5 text-[12px] font-semibold text-text-tertiary">
              {cat} {count}
            </span>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {strategies.map((strategy) => (
          <StrategyCard key={strategy.slug} strategy={strategy} />
        ))}
      </div>

      <p className="mt-8 text-center text-[13px] text-text-quaternary">
        더 많은 전략이 준비 중입니다
      </p>
    </div>
  );
}

import DifficultyStars from './DifficultyStars';
import type { Strategy } from '@/data/strategies';

export default function RecipeHeader({ strategy }: { strategy: Strategy }) {
  const items = [
    { label: '난이도', value: <DifficultyStars difficulty={strategy.difficulty} />, bg: 'bg-amber-500/10' },
    { label: '예상 수익', value: strategy.expectedReturn, bg: 'bg-emerald-500/10' },
    { label: '필요 자본', value: strategy.requiredCapital, bg: 'bg-indigo-500/10' },
    { label: '소요 시간', value: strategy.timeRequired, bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(({ label, value, bg }) => (
        <div key={label} className={`rounded-2xl ${bg} p-4`}>
          <p className="text-[12px] font-medium text-text-tertiary">{label}</p>
          <div className="mt-1.5 text-[15px] font-bold text-text-primary">{value}</div>
        </div>
      ))}
    </div>
  );
}

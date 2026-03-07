import { TrendingUp, DollarSign, Clock, BarChart3 } from 'lucide-react';
import DifficultyStars from './DifficultyStars';
import type { Strategy } from '@/data/strategies';

export default function RecipeHeader({ strategy }: { strategy: Strategy }) {
  const items = [
    { icon: BarChart3, label: '난이도', value: <DifficultyStars difficulty={strategy.difficulty} /> },
    { icon: TrendingUp, label: '예상 수익', value: strategy.expectedReturn },
    { icon: DollarSign, label: '필요 자본', value: strategy.requiredCapital },
    { icon: Clock, label: '소요 시간', value: strategy.timeRequired },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="card p-3.5">
          <div className="flex items-center gap-1.5 text-text-quaternary">
            <Icon size={12} />
            <span className="text-[12px]">{label}</span>
          </div>
          <div className="mt-1.5 text-[14px] font-semibold">{value}</div>
        </div>
      ))}
    </div>
  );
}

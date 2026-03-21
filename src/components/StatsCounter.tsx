'use client';

import { useEffect, useState } from 'react';
import { loadTowerProgress } from '@/lib/tower-progress';
import { stages } from '@/data/stages';
import type { TowerProgress } from '@/lib/tower-progress';

export default function StatsCounter() {
  const [progress, setProgress] = useState<TowerProgress | null>(null);

  useEffect(() => {
    setProgress(loadTowerProgress());
  }, []);

  if (!progress) return null;

  const currentStage = stages.find((s) => s.id === progress.currentFloor) ?? stages[0];
  const nextGoal = stages.find((s) => !progress.clearedStages.includes(s.id));

  const stats = [
    { label: '현재 층', value: currentStage.floor, sub: currentStage.title },
    { label: '누적 수익', value: `$${progress.cumulativeEarnings.toFixed(2)}`, sub: '실제 수익' },
    { label: '클리어', value: `${progress.clearedStages.length}/6`, sub: '스테이지' },
    { label: '다음 목표', value: nextGoal ? `$${nextGoal.requiredEarnings}` : '🏆', sub: nextGoal?.subtitle ?? '클리어!' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl bg-bg-surface p-3 text-center" style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}>
          <p className="text-[16px] font-extrabold text-accent">{s.value}</p>
          <p className="mt-0.5 text-[10px] font-medium text-text-quaternary">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

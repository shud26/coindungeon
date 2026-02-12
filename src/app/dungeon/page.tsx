'use client';

import { useEffect, useState } from 'react';
import QuestCard from '@/components/QuestCard';
import ProgressBar from '@/components/ProgressBar';
import { quests } from '@/data/quests';
import { loadProgress, isQuestUnlocked } from '@/lib/progress';
import type { UserProgress } from '@/lib/progress';

export default function DungeonPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  useEffect(() => { setProgress(loadProgress()); }, []);
  if (!progress) return null;

  const done = progress.completedQuests.length;

  return (
    <div className="ambient-glow">
      {/* Header */}
      <div className="relative z-10">
        <p className="text-[11px] font-medium uppercase tracking-widest text-text-quaternary">Dungeon Map</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight">던전 지도</h1>
      </div>

      {/* Progress */}
      <div className="relative z-10 mt-4 glass-card p-3.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-tertiary">전체 진행도</span>
          <span className="font-mono text-text-quaternary">{done}/{quests.length}</span>
        </div>
        <ProgressBar progress={(done / quests.length) * 100} shimmer className="mt-2" />
      </div>

      {/* Quest Tower */}
      <div className="relative z-10 mt-6">
        {/* Vertical line */}
        <div className="absolute left-[22px] top-4 bottom-4 w-px bg-border" />

        <div className="stagger space-y-2.5">
          {quests.map(quest => {
            const completed = progress.completedQuests.includes(quest.id);
            const unlocked = isQuestUnlocked(quest.id, progress.completedQuests);
            const step = progress.currentStep[quest.id];
            const inProgress = step !== undefined && step > 0 && !completed;

            const status = completed ? 'completed' as const
              : !unlocked ? 'locked' as const
              : inProgress ? 'in-progress' as const
              : 'available' as const;

            return (
              <QuestCard
                key={quest.id}
                quest={quest}
                status={status}
                currentStep={inProgress ? step : undefined}
              />
            );
          })}
        </div>
      </div>

      {/* Coming soon */}
      <div className="relative z-10 mt-6 glass-card p-6 text-center">
        <p className="text-xs text-text-quaternary">31~50층 업데이트 예정</p>
        <p className="mt-1 text-[11px] text-text-quaternary">고급 DeFi · 에어드랍 파밍 · 크로스체인 · Web3 커리어</p>
      </div>
    </div>
  );
}

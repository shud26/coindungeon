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
    <>
      <h1 className="text-xl font-bold tracking-tight">던전 지도</h1>

      <div className="mt-4 flex items-center justify-between text-xs text-text-quaternary">
        <span>전체 진행도</span>
        <span className="font-mono">{done}/{quests.length}</span>
      </div>
      <ProgressBar progress={(done / quests.length) * 100} className="mt-1.5" />

      <div className="mt-6 space-y-2">
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

      <p className="mt-6 text-center text-xs text-text-quaternary">
        11~50층 업데이트 예정
      </p>
    </>
  );
}

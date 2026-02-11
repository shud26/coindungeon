'use client';

import { useEffect, useState } from 'react';
import QuestCard from '@/components/QuestCard';
import { quests } from '@/data/quests';
import { loadProgress, isQuestUnlocked } from '@/lib/progress';
import type { UserProgress } from '@/lib/progress';

export default function DungeonPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-text-secondary">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 pt-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          <span className="text-primary">🗺️</span> 던전 지도
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          {progress.completedQuests.length}/{quests.length}층 클리어
        </p>
      </div>

      {/* Dungeon Path */}
      <div className="space-y-3">
        {quests.map((quest) => {
          const isCompleted = progress.completedQuests.includes(quest.id);
          const unlocked = isQuestUnlocked(quest.id, progress.completedQuests);
          const currentStep = progress.currentStep[quest.id];
          const hasProgress = currentStep !== undefined && currentStep > 0 && !isCompleted;

          let status: 'locked' | 'available' | 'in-progress' | 'completed';
          if (isCompleted) {
            status = 'completed';
          } else if (!unlocked) {
            status = 'locked';
          } else if (hasProgress) {
            status = 'in-progress';
          } else {
            status = 'available';
          }

          return (
            <QuestCard
              key={quest.id}
              quest={quest}
              status={status}
              currentStep={hasProgress ? currentStep : undefined}
            />
          );
        })}
      </div>

      {/* Coming Soon */}
      <div className="mt-6 rounded-xl border border-dashed border-border bg-surface/50 p-6 text-center">
        <p className="text-text-disabled">11~50층 업데이트 예정...</p>
        <p className="mt-1 text-xs text-text-disabled">
          디파이, NFT, DAO, 에어드랍 퀘스트가 추가돼요
        </p>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import QuestCard from '@/components/QuestCard';
import ProgressBar from '@/components/ProgressBar';
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
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const completedCount = progress.completedQuests.length;
  const progressPct = (completedCount / quests.length) * 100;

  return (
    <div className="mx-auto max-w-md px-5 pt-10 pb-8">
      {/* Header */}
      <div className="mb-2 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-dim">
          <MapPin size={16} className="text-primary" />
        </div>
        <h1 className="text-xl font-bold">던전 지도</h1>
      </div>

      {/* Overall progress */}
      <div className="mb-6 mt-4 rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">전체 진행도</span>
          <span className="font-mono text-xs text-text-disabled">
            {completedCount} / {quests.length}
          </span>
        </div>
        <ProgressBar progress={progressPct} className="mt-2.5" />
      </div>

      {/* Quest List */}
      <div className="space-y-2.5">
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
      <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface/30 p-8 text-center">
        <p className="text-sm text-text-disabled">11~50층 업데이트 예정</p>
        <p className="mt-1 text-xs text-text-disabled">
          DeFi, NFT, DAO, 에어드랍 퀘스트
        </p>
      </div>
    </div>
  );
}

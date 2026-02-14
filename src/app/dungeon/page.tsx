'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import QuestCard from '@/components/QuestCard';
import ProgressBar from '@/components/ProgressBar';
import { staggerContainer, staggerItem } from '@/components/Motion';
import { quests } from '@/data/quests';
import { loadProgress, isQuestUnlocked } from '@/lib/progress';
import type { UserProgress } from '@/lib/progress';

export default function DungeonPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  useEffect(() => { setProgress(loadProgress()); }, []);
  if (!progress) return null;

  const done = progress.completedQuests.length;

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      {/* Header */}
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold tracking-tight">던전 지도</h1>
        <p className="mt-1 text-sm text-text-tertiary">퀘스트를 하나씩 클리어하며 올라가세요</p>
      </motion.div>

      {/* Progress */}
      <motion.div variants={staggerItem} className="mt-6 card p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-tertiary">전체 진행도</span>
          <span className="text-text-quaternary">{done}/{quests.length}</span>
        </div>
        <ProgressBar progress={(done / quests.length) * 100} className="mt-3" />
      </motion.div>

      {/* Quest List */}
      <motion.div variants={staggerItem} className="mt-8 space-y-3">
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
      </motion.div>

      {/* Coming soon */}
      <motion.div variants={staggerItem} className="mt-8 card p-6 text-center">
        <p className="text-sm text-text-tertiary">31~50층 업데이트 예정</p>
        <p className="mt-1 text-xs text-text-quaternary">고급 DeFi, 에어드랍, 크로스체인, Web3 커리어</p>
      </motion.div>
    </motion.div>
  );
}

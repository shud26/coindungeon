'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Clock, Swords } from 'lucide-react';
import LevelBadge from '@/components/LevelBadge';
import ProgressBar from '@/components/ProgressBar';
import StreakCounter from '@/components/StreakCounter';
import { staggerContainer, staggerItem } from '@/components/Motion';
import { loadProgress, saveProgress, updateStreak, getLevel, getNextQuestId } from '@/lib/progress';
import { getQuestById, quests } from '@/data/quests';
import type { UserProgress } from '@/lib/progress';

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const p = loadProgress();
    const updated = updateStreak(p);
    if (updated !== p) saveProgress(updated);
    setProgress(updated);
  }, []);

  if (!progress) return null;

  const level = getLevel(progress.xp);
  const nextId = getNextQuestId(progress.completedQuests);
  const nextQuest = getQuestById(nextId);
  const done = progress.completedQuests.length;

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      {/* Hero */}
      <motion.div variants={staggerItem} className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">코인던전</h1>
        <p className="mt-2 text-sm text-text-tertiary">매일 한 층씩, 크립토를 정복하자</p>
      </motion.div>

      {/* Level Card */}
      <motion.div variants={staggerItem} className="mt-8 card-elevated p-6">
        <div className="flex items-center gap-4">
          <LevelBadge level={level.level} size="lg" />
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <span className="text-base font-semibold">{level.title}</span>
              <span className="text-xs text-text-quaternary">{progress.xp} XP</span>
            </div>
            <ProgressBar progress={level.progress} className="mt-3" />
            <div className="mt-2 flex justify-between text-xs text-text-quaternary">
              <span>Lv.{level.level}</span>
              <span>{level.nextXp - level.currentXp} to next</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
          <div className="text-center">
            <StreakCounter streak={progress.streak} />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Swords size={13} className="text-text-quaternary" />
              <span className="text-sm font-semibold">{done}</span>
              <span className="text-xs text-text-quaternary">/{quests.length}</span>
            </div>
            <p className="mt-1 text-xs text-text-quaternary">클리어</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">{nextId}<span className="text-text-quaternary">F</span></p>
            <p className="mt-1 text-xs text-text-quaternary">현재 층</p>
          </div>
        </div>
      </motion.div>

      {/* Next Quest */}
      {nextQuest && (
        <motion.div variants={staggerItem} className="mt-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-quaternary">
            Next Quest
          </p>
          <Link
            href={`/quest/${nextQuest.id}`}
            className="card-accent group block p-5 transition-all active:scale-[0.99]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-dim text-lg font-bold text-accent">
                {nextQuest.floor}
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-semibold">{nextQuest.title}</p>
                <p className="mt-1 text-sm text-text-tertiary">{nextQuest.description}</p>
                <div className="mt-2.5 flex items-center gap-3 text-xs text-text-quaternary">
                  <span className="flex items-center gap-1"><Zap size={12} className="text-accent" />{nextQuest.xp} XP</span>
                  <span className="flex items-center gap-1"><Clock size={12} />~{nextQuest.estimatedMinutes}분</span>
                </div>
              </div>
              <ChevronRight size={16} className="mt-1 shrink-0 text-text-quaternary transition-transform group-hover:translate-x-0.5" />
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-white">
              시작하기
            </div>
          </Link>
        </motion.div>
      )}

      {/* Completed */}
      {done > 0 && (
        <motion.div variants={staggerItem} className="mt-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-quaternary">Completed</p>
          <div className="space-y-1.5">
            {progress.completedQuests.slice(-3).reverse().map(id => {
              const q = getQuestById(id);
              if (!q) return null;
              return (
                <div key={id} className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success-dim">
                    <span className="text-xs font-bold text-success">{q.floor}</span>
                  </div>
                  <span className="flex-1 text-sm text-text-secondary">{q.title}</span>
                  <span className="text-xs text-success">+{q.xp}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* All clear */}
      {done === quests.length && (
        <motion.div variants={staggerItem} className="mt-8 card p-6 text-center">
          <p className="text-lg font-bold text-success">All Clear</p>
          <p className="mt-1 text-sm text-text-tertiary">새로운 퀘스트가 곧 추가돼.</p>
        </motion.div>
      )}
    </motion.div>
  );
}

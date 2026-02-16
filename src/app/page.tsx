'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Clock, Flame, Swords } from 'lucide-react';
import LevelBadge from '@/components/LevelBadge';
import ProgressBar from '@/components/ProgressBar';
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
      <motion.div variants={staggerItem}>
        <h1 className="text-[28px] font-bold tracking-tight leading-tight">코인던전</h1>
        <p className="mt-1.5 text-[15px] text-text-secondary">매일 한 층씩, 크립토를 정복하자</p>
      </motion.div>

      {/* Level Card */}
      <motion.div variants={staggerItem} className="mt-8 card-elevated p-6">
        <div className="flex items-center gap-4">
          <LevelBadge level={level.level} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between">
              <span className="text-[15px] font-semibold">{level.title}</span>
              <span className="text-[13px] text-text-tertiary">{progress.xp} XP</span>
            </div>
            <ProgressBar progress={level.progress} className="mt-3" />
            <div className="mt-2 flex justify-between text-[12px] text-text-quaternary">
              <span>Lv.{level.level}</span>
              <span>{level.nextXp - level.currentXp} to next</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Flame size={13} className={progress.streak > 0 ? 'text-warning' : 'text-text-quaternary'} />
              <span className="text-[15px] font-semibold">{progress.streak}</span>
            </div>
            <p className="mt-0.5 text-[12px] text-text-quaternary">연속</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Swords size={13} className="text-text-quaternary" />
              <span className="text-[15px] font-semibold">{done}<span className="text-text-quaternary font-normal">/{quests.length}</span></span>
            </div>
            <p className="mt-0.5 text-[12px] text-text-quaternary">클리어</p>
          </div>
          <div className="text-center">
            <p className="text-[15px] font-semibold">{nextId}<span className="text-text-quaternary font-normal">F</span></p>
            <p className="mt-0.5 text-[12px] text-text-quaternary">현재 층</p>
          </div>
        </div>
      </motion.div>

      {/* Next Quest */}
      {nextQuest && (
        <motion.div variants={staggerItem} className="mt-10">
          <p className="section-label mb-3">다음 퀘스트</p>
          <Link
            href={`/quest/${nextQuest.id}`}
            className="card-accent group block p-5 transition-all active:scale-[0.995]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-dim text-[15px] font-bold text-accent">
                {nextQuest.floor}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold">{nextQuest.title}</p>
                <p className="mt-1 text-[14px] text-text-tertiary line-clamp-2">{nextQuest.description}</p>
                <div className="mt-3 flex items-center gap-3 text-[12px] text-text-quaternary">
                  <span className="flex items-center gap-1"><Zap size={11} className="text-accent" />{nextQuest.xp} XP</span>
                  <span className="flex items-center gap-1"><Clock size={11} />~{nextQuest.estimatedMinutes}분</span>
                </div>
              </div>
              <ChevronRight size={16} className="mt-1 shrink-0 text-text-quaternary opacity-50 transition-transform group-hover:translate-x-0.5" />
            </div>

            <div className="mt-5 flex items-center justify-center rounded-xl bg-accent py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-hover">
              시작하기
            </div>
          </Link>
        </motion.div>
      )}

      {/* Completed */}
      {done > 0 && (
        <motion.div variants={staggerItem} className="mt-10">
          <p className="section-label mb-3">최근 완료</p>
          <div className="space-y-1">
            {progress.completedQuests.slice(-3).reverse().map(id => {
              const q = getQuestById(id);
              if (!q) return null;
              return (
                <div key={id} className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-success-dim text-[11px] font-semibold text-success">{q.floor}</span>
                  <span className="flex-1 text-[14px] text-text-secondary">{q.title}</span>
                  <span className="text-[12px] text-text-quaternary">+{q.xp}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* All clear */}
      {done === quests.length && (
        <motion.div variants={staggerItem} className="mt-10 card p-6 text-center">
          <p className="text-lg font-bold text-success">All Clear</p>
          <p className="mt-1.5 text-[14px] text-text-tertiary">새로운 퀘스트가 곧 추가돼요.</p>
        </motion.div>
      )}
    </motion.div>
  );
}

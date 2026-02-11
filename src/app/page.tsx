'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Zap, Clock } from 'lucide-react';
import LevelBadge from '@/components/LevelBadge';
import ProgressBar from '@/components/ProgressBar';
import StreakCounter from '@/components/StreakCounter';
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
    <>
      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight">코인던전</h1>
      <p className="mt-1 text-sm text-text-tertiary">크립토 실전 퀘스트</p>

      {/* Level + Stats */}
      <div className="mt-8 rounded-xl border border-border p-4">
        <div className="flex items-center gap-3">
          <LevelBadge level={level.level} size="lg" />
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold">{level.title}</span>
              <span className="font-mono text-xs text-text-quaternary">{progress.xp} XP</span>
            </div>
            <ProgressBar progress={level.progress} className="mt-2" />
            <div className="mt-1 flex justify-between text-[11px] text-text-quaternary">
              <span>Lv.{level.level}</span>
              <span>{level.nextXp - level.currentXp} to next</span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <StreakCounter streak={progress.streak} />
          <div className="flex items-center gap-4 font-mono text-xs text-text-tertiary">
            <span>{done}/{quests.length} 클리어</span>
            <span>{nextId}F</span>
          </div>
        </div>
      </div>

      {/* Next Quest */}
      {nextQuest && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium text-text-quaternary" style={{ letterSpacing: '0.05em' }}>
            NEXT QUEST
          </p>
          <Link
            href={`/quest/${nextQuest.id}`}
            className="group block rounded-xl border border-accent/15 p-4 transition-colors hover:border-accent/30"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-dim font-mono text-sm font-semibold text-accent">
                {nextQuest.floor}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{nextQuest.title}</p>
                <p className="mt-0.5 text-xs text-text-tertiary">{nextQuest.description}</p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-text-quaternary">
                  <span className="flex items-center gap-1"><Zap size={10} />{nextQuest.xp} XP</span>
                  <span className="flex items-center gap-1"><Clock size={10} />~{nextQuest.estimatedMinutes}분</span>
                </div>
              </div>
              <ChevronRight size={16} className="mt-1 shrink-0 text-text-quaternary transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>
      )}

      {/* Completed */}
      {done > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium text-text-quaternary" style={{ letterSpacing: '0.05em' }}>COMPLETED</p>
          <div className="space-y-1">
            {progress.completedQuests.slice(-3).reverse().map(id => {
              const q = getQuestById(id);
              if (!q) return null;
              return (
                <div key={id} className="flex items-center gap-3 rounded-lg p-2 text-sm">
                  <span className="font-mono text-xs text-success">+{q.xp}</span>
                  <span className="text-text-secondary">{q.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All clear */}
      {done === quests.length && (
        <div className="mt-6 rounded-xl border border-success/20 p-5 text-center">
          <p className="text-sm font-semibold text-success">All Clear</p>
          <p className="mt-1 text-xs text-text-tertiary">새로운 퀘스트가 곧 추가돼.</p>
        </div>
      )}
    </>
  );
}

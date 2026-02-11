'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Zap, Clock, Swords } from 'lucide-react';
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
    <div className="ambient-glow stagger">
      {/* Hero */}
      <div className="relative z-10 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-text-quaternary">Crypto Quest Platform</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">코인던전</h1>
        <p className="mt-1 text-sm text-text-tertiary">매일 한 층씩, 크립토를 정복하자</p>
      </div>

      {/* Level Card */}
      <div className="relative z-10 mt-8 glass-card p-5">
        <div className="flex items-center gap-4">
          <LevelBadge level={level.level} size="lg" />
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">{level.title}</span>
              <span className="font-mono text-xs text-text-quaternary">{progress.xp} XP</span>
            </div>
            <ProgressBar progress={level.progress} shimmer className="mt-2.5" />
            <div className="mt-1.5 flex justify-between text-[11px] text-text-quaternary">
              <span>Lv.{level.level}</span>
              <span>{level.nextXp - level.currentXp} to next</span>
            </div>
          </div>
        </div>

        {/* Divider + Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
          <div className="text-center">
            <StreakCounter streak={progress.streak} />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Swords size={12} className="text-text-quaternary" />
              <span className="font-mono text-sm font-semibold">{done}</span>
              <span className="text-[11px] text-text-quaternary">/{quests.length}</span>
            </div>
            <p className="mt-0.5 text-[10px] text-text-quaternary">클리어</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-sm font-semibold">{nextId}<span className="text-text-quaternary">F</span></p>
            <p className="mt-0.5 text-[10px] text-text-quaternary">현재 층</p>
          </div>
        </div>
      </div>

      {/* Next Quest */}
      {nextQuest && (
        <div className="relative z-10 mt-6">
          <p className="mb-2.5 text-[11px] font-medium uppercase tracking-widest text-text-quaternary">
            Next Quest
          </p>
          <Link
            href={`/quest/${nextQuest.id}`}
            className="gradient-border group relative block p-5 transition-all hover:scale-[1.01]"
          >
            <div className="relative z-10 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-dim font-mono text-lg font-bold text-accent badge-glow">
                {nextQuest.floor}
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-semibold">{nextQuest.title}</p>
                <p className="mt-0.5 text-xs text-text-tertiary">{nextQuest.description}</p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-text-quaternary">
                  <span className="flex items-center gap-1"><Zap size={10} className="text-accent" />{nextQuest.xp} XP</span>
                  <span className="flex items-center gap-1"><Clock size={10} />~{nextQuest.estimatedMinutes}분</span>
                </div>
              </div>
              <ChevronRight size={16} className="mt-1 shrink-0 text-text-quaternary transition-transform group-hover:translate-x-0.5" />
            </div>

            {/* CTA bar */}
            <div className="relative z-10 mt-4 flex items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-semibold text-white transition-opacity group-hover:opacity-90">
              시작하기
            </div>
          </Link>
        </div>
      )}

      {/* Completed */}
      {done > 0 && (
        <div className="relative z-10 mt-6">
          <p className="mb-2.5 text-[11px] font-medium uppercase tracking-widest text-text-quaternary">Completed</p>
          <div className="space-y-1">
            {progress.completedQuests.slice(-3).reverse().map(id => {
              const q = getQuestById(id);
              if (!q) return null;
              return (
                <div key={id} className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-success-dim">
                    <span className="text-[10px] font-bold text-success">{q.floor}</span>
                  </div>
                  <span className="flex-1 text-text-secondary">{q.title}</span>
                  <span className="font-mono text-[11px] text-success">+{q.xp}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All clear */}
      {done === quests.length && (
        <div className="relative z-10 mt-6 glass-card p-6 text-center">
          <p className="text-lg font-bold text-success">All Clear</p>
          <p className="mt-1 text-xs text-text-tertiary">새로운 퀘스트가 곧 추가돼.</p>
        </div>
      )}
    </div>
  );
}

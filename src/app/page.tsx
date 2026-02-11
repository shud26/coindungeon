'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swords, Trophy, ChevronRight, Zap, Clock, ArrowRight, Check } from 'lucide-react';
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

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const levelInfo = getLevel(progress.xp);
  const nextQuestId = getNextQuestId(progress.completedQuests);
  const nextQuest = getQuestById(nextQuestId);
  const completedCount = progress.completedQuests.length;
  const totalQuests = quests.length;

  return (
    <div className="mx-auto max-w-md px-5 pt-10 pb-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[28px] font-bold tracking-tight">
          <span className="gradient-text">코인던전</span>
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          매일 한 층씩 깨는 크립토 퀘스트
        </p>
      </div>

      {/* Level Card */}
      <div className="mb-5 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center gap-4">
          <LevelBadge level={levelInfo.level} size="lg" />
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-bold">{levelInfo.title}</h2>
              <span className="font-mono text-xs text-text-disabled">
                {progress.xp} XP
              </span>
            </div>
            <ProgressBar progress={levelInfo.progress} className="mt-3" />
            <div className="mt-1.5 flex justify-between text-[11px] text-text-disabled">
              <span>Lv.{levelInfo.level}</span>
              <span>{levelInfo.nextXp - levelInfo.currentXp} XP to next</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        <StreakCounter streak={progress.streak} />
        <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-surface px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-dim">
            <Swords size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-text-disabled">clear</div>
            <div className="font-mono text-lg font-bold leading-tight">
              {completedCount}<span className="text-xs font-normal text-text-disabled">/{totalQuests}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-surface px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-dim">
            <Trophy size={16} className="text-purple" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-text-disabled">floor</div>
            <div className="font-mono text-lg font-bold leading-tight">
              {nextQuestId}<span className="text-xs font-normal text-text-disabled">F</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Quest CTA */}
      {nextQuest && (
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-disabled">
            Next Quest
          </h3>
          <Link
            href={`/quest/${nextQuest.id}`}
            className="group block rounded-2xl border border-primary/15 bg-surface p-5 transition-all hover:border-primary/30 hover:bg-surface-hover"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-dim font-mono text-sm font-bold text-primary">
                {nextQuest.floor}F
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-semibold">{nextQuest.title}</h4>
                <p className="mt-0.5 text-xs text-text-secondary">
                  {nextQuest.description}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-text-disabled">
                  <span className="flex items-center gap-1">
                    <Zap size={10} /> {nextQuest.xp} XP
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> ~{nextQuest.estimatedMinutes}분
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-background transition-opacity group-hover:opacity-90">
              시작하기
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      )}

      {/* All Complete */}
      {completedCount === totalQuests && (
        <div className="mb-6 rounded-2xl border border-success/20 bg-surface p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-success-dim">
            <Trophy size={24} className="text-success" />
          </div>
          <h3 className="mt-3 text-lg font-bold text-success">
            All Clear
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            10층까지 정복 완료. 새로운 퀘스트가 곧 추가돼.
          </p>
        </div>
      )}

      {/* Recent */}
      {completedCount > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-disabled">
            Completed
          </h3>
          <div className="space-y-1.5">
            {progress.completedQuests
              .slice(-3)
              .reverse()
              .map((id) => {
                const q = getQuestById(id);
                if (!q) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success-dim">
                      <Check size={12} className="text-success" strokeWidth={3} />
                    </div>
                    <span className="flex-1 text-sm">{q.title}</span>
                    <span className="font-mono text-[11px] text-success">
                      +{q.xp}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

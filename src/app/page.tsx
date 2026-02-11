'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
        <div className="text-text-secondary">로딩 중...</div>
      </div>
    );
  }

  const levelInfo = getLevel(progress.xp);
  const nextQuestId = getNextQuestId(progress.completedQuests);
  const nextQuest = getQuestById(nextQuestId);
  const completedCount = progress.completedQuests.length;
  const totalQuests = quests.length;

  return (
    <div className="mx-auto max-w-md px-4 pt-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          <span className="text-primary">코인</span>던전
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          매일 한 층씩 깨는 크립토 퀘스트
        </p>
      </div>

      {/* Level + XP Card */}
      <div className="mb-6 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center gap-4">
          <LevelBadge level={levelInfo.level} size="lg" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{levelInfo.title}</h2>
              <span className="font-mono text-sm text-primary">
                {progress.xp} XP
              </span>
            </div>
            <ProgressBar progress={levelInfo.progress} className="mt-2" />
            <p className="mt-1 text-xs text-text-disabled">
              다음 레벨까지 {levelInfo.nextXp - levelInfo.currentXp} XP
            </p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <StreakCounter streak={progress.streak} />
        <div className="flex flex-col items-center justify-center rounded-xl bg-surface px-3 py-2">
          <span className="text-2xl">🗡️</span>
          <div className="text-xs text-text-secondary">클리어</div>
          <div className="font-mono text-lg font-bold text-primary">
            {completedCount}/{totalQuests}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-surface px-3 py-2">
          <span className="text-2xl">🏆</span>
          <div className="text-xs text-text-secondary">현재 층</div>
          <div className="font-mono text-lg font-bold text-warning">
            {nextQuestId}F
          </div>
        </div>
      </div>

      {/* Next Quest */}
      {nextQuest && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold text-text-secondary">
            다음 퀘스트
          </h3>
          <Link
            href={`/quest/${nextQuest.id}`}
            className="pulse-current block rounded-2xl border border-primary/50 bg-surface p-5 transition-all hover:bg-surface-hover"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{nextQuest.emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-xs text-primary">
                    {nextQuest.floor}F
                  </span>
                  <span className="text-xs text-text-disabled">
                    ~{nextQuest.estimatedMinutes}분
                  </span>
                </div>
                <h4 className="mt-1 text-lg font-bold">{nextQuest.title}</h4>
                <p className="text-sm text-text-secondary">
                  {nextQuest.description}
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-primary py-2.5 text-center font-bold text-background">
              퀘스트 시작하기
            </div>
          </Link>
        </div>
      )}

      {/* All Quests Complete */}
      {completedCount === totalQuests && (
        <div className="mb-6 rounded-2xl border border-success/30 bg-surface p-6 text-center">
          <div className="text-5xl">🏆</div>
          <h3 className="mt-3 text-xl font-bold text-success">
            모든 퀘스트 클리어!
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            10층까지 정복했어! 새로운 퀘스트가 곧 추가돼.
          </p>
        </div>
      )}

      {/* Recent Completed */}
      {completedCount > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold text-text-secondary">
            최근 완료
          </h3>
          <div className="space-y-2">
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
                    <span className="text-success">✓</span>
                    <span>{q.emoji}</span>
                    <span className="flex-1 text-sm">{q.title}</span>
                    <span className="font-mono text-xs text-success">
                      +{q.xp} XP
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

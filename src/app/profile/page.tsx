'use client';

import { useEffect, useState } from 'react';
import LevelBadge from '@/components/LevelBadge';
import ProgressBar from '@/components/ProgressBar';
import { loadProgress, getLevel, LEVELS } from '@/lib/progress';
import { quests, getQuestById } from '@/data/quests';
import type { UserProgress } from '@/lib/progress';

export default function ProfilePage() {
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

  const levelInfo = getLevel(progress.xp);
  const completedCount = progress.completedQuests.length;
  const totalXpPossible = quests.reduce((sum, q) => sum + q.xp, 0);

  // Category stats
  const categoryStats: Record<string, { completed: number; total: number }> = {};
  quests.forEach((q) => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { completed: 0, total: 0 };
    }
    categoryStats[q.category].total++;
    if (progress.completedQuests.includes(q.id)) {
      categoryStats[q.category].completed++;
    }
  });

  return (
    <div className="mx-auto max-w-md px-4 pt-8">
      <h1 className="mb-6 text-2xl font-bold">
        <span className="text-primary">⚔️</span> 모험가 프로필
      </h1>

      {/* Level Card */}
      <div className="mb-6 rounded-2xl border border-primary/30 bg-surface p-6 text-center">
        <div className="flex justify-center">
          <LevelBadge level={levelInfo.level} size="lg" />
        </div>
        <h2 className="mt-3 text-xl font-bold text-primary">{levelInfo.title}</h2>
        <p className="mt-1 font-mono text-sm text-text-secondary">
          Lv.{levelInfo.level}
        </p>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-text-disabled">
            <span>XP: {progress.xp}</span>
            <span>다음: {levelInfo.nextXp - levelInfo.currentXp} XP 필요</span>
          </div>
          <ProgressBar progress={levelInfo.progress} className="mt-1" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface p-4 text-center">
          <div className="text-3xl">🔥</div>
          <div className="mt-1 font-mono text-2xl font-bold text-warning">
            {progress.streak}
          </div>
          <div className="text-xs text-text-secondary">연속 일수</div>
        </div>
        <div className="rounded-xl bg-surface p-4 text-center">
          <div className="text-3xl">🗡️</div>
          <div className="mt-1 font-mono text-2xl font-bold text-success">
            {completedCount}
          </div>
          <div className="text-xs text-text-secondary">클리어 퀘스트</div>
        </div>
        <div className="rounded-xl bg-surface p-4 text-center">
          <div className="text-3xl">⭐</div>
          <div className="mt-1 font-mono text-2xl font-bold text-primary">
            {progress.xp}
          </div>
          <div className="text-xs text-text-secondary">총 XP</div>
        </div>
        <div className="rounded-xl bg-surface p-4 text-center">
          <div className="text-3xl">📝</div>
          <div className="mt-1 font-mono text-2xl font-bold text-accent">
            {Object.keys(progress.quizScores).length}
          </div>
          <div className="text-xs text-text-secondary">퀴즈 완료</div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold text-text-secondary">카테고리별 진행</h3>
        <div className="space-y-3">
          {Object.entries(categoryStats).map(([category, stats]) => (
            <div key={category} className="rounded-xl bg-surface p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{category}</span>
                <span className="font-mono text-xs text-text-disabled">
                  {stats.completed}/{stats.total}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${(stats.completed / stats.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Roadmap */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold text-text-secondary">레벨 로드맵</h3>
        <div className="space-y-2">
          {LEVELS.slice(0, 6).map((lvl) => {
            const isCurrentLevel = lvl.level === levelInfo.level;
            const isAchieved = progress.xp >= lvl.requiredXp;
            return (
              <div
                key={lvl.level}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isCurrentLevel
                    ? 'border border-primary/50 bg-primary/10'
                    : 'bg-surface'
                }`}
              >
                <span
                  className={`font-mono text-sm font-bold ${
                    isAchieved ? 'text-success' : 'text-text-disabled'
                  }`}
                >
                  {isAchieved ? '✓' : `Lv.${lvl.level}`}
                </span>
                <span
                  className={`flex-1 ${
                    isCurrentLevel
                      ? 'font-bold text-primary'
                      : isAchieved
                      ? 'text-text-primary'
                      : 'text-text-disabled'
                  }`}
                >
                  {lvl.title}
                </span>
                <span className="font-mono text-xs text-text-disabled">
                  {lvl.requiredXp} XP
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Scores */}
      {Object.keys(progress.quizScores).length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold text-text-secondary">퀴즈 점수</h3>
          <div className="space-y-2">
            {Object.entries(progress.quizScores).map(([qId, score]) => {
              const q = getQuestById(parseInt(qId));
              if (!q) return null;
              return (
                <div
                  key={qId}
                  className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2"
                >
                  <span>{q.emoji}</span>
                  <span className="flex-1 text-sm">{q.title}</span>
                  <span
                    className={`font-mono text-sm font-bold ${
                      score >= 80
                        ? 'text-success'
                        : score >= 50
                        ? 'text-warning'
                        : 'text-accent'
                    }`}
                  >
                    {score}점
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset */}
      <div className="mb-8 text-center">
        <button
          onClick={() => {
            if (confirm('정말 모든 진행도를 초기화할까요?')) {
              localStorage.removeItem('coindungeon-progress');
              window.location.reload();
            }
          }}
          className="text-xs text-text-disabled hover:text-accent"
        >
          진행도 초기화
        </button>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Shield, Flame, Swords, Star, FileText, RotateCcw } from 'lucide-react';
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
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const levelInfo = getLevel(progress.xp);
  const completedCount = progress.completedQuests.length;

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
    <div className="mx-auto max-w-md px-5 pt-10 pb-8">
      {/* Header */}
      <h1 className="mb-8 text-xl font-bold">프로필</h1>

      {/* Level Card */}
      <div className="mb-6 rounded-2xl border border-border bg-surface p-6 text-center">
        <div className="flex justify-center">
          <LevelBadge level={levelInfo.level} size="lg" />
        </div>
        <h2 className="mt-4 text-lg font-bold gradient-text inline-block">{levelInfo.title}</h2>
        <p className="mt-0.5 font-mono text-xs text-text-disabled">
          Level {levelInfo.level}
        </p>
        <div className="mt-4">
          <ProgressBar progress={levelInfo.progress} />
          <div className="mt-1.5 flex justify-between text-[11px] text-text-disabled">
            <span>{progress.xp} XP</span>
            <span>{levelInfo.nextXp - levelInfo.currentXp} to next</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-2 gap-2.5">
        {[
          { Icon: Flame, label: '연속 일수', value: progress.streak, unit: '일', color: 'warning' },
          { Icon: Swords, label: '클리어', value: completedCount, unit: `/${quests.length}`, color: 'success' },
          { Icon: Star, label: '총 XP', value: progress.xp, unit: '', color: 'primary' },
          { Icon: FileText, label: '퀴즈 완료', value: Object.keys(progress.quizScores).length, unit: '개', color: 'purple' },
        ].map(({ Icon, label, value, unit, color }) => (
          <div key={label} className="rounded-2xl border border-border bg-surface p-4">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${color}-dim`}>
              <Icon size={14} className={`text-${color}`} />
            </div>
            <div className="mt-3 font-mono text-2xl font-bold">
              {value}<span className="text-xs font-normal text-text-disabled">{unit}</span>
            </div>
            <div className="mt-0.5 text-[11px] text-text-disabled">{label}</div>
          </div>
        ))}
      </div>

      {/* Category Progress */}
      <div className="mb-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-disabled">
          Categories
        </h3>
        <div className="space-y-2">
          {Object.entries(categoryStats).map(([category, stats]) => (
            <div key={category} className="rounded-xl border border-border bg-surface p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category}</span>
                <span className="font-mono text-[11px] text-text-disabled">
                  {stats.completed}/{stats.total}
                </span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Roadmap */}
      <div className="mb-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-disabled">
          Level Roadmap
        </h3>
        <div className="space-y-1">
          {LEVELS.slice(0, 6).map((lvl) => {
            const isCurrent = lvl.level === levelInfo.level;
            const achieved = progress.xp >= lvl.requiredXp;
            return (
              <div
                key={lvl.level}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 ${
                  isCurrent ? 'border border-primary/20 bg-primary-dim' : 'bg-surface'
                }`}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                  achieved ? 'bg-success-dim' : 'bg-surface-2'
                }`}>
                  {achieved ? (
                    <Shield size={12} className="text-success" />
                  ) : (
                    <span className="font-mono text-[10px] text-text-disabled">{lvl.level}</span>
                  )}
                </div>
                <span className={`flex-1 text-sm ${
                  isCurrent ? 'font-semibold text-primary' : achieved ? 'text-text-primary' : 'text-text-disabled'
                }`}>
                  {lvl.title}
                </span>
                <span className="font-mono text-[10px] text-text-disabled">
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
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-disabled">
            Quiz Scores
          </h3>
          <div className="space-y-1.5">
            {Object.entries(progress.quizScores).map(([qId, score]) => {
              const q = getQuestById(parseInt(qId));
              if (!q) return null;
              return (
                <div
                  key={qId}
                  className="flex items-center gap-3 rounded-xl bg-surface px-3.5 py-2.5"
                >
                  <span className="flex-1 text-sm">{q.title}</span>
                  <span
                    className={`font-mono text-sm font-bold ${
                      score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-accent'
                    }`}
                  >
                    {score}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset */}
      <button
        onClick={() => {
          if (confirm('모든 진행도를 초기화할까요?')) {
            localStorage.removeItem('coindungeon-progress');
            window.location.reload();
          }
        }}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-xs text-text-disabled transition-colors hover:text-accent"
      >
        <RotateCcw size={12} />
        진행도 초기화
      </button>
    </div>
  );
}

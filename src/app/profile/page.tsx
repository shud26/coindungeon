'use client';

import { useEffect, useState } from 'react';
import LevelBadge from '@/components/LevelBadge';
import ProgressBar from '@/components/ProgressBar';
import StreakCounter from '@/components/StreakCounter';
import { loadProgress, getLevel, LEVELS } from '@/lib/progress';
import { quests, getQuestById } from '@/data/quests';
import type { UserProgress } from '@/lib/progress';

export default function ProfilePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  useEffect(() => { setProgress(loadProgress()); }, []);
  if (!progress) return null;

  const level = getLevel(progress.xp);
  const done = progress.completedQuests.length;

  const cats: Record<string, { done: number; total: number }> = {};
  quests.forEach(q => {
    if (!cats[q.category]) cats[q.category] = { done: 0, total: 0 };
    cats[q.category].total++;
    if (progress.completedQuests.includes(q.id)) cats[q.category].done++;
  });

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">프로필</h1>

      {/* Level */}
      <div className="mt-6 rounded-xl border border-border p-5 text-center">
        <div className="flex justify-center"><LevelBadge level={level.level} size="lg" /></div>
        <p className="mt-3 text-sm font-semibold">{level.title}</p>
        <p className="mt-0.5 font-mono text-xs text-text-quaternary">Level {level.level}</p>
        <ProgressBar progress={level.progress} className="mt-3" />
        <div className="mt-1 flex justify-between text-[11px] text-text-quaternary">
          <span>{progress.xp} XP</span>
          <span>{level.nextXp - level.currentXp} to next</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: '스트릭', val: `${progress.streak}일` },
          { label: '클리어', val: `${done}/${quests.length}` },
          { label: '퀴즈', val: `${Object.keys(progress.quizScores).length}` },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border p-3 text-center">
            <p className="font-mono text-lg font-semibold">{s.val}</p>
            <p className="mt-0.5 text-[11px] text-text-quaternary">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-medium text-text-quaternary" style={{ letterSpacing: '0.05em' }}>CATEGORIES</p>
        <div className="space-y-1.5">
          {Object.entries(cats).map(([cat, s]) => (
            <div key={cat} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
              <span className="flex-1 text-sm">{cat}</span>
              <span className="font-mono text-xs text-text-quaternary">{s.done}/{s.total}</span>
              <div className="h-1 w-16 overflow-hidden rounded-full bg-bg-elevated">
                <div className="h-full rounded-full bg-accent" style={{ width: `${s.total > 0 ? (s.done / s.total) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Roadmap */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-medium text-text-quaternary" style={{ letterSpacing: '0.05em' }}>LEVELS</p>
        <div className="space-y-0.5">
          {LEVELS.slice(0, 6).map(lv => {
            const cur = lv.level === level.level;
            const got = progress.xp >= lv.requiredXp;
            return (
              <div key={lv.level} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${cur ? 'bg-accent-dim' : ''}`}>
                <span className={`font-mono text-xs ${got ? 'text-success' : 'text-text-quaternary'}`}>
                  {got ? '✓' : lv.level}
                </span>
                <span className={`flex-1 text-sm ${cur ? 'font-semibold text-accent' : got ? '' : 'text-text-quaternary'}`}>
                  {lv.title}
                </span>
                <span className="font-mono text-[10px] text-text-quaternary">{lv.requiredXp}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz scores */}
      {Object.keys(progress.quizScores).length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium text-text-quaternary" style={{ letterSpacing: '0.05em' }}>QUIZ</p>
          {Object.entries(progress.quizScores).map(([qId, score]) => {
            const q = getQuestById(parseInt(qId));
            if (!q) return null;
            return (
              <div key={qId} className="flex items-center gap-3 py-1.5 text-sm">
                <span className="flex-1 text-text-secondary">{q.title}</span>
                <span className={`font-mono text-xs font-semibold ${score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-danger'}`}>{score}</span>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={() => { if (confirm('모든 진행도를 초기화할까요?')) { localStorage.removeItem('coindungeon-progress'); window.location.reload(); } }}
        className="mt-8 w-full text-center text-xs text-text-quaternary hover:text-danger"
      >
        진행도 초기화
      </button>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import LevelBadge from '@/components/LevelBadge';
import ProgressBar from '@/components/ProgressBar';
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
    <div className="ambient-glow stagger">
      <div className="relative z-10">
        <p className="text-[11px] font-medium uppercase tracking-widest text-text-quaternary">Profile</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight">모험가 프로필</h1>
      </div>

      {/* Level Card */}
      <div className="relative z-10 mt-6 gradient-border p-6 text-center">
        <div className="relative z-10 flex justify-center">
          <LevelBadge level={level.level} size="lg" />
        </div>
        <p className="relative z-10 mt-3 text-lg font-bold">{level.title}</p>
        <p className="relative z-10 mt-0.5 font-mono text-xs text-text-quaternary">Level {level.level}</p>
        <ProgressBar progress={level.progress} shimmer className="relative z-10 mt-4" />
        <div className="relative z-10 mt-1.5 flex justify-between text-[11px] text-text-quaternary">
          <span>{progress.xp} XP</span>
          <span>{level.nextXp - level.currentXp} to next</span>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 mt-4 grid grid-cols-3 gap-2">
        {[
          { label: '스트릭', val: `${progress.streak}일`, sub: '연속' },
          { label: '클리어', val: `${done}`, sub: `/ ${quests.length}` },
          { label: '퀴즈', val: `${Object.keys(progress.quizScores).length}`, sub: '완료' },
        ].map(s => (
          <div key={s.label} className="glass-card p-3 text-center">
            <p className="font-mono text-xl font-bold">{s.val}</p>
            <p className="text-[10px] text-text-quaternary">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="relative z-10 mt-6">
        <p className="mb-2.5 text-[11px] font-medium uppercase tracking-widest text-text-quaternary">Categories</p>
        <div className="space-y-1.5">
          {Object.entries(cats).map(([cat, s]) => (
            <div key={cat} className="glass-card flex items-center gap-3 p-3">
              <span className="flex-1 text-sm font-medium">{cat}</span>
              <span className="font-mono text-xs text-text-quaternary">{s.done}/{s.total}</span>
              <div className="h-1 w-14 overflow-hidden rounded-full bg-bg-elevated">
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${s.total > 0 ? (s.done / s.total) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Roadmap */}
      <div className="relative z-10 mt-6">
        <p className="mb-2.5 text-[11px] font-medium uppercase tracking-widest text-text-quaternary">Levels</p>
        <div className="space-y-0.5">
          {LEVELS.slice(0, 6).map(lv => {
            const cur = lv.level === level.level;
            const got = progress.xp >= lv.requiredXp;
            return (
              <div key={lv.level} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${cur ? 'glass-card border-accent/20' : ''}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded font-mono text-[10px] font-bold ${
                  got ? 'bg-success-dim text-success' : 'bg-bg-elevated text-text-quaternary'
                }`}>
                  {got ? '✓' : lv.level}
                </span>
                <span className={`flex-1 text-sm ${cur ? 'font-semibold text-accent' : got ? '' : 'text-text-quaternary'}`}>
                  {lv.title}
                </span>
                <span className="font-mono text-[10px] text-text-quaternary">{lv.requiredXp} XP</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz scores */}
      {Object.keys(progress.quizScores).length > 0 && (
        <div className="relative z-10 mt-6">
          <p className="mb-2.5 text-[11px] font-medium uppercase tracking-widest text-text-quaternary">Quiz Scores</p>
          {Object.entries(progress.quizScores).map(([qId, score]) => {
            const q = getQuestById(parseInt(qId));
            if (!q) return null;
            return (
              <div key={qId} className="flex items-center gap-3 py-2 text-sm">
                <span className="flex-1 text-text-secondary">{q.title}</span>
                <span className={`font-mono text-xs font-bold ${score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-danger'}`}>{score}</span>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={() => { if (confirm('모든 진행도를 초기화할까요?')) { localStorage.removeItem('coindungeon-progress'); window.location.reload(); } }}
        className="relative z-10 mt-8 w-full text-center text-[11px] text-text-quaternary transition-colors hover:text-danger"
      >
        진행도 초기화
      </button>
    </div>
  );
}

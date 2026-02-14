'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LevelBadge from '@/components/LevelBadge';
import ProgressBar from '@/components/ProgressBar';
import { staggerContainer, staggerItem } from '@/components/Motion';
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
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold tracking-tight">모험가 프로필</h1>
      </motion.div>

      {/* Level Card */}
      <motion.div variants={staggerItem} className="mt-6 card-elevated p-6 text-center">
        <div className="flex justify-center">
          <LevelBadge level={level.level} size="lg" />
        </div>
        <p className="mt-3 text-lg font-bold">{level.title}</p>
        <p className="mt-1 text-xs text-text-quaternary">Level {level.level}</p>
        <ProgressBar progress={level.progress} className="mt-5" />
        <div className="mt-2 flex justify-between text-xs text-text-quaternary">
          <span>{progress.xp} XP</span>
          <span>{level.nextXp - level.currentXp} to next</span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerItem} className="mt-5 grid grid-cols-3 gap-2.5">
        {[
          { label: '스트릭', val: `${progress.streak}일`, sub: '연속' },
          { label: '클리어', val: `${done}`, sub: `/ ${quests.length}` },
          { label: '퀴즈', val: `${Object.keys(progress.quizScores).length}`, sub: '완료' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-xl font-bold">{s.val}</p>
            <p className="mt-1 text-xs text-text-quaternary">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Categories */}
      <motion.div variants={staggerItem} className="mt-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-quaternary">Categories</p>
        <div className="space-y-2">
          {Object.entries(cats).map(([cat, s]) => (
            <div key={cat} className="card flex items-center gap-3 p-4">
              <span className="flex-1 text-sm font-medium">{cat}</span>
              <span className="text-xs text-text-quaternary">{s.done}/{s.total}</span>
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-bg-elevated">
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${s.total > 0 ? (s.done / s.total) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Level Roadmap */}
      <motion.div variants={staggerItem} className="mt-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-quaternary">Levels</p>
        <div className="space-y-1">
          {LEVELS.slice(0, 6).map(lv => {
            const cur = lv.level === level.level;
            const got = progress.xp >= lv.requiredXp;
            return (
              <div key={lv.level} className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${cur ? 'card border-accent/20' : ''}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                  got ? 'bg-success-dim text-success' : 'bg-bg-elevated text-text-quaternary'
                }`}>
                  {got ? '✓' : lv.level}
                </span>
                <span className={`flex-1 text-sm ${cur ? 'font-semibold text-accent' : got ? '' : 'text-text-quaternary'}`}>
                  {lv.title}
                </span>
                <span className="text-xs text-text-quaternary">{lv.requiredXp} XP</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Quiz scores */}
      {Object.keys(progress.quizScores).length > 0 && (
        <motion.div variants={staggerItem} className="mt-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-quaternary">Quiz Scores</p>
          {Object.entries(progress.quizScores).map(([qId, score]) => {
            const q = getQuestById(parseInt(qId));
            if (!q) return null;
            return (
              <div key={qId} className="flex items-center gap-3 py-2.5 text-sm">
                <span className="flex-1 text-text-secondary">{q.title}</span>
                <span className={`text-xs font-bold ${score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-danger'}`}>{score}</span>
              </div>
            );
          })}
        </motion.div>
      )}

      <button
        onClick={() => { if (confirm('모든 진행도를 초기화할까요?')) { localStorage.removeItem('coindungeon-progress'); window.location.reload(); } }}
        className="mt-10 w-full text-center text-xs text-text-quaternary transition-colors hover:text-danger"
      >
        진행도 초기화
      </button>
    </motion.div>
  );
}

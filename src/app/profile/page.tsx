'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LevelBadge from '@/components/LevelBadge';
import ProgressBar from '@/components/ProgressBar';
import { staggerContainer, staggerItem } from '@/components/Motion';
import { loadProgress, getLevel, LEVELS } from '@/lib/progress';
import { strategies, STRATEGY_CATEGORIES } from '@/data/strategies';
import type { UserProgress } from '@/lib/progress';

export default function ProfilePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  useEffect(() => { setProgress(loadProgress()); }, []);
  if (!progress) return null;

  const level = getLevel(progress.xp);
  const done = progress.completedStrategies.length;

  const cats: Record<string, { done: number; total: number }> = {};
  strategies.forEach(s => {
    if (!cats[s.category]) cats[s.category] = { done: 0, total: 0 };
    cats[s.category].total++;
    if (progress.completedStrategies.includes(s.slug)) cats[s.category].done++;
  });

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={staggerItem}>
        <h1 className="text-[28px] font-extrabold tracking-tight">프로필</h1>
      </motion.div>

      {/* Level Card */}
      <motion.div variants={staggerItem} className="mt-6 card-elevated p-6 text-center">
        <div className="flex justify-center">
          <LevelBadge level={level.level} size="lg" />
        </div>
        <p className="mt-4 text-[20px] font-extrabold">{level.title}</p>
        <p className="mt-1 text-[13px] text-text-quaternary">Level {level.level}</p>
        <ProgressBar progress={level.progress} className="mt-5" />
        <div className="mt-2 flex justify-between text-[12px] text-text-quaternary">
          <span className="font-semibold text-accent">{progress.xp} XP</span>
          <span>다음 레벨까지 {level.nextXp - progress.xp} XP</span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerItem} className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-accent-dim p-5 text-center">
          <p className="text-[22px] font-extrabold text-accent">{done}<span className="text-accent/40">/{strategies.length}</span></p>
          <p className="mt-1 text-[12px] font-medium text-text-tertiary">전략 완료</p>
        </div>
        <div className="rounded-2xl bg-emerald-500/10 p-5 text-center">
          <p className="text-[22px] font-extrabold text-emerald-400">{progress.toolsUsed.length}</p>
          <p className="mt-1 text-[12px] font-medium text-text-tertiary">도구 사용</p>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div variants={staggerItem} className="mt-10">
        <p className="section-label mb-4">카테고리별 진행도</p>
        <div className="space-y-2">
          {STRATEGY_CATEGORIES.map((cat) => {
            const s = cats[cat];
            if (!s) return null;
            const pct = s.total > 0 ? (s.done / s.total) * 100 : 0;
            return (
              <div key={cat} className="card flex items-center gap-3 p-4">
                <span className="flex-1 text-[14px] font-semibold">{cat}</span>
                <span className="text-[12px] font-medium text-text-quaternary">{s.done}/{s.total}</span>
                <div className="h-2 w-20 overflow-hidden rounded-full bg-bg-subtle">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #8B7CFF, #A78BFA)' }} />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Level Roadmap */}
      <motion.div variants={staggerItem} className="mt-10">
        <p className="section-label mb-4">레벨 로드맵</p>
        <div className="space-y-1">
          {LEVELS.slice(0, 6).map(lv => {
            const cur = lv.level === level.level;
            const got = progress.xp >= lv.requiredXp;
            return (
              <div key={lv.level} className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${cur ? 'bg-accent-dim' : ''}`}>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-[12px] font-bold text-white"
                  style={{
                    background: got
                      ? 'linear-gradient(135deg, #34D399, #10B981)'
                      : cur
                      ? 'linear-gradient(135deg, #8B7CFF, #A78BFA)'
                      : '#27272A',
                    color: got || cur ? '#fff' : '#52525B',
                  }}
                >
                  {got ? '✓' : lv.level}
                </span>
                <span className={`flex-1 text-[14px] ${cur ? 'font-bold text-accent' : got ? 'font-medium' : 'text-text-quaternary'}`}>
                  {lv.title}
                </span>
                <span className="text-[12px] text-text-quaternary">{lv.requiredXp} XP</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <button
        onClick={() => { if (confirm('모든 진행도를 초기화할까요?')) { localStorage.removeItem('coindungeon-v2-progress'); window.location.reload(); } }}
        className="mt-12 w-full text-center text-[13px] text-text-quaternary transition-colors hover:text-red-500"
      >
        진행도 초기화
      </button>
    </motion.div>
  );
}

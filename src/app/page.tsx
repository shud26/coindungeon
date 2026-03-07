'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Target, Calculator, BookOpen } from 'lucide-react';
import LevelBadge from '@/components/LevelBadge';
import ProgressBar from '@/components/ProgressBar';
import { staggerContainer, staggerItem } from '@/components/Motion';
import { loadProgress, getLevel } from '@/lib/progress';
import { strategies } from '@/data/strategies';
import { calculatorTools } from '@/data/tools';
import type { UserProgress } from '@/lib/progress';

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!progress) return null;

  const level = getLevel(progress.xp);
  const done = progress.completedStrategies.length;
  const recommended = strategies.filter((s) => !progress.completedStrategies.includes(s.slug)).slice(0, 2);

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      {/* Hero */}
      <motion.div variants={staggerItem}>
        <h1 className="text-[28px] font-bold tracking-tight leading-tight">코인던전</h1>
        <p className="mt-1.5 text-[15px] text-text-secondary">실전 크립토 수익화 전략</p>
      </motion.div>

      {/* Level Card */}
      <motion.div variants={staggerItem} className="mt-8 card-elevated p-6">
        <div className="flex items-center gap-4">
          <LevelBadge level={level.level} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between">
              <span className="text-[15px] font-semibold">{level.title}</span>
              <span className="text-[13px] text-text-tertiary">{progress.xp} XP</span>
            </div>
            <ProgressBar progress={level.progress} className="mt-3" />
            <div className="mt-2 flex justify-between text-[12px] text-text-quaternary">
              <span>Lv.{level.level}</span>
              <span>{level.nextXp - level.currentXp} to next</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Target size={13} className="text-accent" />
              <span className="text-[15px] font-semibold">{done}<span className="text-text-quaternary font-normal">/{strategies.length}</span></span>
            </div>
            <p className="mt-0.5 text-[12px] text-text-quaternary">전략</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Calculator size={13} className="text-text-quaternary" />
              <span className="text-[15px] font-semibold">{progress.toolsUsed.length}<span className="text-text-quaternary font-normal">/{calculatorTools.length}</span></span>
            </div>
            <p className="mt-0.5 text-[12px] text-text-quaternary">도구</p>
          </div>
        </div>
      </motion.div>

      {/* 추천 전략 */}
      {recommended.length > 0 && (
        <motion.div variants={staggerItem} className="mt-10">
          <p className="section-label mb-3">추천 전략</p>
          <div className="space-y-3">
            {recommended.map((strategy) => (
              <Link
                key={strategy.slug}
                href={`/strategies/${strategy.slug}`}
                className="card group block p-5 transition-all active:scale-[0.995]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-dim text-[13px] font-bold text-accent">
                    {'★'.repeat(strategy.difficulty)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold">{strategy.title}</p>
                    <p className="mt-1 text-[14px] text-text-tertiary line-clamp-2">{strategy.subtitle}</p>
                    <div className="mt-3 flex items-center gap-3 text-[12px] text-text-quaternary">
                      <span className="flex items-center gap-1"><Zap size={11} className="text-accent" />{strategy.xp} XP</span>
                      <span>{strategy.expectedReturn}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="mt-1 shrink-0 text-text-quaternary opacity-50 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* 바로가기 */}
      <motion.div variants={staggerItem} className="mt-10">
        <p className="section-label mb-3">바로가기</p>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tools" className="card p-4 text-center transition-all active:scale-[0.995]">
            <Calculator size={20} className="mx-auto text-accent" />
            <p className="mt-2 text-[14px] font-semibold">계산기</p>
            <p className="mt-0.5 text-[12px] text-text-quaternary">{calculatorTools.length}개 도구</p>
          </Link>
          <Link href="/learn" className="card p-4 text-center transition-all active:scale-[0.995]">
            <BookOpen size={20} className="mx-auto text-success" />
            <p className="mt-2 text-[14px] font-semibold">학습</p>
            <p className="mt-0.5 text-[12px] text-text-quaternary">용어 + 플레이북</p>
          </Link>
        </div>
      </motion.div>

      {/* All clear */}
      {done === strategies.length && (
        <motion.div variants={staggerItem} className="mt-10 card p-6 text-center">
          <p className="text-lg font-bold text-success">All Clear</p>
          <p className="mt-1.5 text-[14px] text-text-tertiary">모든 전략을 학습했어요!</p>
        </motion.div>
      )}
    </motion.div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, TrendingUp, Calculator, BookOpen, ArrowRight } from 'lucide-react';
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
  const recommended = strategies.filter((s) => !progress.completedStrategies.includes(s.slug)).slice(0, 3);

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      {/* Hero */}
      <motion.div variants={staggerItem} className="relative">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="text-[14px] font-bold text-text-tertiary tracking-wide">COINDUNGEON</span>
        </div>
        <h1 className="mt-5 text-[32px] font-extrabold tracking-tight leading-[1.2]">
          실전 크립토<br />
          <span className="gradient-text">수익 전략</span>
        </h1>
        <p className="mt-3 text-[16px] text-text-secondary leading-relaxed">
          검증된 수익 전략을 배우고, 계산기로 시뮬레이션하고,<br className="hidden sm:block" />
          바로 실행하세요.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={staggerItem} className="mt-8 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-4 text-center">
          <p className="text-[22px] font-extrabold text-indigo-600">{strategies.length}</p>
          <p className="mt-1 text-[12px] font-medium text-indigo-400">전략</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 text-center">
          <p className="text-[22px] font-extrabold text-emerald-600">{calculatorTools.length}</p>
          <p className="mt-1 text-[12px] font-medium text-emerald-400">계산기</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 text-center">
          <p className="text-[22px] font-extrabold text-amber-600">{done}</p>
          <p className="mt-1 text-[12px] font-medium text-amber-400">완료</p>
        </div>
      </motion.div>

      {/* Level Card */}
      <motion.div variants={staggerItem} className="mt-6 card-elevated p-5">
        <div className="flex items-center gap-4">
          <LevelBadge level={level.level} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between">
              <span className="text-[15px] font-bold">{level.title}</span>
              <span className="text-[13px] font-semibold text-accent">{progress.xp} XP</span>
            </div>
            <ProgressBar progress={level.progress} className="mt-3" />
            <p className="mt-2 text-[12px] text-text-quaternary">
              다음 레벨까지 {level.nextXp - progress.xp} XP
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recommended Strategies */}
      {recommended.length > 0 && (
        <motion.div variants={staggerItem} className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">추천 전략</p>
            <Link href="/strategies" className="flex items-center gap-1 text-[13px] font-semibold text-accent">
              전체보기 <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recommended.map((strategy, i) => (
              <Link
                key={strategy.slug}
                href={`/strategies/${strategy.slug}`}
                className="card group block p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-[20px]">
                    {['🎯', '🚀', '📊', '🔍', '💡'][i % 5]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[15px] font-bold">{strategy.title}</p>
                      <span className="tag-accent text-[11px] py-0.5 px-2 rounded-md">
                        {'★'.repeat(strategy.difficulty)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[14px] text-text-tertiary line-clamp-2">{strategy.subtitle}</p>
                    <div className="mt-3 flex items-center gap-4 text-[12px]">
                      <span className="flex items-center gap-1 font-semibold text-accent">
                        <Zap size={12} />{strategy.xp} XP
                      </span>
                      <span className="text-text-quaternary">{strategy.expectedReturn}</span>
                      <span className="text-text-quaternary">{strategy.requiredCapital}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="mt-2 shrink-0 text-text-quaternary opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-70" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Links */}
      <motion.div variants={staggerItem} className="mt-10">
        <p className="section-label mb-4">바로가기</p>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tools" className="card p-5 text-center group">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 transition-transform group-hover:scale-105">
              <Calculator size={22} className="text-indigo-500" />
            </div>
            <p className="mt-3 text-[14px] font-bold">계산기</p>
            <p className="mt-1 text-[12px] text-text-quaternary">{calculatorTools.length}개 도구</p>
          </Link>
          <Link href="/learn" className="card p-5 text-center group">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 transition-transform group-hover:scale-105">
              <BookOpen size={22} className="text-emerald-500" />
            </div>
            <p className="mt-3 text-[14px] font-bold">학습</p>
            <p className="mt-1 text-[12px] text-text-quaternary">용어 + 플레이북</p>
          </Link>
        </div>
      </motion.div>

      {/* All clear */}
      {done === strategies.length && (
        <motion.div variants={staggerItem} className="mt-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 text-center">
          <p className="text-[24px]">🎉</p>
          <p className="mt-2 text-lg font-bold text-emerald-700">All Clear!</p>
          <p className="mt-1 text-[14px] text-emerald-600/70">모든 전략을 학습했어요</p>
        </motion.div>
      )}
    </motion.div>
  );
}

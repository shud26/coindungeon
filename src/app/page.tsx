'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, BookOpen, Target, ArrowRight } from 'lucide-react';
import TowerMap from '@/components/TowerMap';
import { staggerContainer, staggerItem } from '@/components/Motion';
import { strategies } from '@/data/strategies';
import { calculatorTools } from '@/data/tools';

export default function HomePage() {
  return (
    <div>
      {/* Tower Map (Hero + Stats + Tower) */}
      <TowerMap />

      {/* Quick Links */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="mt-10"
      >
        <motion.div variants={staggerItem}>
          <p className="section-label mb-4">바로가기</p>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/strategies" className="card p-4 text-center group">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-accent-dim transition-transform group-hover:scale-105">
                <Target size={18} className="text-accent" />
              </div>
              <p className="mt-2 text-[13px] font-bold">전략</p>
              <p className="mt-0.5 text-[11px] text-text-quaternary">{strategies.length}개</p>
            </Link>
            <Link href="/tools" className="card p-4 text-center group">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 transition-transform group-hover:scale-105">
                <Calculator size={18} className="text-emerald-400" />
              </div>
              <p className="mt-2 text-[13px] font-bold">계산기</p>
              <p className="mt-0.5 text-[11px] text-text-quaternary">{calculatorTools.length}개</p>
            </Link>
            <Link href="/learn" className="card p-4 text-center group">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 transition-transform group-hover:scale-105">
                <BookOpen size={18} className="text-amber-400" />
              </div>
              <p className="mt-2 text-[13px] font-bold">학습</p>
              <p className="mt-0.5 text-[11px] text-text-quaternary">용어+가이드</p>
            </Link>
          </div>
        </motion.div>

        {/* DMASTER Link */}
        <motion.div variants={staggerItem} className="mt-6">
          <a
            href="https://twitter.com/DMASTER_AI"
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex items-center gap-4 p-4"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[18px]"
              style={{ background: 'rgba(139,124,255,0.15)' }}
            >
              👑
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold">DMASTER</p>
              <p className="text-[12px] text-text-tertiary">던전 마스터의 미션과 힌트 @DMASTER_AI</p>
            </div>
            <ArrowRight size={14} className="shrink-0 text-text-quaternary opacity-40 group-hover:opacity-70 transition-opacity" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

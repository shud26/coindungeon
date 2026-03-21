'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StageCard from './StageCard';
import StatsCounter from './StatsCounter';
import { stages } from '@/data/stages';
import { loadTowerProgress } from '@/lib/tower-progress';
import type { TowerProgress } from '@/lib/tower-progress';

export default function TowerMap() {
  const [progress, setProgress] = useState<TowerProgress | null>(null);

  useEffect(() => {
    setProgress(loadTowerProgress());
  }, []);

  if (!progress) return null;

  // Reverse: boss at top, 1F at bottom
  const reversedStages = [...stages].reverse();

  return (
    <div>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-xl flex items-center justify-center text-[16px]"
            style={{ background: 'linear-gradient(135deg, #8B7CFF, #A78BFA)' }}
          >
            ⚔️
          </div>
          <span className="text-[14px] font-bold text-text-tertiary tracking-wide">COINDUNGEON</span>
        </div>
        <h1 className="mt-5 text-[28px] font-extrabold tracking-tight leading-[1.2]">
          바이브코딩으로<br />
          <span className="gradient-text">던전을 공략하라</span>
        </h1>
        <p className="mt-2 text-[14px] text-text-tertiary leading-relaxed">
          코드로 돈 버는 모험. 실제 수익이 곧 진행도.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-6"
      >
        <StatsCounter />
      </motion.div>

      {/* Tower */}
      <div className="mt-8">
        <p className="section-label mb-4">🏰 던전 타워</p>

        {/* Connector line */}
        <div className="relative">
          <div
            className="absolute left-[29px] top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(139,124,255,0.3), rgba(139,124,255,0.05))' }}
          />
          <div className="flex flex-col gap-3">
            {reversedStages.map((stage, i) => (
              <StageCard key={stage.id} stage={stage} progress={progress} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StageCard from '@/components/StageCard';
import StatsCounter from '@/components/StatsCounter';
import { stages } from '@/data/stages';
import { loadTowerProgress } from '@/lib/tower-progress';
import type { TowerProgress } from '@/lib/tower-progress';

export default function StageListPage() {
  const [progress, setProgress] = useState<TowerProgress | null>(null);

  useEffect(() => {
    setProgress(loadTowerProgress());
  }, []);

  if (!progress) return null;

  const reversedStages = [...stages].reverse();

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-[28px] font-extrabold tracking-tight">던전 타워</h1>
        <p className="mt-2 text-[14px] text-text-tertiary">바이브코딩으로 탑을 올라라</p>
      </motion.div>

      <div className="mt-6">
        <StatsCounter />
      </div>

      <div className="mt-8 relative">
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
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Check, Zap } from 'lucide-react';
import { loadProgress, saveProgress, completeStrategy } from '@/lib/progress';

export default function StrategyCompleteButton({ slug, xp }: { slug: string; xp: number }) {
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = loadProgress();
    setCompleted(p.completedStrategies.includes(slug));
  }, [slug]);

  if (!mounted) return null;

  const handleComplete = () => {
    const p = loadProgress();
    const updated = completeStrategy(p, slug, xp);
    saveProgress(updated);
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 py-4 text-[14px] font-bold text-emerald-600">
        <Check size={16} /> 학습 완료
      </div>
    );
  }

  return (
    <button
      onClick={handleComplete}
      className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[14px] font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
      style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
    >
      <Zap size={14} /> 학습 완료 (+{xp} XP)
    </button>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  questTitle: string;
  xpGained: number;
  newLevel?: number;
  levelTitle?: string;
  onClose: () => void;
}

export default function CompletionModal({
  isOpen,
  questTitle,
  xpGained,
  newLevel,
  levelTitle,
  onClose,
}: CompletionModalProps) {
  const [showXp, setShowXp] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowXp(true), 400);
      return () => clearTimeout(timer);
    }
    setShowXp(false);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-in rounded-3xl border border-border bg-surface p-8 text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-dim">
          <Sparkles size={28} className="text-primary" />
        </div>

        <h2 className="mt-5 text-xl font-bold">퀘스트 클리어</h2>
        <p className="mt-1 text-sm text-text-secondary">{questTitle}</p>

        {/* XP */}
        {showXp && (
          <div className="mt-5">
            <div className="xp-float inline-block rounded-full bg-success-dim px-4 py-2 font-mono text-lg font-bold text-success">
              +{xpGained} XP
            </div>
          </div>
        )}

        {/* Level Up */}
        {newLevel && levelTitle && (
          <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-purple/20 bg-purple-dim p-3">
            <TrendingUp size={16} className="text-purple" />
            <span className="text-sm font-semibold text-purple">
              Lv.{newLevel} {levelTitle}
            </span>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          계속하기
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

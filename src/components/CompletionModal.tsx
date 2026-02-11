'use client';

import { useEffect, useState } from 'react';

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
      const timer = setTimeout(() => setShowXp(true), 500);
      return () => clearTimeout(timer);
    }
    setShowXp(false);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="glow-primary w-full max-w-sm rounded-2xl border border-primary/30 bg-surface p-6 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="mt-4 text-2xl font-bold text-primary">퀘스트 클리어!</h2>
        <p className="mt-2 text-text-secondary">{questTitle}</p>

        {showXp && (
          <div className="xp-float mt-4 text-3xl font-bold text-success">
            +{xpGained} XP
          </div>
        )}

        {newLevel && levelTitle && (
          <div className="mt-4 rounded-lg bg-primary/10 p-3">
            <p className="text-sm text-text-secondary">레벨 업!</p>
            <p className="text-lg font-bold text-primary">
              Lv.{newLevel} {levelTitle}
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-primary py-3 font-bold text-background transition-opacity hover:opacity-90"
        >
          계속하기
        </button>
      </div>
    </div>
  );
}

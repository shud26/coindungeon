'use client';

import { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  questTitle: string;
  xpGained: number;
  newLevel?: number;
  levelTitle?: string;
  onClose: () => void;
}

export default function CompletionModal({ isOpen, questTitle, xpGained, newLevel, levelTitle, onClose }: Props) {
  const [showXp, setShowXp] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setShowXp(true), 300);
      return () => clearTimeout(t);
    }
    setShowXp(false);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-sm animate-in rounded-2xl border border-border bg-bg-surface p-6 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">Quest Clear</p>
        <h2 className="mt-2 text-lg font-semibold">{questTitle}</h2>

        {showXp && (
          <div className="mt-4 inline-block rounded-full bg-success-dim px-4 py-1.5 font-mono text-sm font-semibold text-success">
            +{xpGained} XP
          </div>
        )}

        {newLevel && levelTitle && (
          <div className="mt-3 rounded-lg border border-accent/20 bg-accent-dim px-3 py-2 text-sm font-medium text-accent">
            Level {newLevel} — {levelTitle}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          계속하기
        </button>
      </div>
    </div>
  );
}

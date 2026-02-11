'use client';

import { Flame, Moon } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  const active = streak > 0;
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-surface px-4 py-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? 'bg-warning-dim' : 'bg-surface-2'}`}>
        {active ? (
          <Flame size={18} className="text-warning" />
        ) : (
          <Moon size={18} className="text-text-disabled" />
        )}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-text-disabled">streak</div>
        <div className="font-mono text-lg font-bold leading-tight text-text-primary">
          {streak}<span className="text-xs font-normal text-text-disabled">일</span>
        </div>
      </div>
    </div>
  );
}

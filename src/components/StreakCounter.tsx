'use client';

import { Flame } from 'lucide-react';

export default function StreakCounter({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-2">
      <Flame size={14} className={streak > 0 ? 'text-warning' : 'text-text-quaternary'} />
      <span className="text-sm font-semibold">{streak}</span>
      <span className="text-xs text-text-quaternary">일 연속</span>
    </div>
  );
}

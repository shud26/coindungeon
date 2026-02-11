'use client';

import { Flame } from 'lucide-react';

export default function StreakCounter({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-2">
      <Flame size={14} className={streak > 0 ? 'text-warning' : 'text-text-quaternary'} />
      <span className="font-mono text-sm font-semibold">{streak}</span>
      <span className="text-text-quaternary" style={{ fontSize: 12 }}>일 연속</span>
    </div>
  );
}

'use client';

import { Flame } from 'lucide-react';

export default function StreakCounter({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <Flame size={13} className={streak > 0 ? 'text-warning' : 'text-text-quaternary'} />
      <span className="text-[15px] font-semibold">{streak}</span>
      <span className="text-[12px] text-text-quaternary">일</span>
    </div>
  );
}

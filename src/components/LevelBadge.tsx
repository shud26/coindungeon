'use client';

import { Shield } from 'lucide-react';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function LevelBadge({ level, size = 'md' }: LevelBadgeProps) {
  const config = {
    sm: { outer: 'w-8 h-8', text: 'text-xs', icon: 14 },
    md: { outer: 'w-11 h-11', text: 'text-sm', icon: 18 },
    lg: { outer: 'w-16 h-16', text: 'text-xl', icon: 26 },
  }[size];

  return (
    <div
      className={`${config.outer} relative flex items-center justify-center rounded-2xl border border-primary/30 bg-primary-dim`}
    >
      <Shield size={config.icon} className="absolute text-primary/20" />
      <span className={`${config.text} relative z-10 font-mono font-bold text-primary`}>
        {level}
      </span>
    </div>
  );
}

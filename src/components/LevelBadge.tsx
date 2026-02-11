'use client';

export default function LevelBadge({ level, size = 'md' }: { level: number; size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 28, md: 40, lg: 56 }[size];
  const fs = { sm: 11, md: 14, lg: 20 }[size];
  return (
    <div
      className="flex items-center justify-center rounded-xl border border-accent/20 bg-accent-dim font-mono font-semibold text-accent"
      style={{ width: s, height: s, fontSize: fs }}
    >
      {level}
    </div>
  );
}

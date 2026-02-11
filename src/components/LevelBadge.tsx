'use client';

export default function LevelBadge({ level, size = 'md' }: { level: number; size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 28, md: 40, lg: 56 }[size];
  const fs = { sm: 11, md: 14, lg: 20 }[size];
  const r = { sm: 8, md: 10, lg: 14 }[size];
  return (
    <div
      className="badge-glow flex items-center justify-center border border-accent/30 bg-accent-dim font-mono font-bold text-accent"
      style={{ width: s, height: s, fontSize: fs, borderRadius: r }}
    >
      {level}
    </div>
  );
}

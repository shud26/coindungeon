'use client';

export default function LevelBadge({ level, size = 'md' }: { level: number; size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 28, md: 36, lg: 48 }[size];
  const fs = { sm: 11, md: 13, lg: 18 }[size];
  const r = { sm: 8, md: 10, lg: 14 }[size];
  return (
    <div
      className="flex items-center justify-center bg-accent-dim font-semibold text-accent"
      style={{ width: s, height: s, fontSize: fs, borderRadius: r }}
    >
      {level}
    </div>
  );
}

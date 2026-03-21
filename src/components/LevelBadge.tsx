'use client';

export default function LevelBadge({ level, size = 'md' }: { level: number; size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 32, md: 40, lg: 52 }[size];
  const fs = { sm: 12, md: 14, lg: 20 }[size];
  const r = { sm: 10, md: 12, lg: 16 }[size];
  return (
    <div
      className="flex items-center justify-center font-extrabold text-white"
      style={{
        width: s,
        height: s,
        fontSize: fs,
        borderRadius: r,
        background: 'linear-gradient(135deg, #8B7CFF, #A78BFA)',
        boxShadow: '0 4px 12px rgba(139,124,255,0.3)',
      }}
    >
      {level}
    </div>
  );
}

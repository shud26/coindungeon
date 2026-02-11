'use client';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function LevelBadge({ level, size = 'md' }: LevelBadgeProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <div
      className={`${sizeClasses[size]} glow-primary flex items-center justify-center rounded-full border-2 border-primary bg-surface font-mono font-bold text-primary`}
    >
      {level}
    </div>
  );
}

'use client';

interface ProgressBarProps {
  progress: number;
  className?: string;
  size?: 'sm' | 'md';
}

export default function ProgressBar({ progress, className = '', size = 'md' }: ProgressBarProps) {
  const h = size === 'sm' ? 'h-1' : 'h-1.5';
  return (
    <div className={`relative ${className}`}>
      <div className={`${h} w-full overflow-hidden rounded-full bg-surface-2`}>
        <div
          className={`shimmer-bar ${h} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

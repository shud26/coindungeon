'use client';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ progress, className = '', showLabel = false }: ProgressBarProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="h-3 w-full overflow-hidden rounded-full bg-surface">
        <div
          className="shimmer h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showLabel && (
        <span className="mt-1 block text-right text-xs text-text-secondary">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
}

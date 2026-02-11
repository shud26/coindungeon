'use client';

export default function ProgressBar({ progress, className = '', shimmer = false }: { progress: number; className?: string; shimmer?: boolean }) {
  return (
    <div className={`h-1 w-full overflow-hidden rounded-full bg-bg-elevated ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${shimmer ? 'shimmer-bar' : 'bg-accent'}`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}

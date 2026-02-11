'use client';

export default function ProgressBar({ progress, className = '' }: { progress: number; className?: string }) {
  return (
    <div className={`h-1 w-full overflow-hidden rounded-full bg-bg-elevated ${className}`}>
      <div
        className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}

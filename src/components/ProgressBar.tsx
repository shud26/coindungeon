'use client';

export default function ProgressBar({ progress, className = '' }: { progress: number; className?: string; shimmer?: boolean }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-bg-subtle ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${Math.min(progress, 100)}%`,
          background: 'linear-gradient(90deg, #8B7CFF, #A78BFA)',
        }}
      />
    </div>
  );
}

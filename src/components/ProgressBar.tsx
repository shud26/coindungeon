'use client';

export default function ProgressBar({ progress, className = '' }: { progress: number; className?: string; shimmer?: boolean }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-gray-100 ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${Math.min(progress, 100)}%`,
          background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
        }}
      />
    </div>
  );
}

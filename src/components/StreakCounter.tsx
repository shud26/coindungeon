'use client';

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-surface px-4 py-2">
      <span className="text-2xl">{streak > 0 ? '🔥' : '💤'}</span>
      <div>
        <div className="text-sm text-text-secondary">연속</div>
        <div className="font-mono text-lg font-bold text-warning">
          {streak}일
        </div>
      </div>
    </div>
  );
}

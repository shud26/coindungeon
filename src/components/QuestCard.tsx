'use client';

import Link from 'next/link';
import type { Quest } from '@/data/quests';

interface QuestCardProps {
  quest: Quest;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  currentStep?: number;
}

const difficultyColors = {
  easy: 'text-success',
  medium: 'text-warning',
  hard: 'text-accent',
};

const difficultyLabels = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
};

export default function QuestCard({ quest, status, currentStep }: QuestCardProps) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  const className = `relative block rounded-xl border p-4 transition-all ${
    isLocked
      ? 'cursor-not-allowed border-border bg-surface opacity-50'
      : isCompleted
      ? 'border-success/30 bg-surface hover:bg-surface-hover'
      : status === 'available'
      ? 'pulse-current cursor-pointer border-primary/50 bg-surface hover:bg-surface-hover'
      : 'cursor-pointer border-primary/30 bg-surface hover:bg-surface-hover'
  }`;

  const content = (
      <div className="flex items-start gap-3">
        {/* Floor number */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${
            isCompleted
              ? 'bg-success/20 text-success'
              : isLocked
              ? 'bg-surface-hover text-text-disabled'
              : 'bg-primary/20 text-primary'
          }`}
        >
          {isLocked ? '🔒' : isCompleted ? '✓' : `${quest.floor}F`}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{quest.emoji}</span>
            <h3
              className={`font-bold ${
                isLocked ? 'text-text-disabled' : 'text-text-primary'
              }`}
            >
              {quest.title}
            </h3>
          </div>
          <p className="mt-0.5 text-sm text-text-secondary">
            {quest.description}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs">
            <span className={difficultyColors[quest.difficulty]}>
              {difficultyLabels[quest.difficulty]}
            </span>
            <span className="text-text-disabled">|</span>
            <span className="text-primary">+{quest.xp} XP</span>
            <span className="text-text-disabled">|</span>
            <span className="text-text-secondary">~{quest.estimatedMinutes}분</span>
          </div>
          {/* In-progress indicator */}
          {status === 'in-progress' && currentStep !== undefined && (
            <div className="mt-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${(currentStep / quest.steps.length) * 100}%`,
                  }}
                />
              </div>
              <span className="mt-0.5 block text-xs text-text-disabled">
                {currentStep}/{quest.steps.length} 단계
              </span>
            </div>
          )}
        </div>
      </div>
  );

  if (isLocked) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={`/quest/${quest.id}`} className={className}>
      {content}
    </Link>
  );
}

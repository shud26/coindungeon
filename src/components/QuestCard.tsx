'use client';

import Link from 'next/link';
import { Lock, Check, ChevronRight, Clock, Zap } from 'lucide-react';
import type { Quest } from '@/data/quests';

interface QuestCardProps {
  quest: Quest;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  currentStep?: number;
}

const difficultyConfig = {
  easy: { label: '쉬움', color: 'text-success', bg: 'bg-success-dim' },
  medium: { label: '보통', color: 'text-warning', bg: 'bg-warning-dim' },
  hard: { label: '어려움', color: 'text-accent', bg: 'bg-accent-dim' },
};

export default function QuestCard({ quest, status, currentStep }: QuestCardProps) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const diff = difficultyConfig[quest.difficulty];

  const inner = (
    <div className="flex items-center gap-3.5">
      {/* Floor indicator */}
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${
          isCompleted
            ? 'bg-success-dim text-success'
            : isLocked
            ? 'bg-surface-2 text-text-disabled'
            : status === 'available'
            ? 'bg-primary-dim text-primary'
            : 'bg-purple-dim text-purple'
        }`}
      >
        {isLocked ? (
          <Lock size={16} />
        ) : isCompleted ? (
          <Check size={16} strokeWidth={3} />
        ) : (
          <span>{quest.floor}F</span>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3
          className={`text-[15px] font-semibold leading-tight ${
            isLocked ? 'text-text-disabled' : 'text-text-primary'
          }`}
        >
          {quest.title}
        </h3>
        <p className="mt-0.5 text-xs text-text-secondary line-clamp-1">
          {quest.description}
        </p>

        {/* Meta */}
        <div className="mt-1.5 flex items-center gap-2">
          <span className={`${diff.bg} ${diff.color} rounded px-1.5 py-0.5 text-[10px] font-medium`}>
            {diff.label}
          </span>
          <span className="flex items-center gap-0.5 text-[10px] text-text-disabled">
            <Zap size={10} />
            {quest.xp} XP
          </span>
          <span className="flex items-center gap-0.5 text-[10px] text-text-disabled">
            <Clock size={10} />
            {quest.estimatedMinutes}분
          </span>
        </div>

        {/* In-progress bar */}
        {status === 'in-progress' && currentStep !== undefined && (
          <div className="mt-2">
            <div className="h-1 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-purple transition-all"
                style={{ width: `${(currentStep / quest.steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Arrow */}
      {!isLocked && (
        <ChevronRight size={16} className="shrink-0 text-text-disabled" />
      )}
    </div>
  );

  const baseClass = `block rounded-2xl border p-3.5 transition-all ${
    isLocked
      ? 'cursor-not-allowed border-border bg-surface opacity-40'
      : isCompleted
      ? 'border-success/10 bg-surface hover:bg-surface-hover'
      : status === 'available'
      ? 'pulse-active border-primary/20 bg-surface hover:bg-surface-hover'
      : 'border-purple/20 bg-surface hover:bg-surface-hover'
  }`;

  if (isLocked) {
    return <div className={baseClass}>{inner}</div>;
  }

  return (
    <Link href={`/quest/${quest.id}`} className={baseClass}>
      {inner}
    </Link>
  );
}

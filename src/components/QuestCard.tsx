'use client';

import Link from 'next/link';
import { Lock, Check, ChevronRight } from 'lucide-react';
import type { Quest } from '@/data/quests';

interface Props {
  quest: Quest;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  currentStep?: number;
}

export default function QuestCard({ quest, status, currentStep }: Props) {
  const locked = status === 'locked';
  const done = status === 'completed';

  const inner = (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-semibold ${
          done ? 'bg-success-dim text-success'
          : locked ? 'bg-bg-elevated text-text-quaternary'
          : 'bg-accent-dim text-accent'
        }`}
      >
        {locked ? <Lock size={14} /> : done ? <Check size={14} strokeWidth={2.5} /> : `${quest.floor}`}
      </div>

      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold leading-tight ${locked ? 'text-text-quaternary' : ''}`}>
          {quest.title}
        </p>
        <p className="mt-0.5 text-xs text-text-tertiary line-clamp-1">{quest.description}</p>

        {status === 'in-progress' && currentStep !== undefined && (
          <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-bg-elevated">
            <div className="h-full rounded-full bg-accent" style={{ width: `${(currentStep / quest.steps.length) * 100}%` }} />
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="font-mono text-xs text-text-quaternary">+{quest.xp}</span>
        {!locked && <ChevronRight size={14} className="text-text-quaternary" />}
      </div>
    </div>
  );

  const cls = `block rounded-xl border p-3 transition-colors ${
    locked ? 'cursor-default border-border opacity-35'
    : done ? 'border-border hover:border-border-hover'
    : status === 'available' ? 'border-accent/20 hover:border-accent/40'
    : 'border-border hover:border-border-hover'
  }`;

  if (locked) return <div className={cls}>{inner}</div>;
  return <Link href={`/quest/${quest.id}`} className={cls}>{inner}</Link>;
}

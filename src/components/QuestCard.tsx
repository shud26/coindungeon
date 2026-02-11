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
  const active = status === 'available';

  const inner = (
    <div className="relative z-10 flex items-center gap-3">
      {/* Floor indicator */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
          done ? 'bg-success-dim text-success'
          : locked ? 'bg-bg-elevated text-text-quaternary'
          : active ? 'bg-accent-dim text-accent badge-glow'
          : 'bg-accent-dim text-accent'
        }`}
      >
        {locked ? <Lock size={14} /> : done ? <Check size={14} strokeWidth={2.5} /> : quest.floor}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold leading-tight ${locked ? 'text-text-quaternary' : ''}`}>
          {quest.title}
        </p>
        <p className="mt-0.5 text-xs text-text-tertiary line-clamp-1">{quest.description}</p>
        {status === 'in-progress' && currentStep !== undefined && (
          <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-bg-elevated">
            <div className="shimmer-bar h-full rounded-full" style={{ width: `${(currentStep / quest.steps.length) * 100}%` }} />
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-1.5">
        <span className={`font-mono text-xs ${done ? 'text-success' : 'text-text-quaternary'}`}>
          {done ? '✓' : `+${quest.xp}`}
        </span>
        {!locked && <ChevronRight size={14} className="text-text-quaternary" />}
      </div>
    </div>
  );

  if (locked) {
    return (
      <div className="glass-card relative p-3 opacity-35">
        {inner}
      </div>
    );
  }

  if (active) {
    return (
      <Link href={`/quest/${quest.id}`} className="gradient-border quest-active relative block p-3 transition-all hover:scale-[1.01]">
        {inner}
      </Link>
    );
  }

  return (
    <Link href={`/quest/${quest.id}`} className="glass-card relative block p-3 transition-colors hover:border-border-hover">
      {inner}
    </Link>
  );
}

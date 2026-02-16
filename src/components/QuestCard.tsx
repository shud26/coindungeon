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
    <div className="flex items-center gap-3.5 p-4">
      {/* Floor indicator */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-semibold ${
          done ? 'bg-success-dim text-success'
          : locked ? 'bg-bg-elevated text-text-quaternary'
          : 'bg-accent-dim text-accent'
        }`}
      >
        {locked ? <Lock size={14} strokeWidth={1.5} /> : done ? <Check size={14} strokeWidth={2.5} /> : quest.floor}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className={`text-[15px] font-semibold leading-tight ${locked ? 'text-text-quaternary' : ''}`}>
          {quest.title}
        </p>
        <p className="mt-0.5 text-[13px] text-text-tertiary line-clamp-1">{quest.description}</p>
        {status === 'in-progress' && currentStep !== undefined && (
          <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-bg-elevated">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(currentStep / quest.steps.length) * 100}%` }} />
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-2">
        <span className={`text-[12px] ${done ? 'text-success' : 'text-text-quaternary'}`}>
          {done ? '완료' : `+${quest.xp}`}
        </span>
        {!locked && <ChevronRight size={14} className="text-text-quaternary opacity-40" />}
      </div>
    </div>
  );

  if (locked) {
    return (
      <div className="card opacity-40">
        {inner}
      </div>
    );
  }

  if (active) {
    return (
      <Link href={`/quest/${quest.id}`} className="card-accent relative block overflow-hidden transition-all active:scale-[0.995]">
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />
        {inner}
      </Link>
    );
  }

  return (
    <Link href={`/quest/${quest.id}`} className="card relative block transition-all active:scale-[0.995]">
      {inner}
    </Link>
  );
}

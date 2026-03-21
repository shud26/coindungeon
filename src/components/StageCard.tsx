'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Check, ChevronRight } from 'lucide-react';
import type { Stage } from '@/data/stages';
import type { TowerProgress } from '@/lib/tower-progress';
import { getStageStatus, getQuestProgress } from '@/lib/tower-progress';

export default function StageCard({ stage, progress, index }: { stage: Stage; progress: TowerProgress; index: number }) {
  const status = getStageStatus(progress, stage.id);
  const questProgress = getQuestProgress(progress, stage.id, stage.quests.length);

  const isBoss = stage.id === 6;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      {status === 'locked' ? (
        <div
          className="relative rounded-2xl p-5 opacity-40"
          style={{ background: 'var(--bg-surface)', boxShadow: '0 0 0 1px rgba(255,255,255,0.04)' }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bg-subtle text-[10px] text-text-quaternary">
              <Lock size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-text-quaternary">{stage.floor}</p>
              <p className="text-[16px] font-bold text-text-quaternary">{stage.title}</p>
              <p className="mt-1 text-[12px] text-text-quaternary">{stage.unlockCondition}</p>
            </div>
          </div>
        </div>
      ) : (
        <Link href={`/stage/${stage.slug}`}>
          <div
            className={`relative rounded-2xl p-5 transition-all hover:scale-[1.01] ${status === 'current' ? 'ring-1 ring-[#8B7CFF]/40' : ''}`}
            style={{
              background: isBoss && status === 'current'
                ? 'linear-gradient(135deg, rgba(139,124,255,0.12), rgba(167,139,250,0.08))'
                : 'var(--bg-surface)',
              boxShadow: status === 'current'
                ? '0 0 0 1px rgba(139,124,255,0.3), 0 4px 20px rgba(139,124,255,0.1)'
                : '0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {/* Current indicator */}
            {status === 'current' && (
              <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full bg-[#8B7CFF]" />
            )}

            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[22px]"
                style={{
                  background: status === 'cleared'
                    ? 'rgba(52,211,153,0.12)'
                    : isBoss
                    ? 'rgba(139,124,255,0.15)'
                    : 'rgba(139,124,255,0.10)',
                }}
              >
                {status === 'cleared' ? <Check size={20} className="text-emerald-400" /> : stage.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-text-quaternary">{stage.floor}</span>
                  {status === 'current' && (
                    <span className="rounded-md bg-[#8B7CFF]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#8B7CFF]">NOW</span>
                  )}
                  {status === 'cleared' && (
                    <span className="rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">CLEAR</span>
                  )}
                </div>
                <p className={`text-[16px] font-bold ${isBoss && status === 'current' ? 'text-[#8B7CFF]' : ''}`}>
                  {stage.title}
                </p>
                <p className="mt-0.5 text-[13px] text-text-tertiary">{stage.subtitle}</p>

                {/* Quest progress bar */}
                {status === 'current' && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-subtle">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${questProgress.percent}%`, background: 'linear-gradient(90deg, #8B7CFF, #A78BFA)' }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-text-quaternary">
                      {questProgress.done}/{questProgress.total}
                    </span>
                  </div>
                )}
              </div>

              {/* Arrow */}
              <ChevronRight size={16} className="shrink-0 text-text-quaternary opacity-30" />
            </div>
          </div>
        </Link>
      )}
    </motion.div>
  );
}

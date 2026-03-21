'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Circle, Trophy } from 'lucide-react';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import TwitterFeed from '@/components/TwitterFeed';
import { loadTowerProgress, saveTowerProgress, completeQuest, clearStage, getQuestProgress } from '@/lib/tower-progress';
import type { TowerProgress } from '@/lib/tower-progress';
import type { StageQuest } from '@/data/stages';

interface Props {
  stageId: number;
  slug: string;
  quests: StageQuest[];
  youtubeVideoId?: string;
  bossName?: string;
}

export default function StageDetail({ stageId, slug, quests, youtubeVideoId, bossName }: Props) {
  const [progress, setProgress] = useState<TowerProgress | null>(null);
  const [justCleared, setJustCleared] = useState(false);

  useEffect(() => {
    setProgress(loadTowerProgress());
  }, []);

  if (!progress) return null;

  const questProg = getQuestProgress(progress, stageId, quests.length);
  const isCleared = progress.clearedStages.includes(stageId);
  const allQuestsDone = questProg.done === questProg.total;

  const handleQuestToggle = (questId: string) => {
    if (progress.completedQuests.includes(questId)) return;
    const updated = completeQuest(progress, questId);
    saveTowerProgress(updated);
    setProgress(updated);
  };

  const handleClearStage = () => {
    if (isCleared) return;
    const updated = clearStage(progress, stageId);
    saveTowerProgress(updated);
    setProgress(updated);
    setJustCleared(true);
  };

  return (
    <div className="mt-8 space-y-8">
      {/* YouTube Video */}
      {youtubeVideoId ? (
        <div>
          <p className="section-label mb-3">📺 공략 영상</p>
          <YouTubeEmbed videoId={youtubeVideoId} title={`${slug} 공략`} />
        </div>
      ) : (
        <div className="rounded-2xl bg-bg-surface p-6 text-center" style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}>
          <p className="text-[20px]">🎬</p>
          <p className="mt-2 text-[14px] font-semibold text-text-tertiary">공략 영상 준비 중</p>
          <p className="mt-1 text-[12px] text-text-quaternary">유튜브 바이브머니 채널에서 공개 예정</p>
        </div>
      )}

      {/* Quests */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="section-label">⚔️ 퀘스트</p>
          <span className="text-[12px] font-semibold text-text-quaternary">{questProg.done}/{questProg.total}</span>
        </div>
        <div className="space-y-2">
          {quests.map((quest, i) => {
            const done = progress.completedQuests.includes(quest.id);
            return (
              <motion.button
                key={quest.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleQuestToggle(quest.id)}
                disabled={done}
                className="w-full text-left rounded-xl p-4 transition-all"
                style={{
                  background: done ? 'rgba(52,211,153,0.08)' : 'var(--bg-surface)',
                  boxShadow: done ? '0 0 0 1px rgba(52,211,153,0.2)' : '0 0 0 1px rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {done ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Circle size={16} className="text-text-quaternary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[14px] font-semibold ${done ? 'text-emerald-400 line-through' : ''}`}>
                      {quest.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-text-tertiary">{quest.description}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Clear Button */}
      {!isCleared && allQuestsDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <button
            onClick={handleClearStage}
            className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[15px] font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #8B7CFF, #A78BFA)' }}
          >
            <Trophy size={16} /> 스테이지 클리어!
          </button>
        </motion.div>
      )}

      {/* Cleared State */}
      {(isCleared || justCleared) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-emerald-500/10 p-6 text-center"
          style={{ boxShadow: '0 0 0 1px rgba(52,211,153,0.2)' }}
        >
          <p className="text-[28px]">🏆</p>
          <p className="mt-2 text-[16px] font-bold text-emerald-400">스테이지 클리어!</p>
          <p className="mt-1 text-[13px] text-text-tertiary">다음 층으로 올라가세요</p>
        </motion.div>
      )}

      {/* DMASTER Twitter Feed (Boss stage only) */}
      {bossName && (
        <div>
          <p className="section-label mb-3">👑 {bossName} 트위터</p>
          <TwitterFeed username="DMASTER_AI" />
        </div>
      )}
    </div>
  );
}

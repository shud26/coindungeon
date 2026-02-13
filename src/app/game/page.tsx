'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { useGameProgress } from '@/lib/game/useGameProgress';
import CharacterSelect from '@/components/game/CharacterSelect';
import QuestOverlay from '@/components/game/QuestOverlay';
import type { Quest, QuizQuestion } from '@/data/quests';

const PhaserGame = dynamic(() => import('@/components/game/PhaserGame'), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center rounded-xl border border-border"
      style={{ aspectRatio: '15/10', background: 'var(--bg-surface)' }}
    >
      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
        로딩 중...
      </p>
    </div>
  ),
});

type Phase = 'select' | 'playing';

export default function GamePage() {
  const { progress, getQuizQuestion, handleCorrectAnswer } = useGameProgress();

  const [phase, setPhase] = useState<Phase>('select');
  const [characterKey, setCharacterKey] = useState('');

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<{
    quest: Quest;
    question: QuizQuestion;
  } | null>(null);
  const [toast, setToast] = useState('');

  const quizData = progress ? getQuizQuestion() : null;

  /* ── Character select → start game ───────── */
  const handleCharacterStart = useCallback((key: string) => {
    setCharacterKey(key);
    setPhase('playing');
  }, []);

  /* ── NPC interaction → snapshot current quiz ─ */
  const handleNpcInteract = useCallback(() => {
    if (overlayOpen) return;
    setActiveQuiz(quizData);
    setOverlayOpen(true);
  }, [overlayOpen, quizData]);

  /* ── Correct answer → XP + toast ──────────── */
  const handleCorrect = useCallback(
    (questId: number) => {
      handleCorrectAnswer(questId);
      setToast('클리어! XP +10');
      setTimeout(() => setToast(''), 3000);
    },
    [handleCorrectAnswer],
  );

  /* ── Close overlay ────────────────────────── */
  const handleClose = useCallback(() => {
    setOverlayOpen(false);
    setActiveQuiz(null);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      <div className="mx-auto max-w-[480px] px-4 pt-3 pb-24">
        {/* Header */}
        <div className="mb-3 flex items-center gap-3">
          <Link
            href="/dungeon"
            className="transition-colors"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <Gamepad2 size={18} style={{ color: 'var(--accent)' }} />
            <h1 className="text-base font-bold">던전 탐험</h1>
          </div>
          {progress && (
            <span
              className="ml-auto text-xs"
              style={{ color: 'var(--text-tertiary)' }}
            >
              XP {progress.xp}
            </span>
          )}
        </div>

        {/* ── Phase: Character Select ──────── */}
        {phase === 'select' && <CharacterSelect onStart={handleCharacterStart} />}

        {/* ── Phase: Playing ───────────────── */}
        {phase === 'playing' && (
          <>
            <PhaserGame
              characterKey={characterKey}
              onNpcInteract={handleNpcInteract}
              overlayOpen={overlayOpen}
            />

            {/* Help text */}
            <div className="glass-card mt-3 p-3">
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--text-tertiary)' }}
              >
                NPC(초록)에게 다가가{' '}
                <kbd
                  className="mx-0.5 rounded px-1 py-0.5"
                  style={{
                    fontSize: 10,
                    border: '1px solid var(--border)',
                    background: 'var(--bg-elevated)',
                  }}
                >
                  E
                </kbd>{' '}
                를 누르면 대화할 수 있어. 퀴즈를 맞추면 XP를 획득!
              </p>
            </div>
          </>
        )}
      </div>

      {/* Quest overlay */}
      <QuestOverlay
        visible={overlayOpen}
        onClose={handleClose}
        quest={activeQuiz?.quest ?? null}
        question={activeQuiz?.question ?? null}
        onCorrect={handleCorrect}
        allCleared={overlayOpen && activeQuiz === null && progress !== null}
      />

      {/* Toast */}
      {toast && (
        <div
          className="fixed left-1/2 top-8 z-[60] -translate-x-1/2 rounded-lg px-5 py-2.5 text-sm font-medium shadow-lg"
          style={{ background: 'var(--success)', color: '#fff' }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

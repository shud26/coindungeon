'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { useGameProgress } from '@/lib/game/useGameProgress';
import { getRoom, ROOM_ORDER } from '@/lib/game/rooms';
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
  const {
    progress,
    getQuizForRoom,
    isRoomCleared,
    getRoomProgress,
    handleCorrectAnswer,
  } = useGameProgress();

  const [phase, setPhase] = useState<Phase>('select');
  const [characterKey, setCharacterKey] = useState('');
  const [currentRoomId, setCurrentRoomId] = useState('lobby');

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<{
    quest: Quest;
    question: QuizQuestion;
  } | null>(null);
  const [toast, setToast] = useState('');

  const currentRoom = getRoom(currentRoomId);
  const roomProgress = progress ? getRoomProgress(currentRoom.questIds) : null;

  /* ── Character select → start game ───────── */
  const handleCharacterStart = useCallback((key: string) => {
    setCharacterKey(key);
    setPhase('playing');
  }, []);

  /* ── NPC interaction → room-specific quiz ── */
  const handleNpcInteract = useCallback(
    (roomId: string) => {
      if (overlayOpen) return;
      const room = getRoom(roomId);
      const quizData = getQuizForRoom(room.questIds);
      setActiveQuiz(quizData);
      setOverlayOpen(true);
    },
    [overlayOpen, getQuizForRoom],
  );

  /* ── Room change from PhaserGame ─────────── */
  const handleRoomChange = useCallback((roomId: string) => {
    setCurrentRoomId(roomId);
  }, []);

  /* ── Check if a specific room's door is unlocked */
  const checkDoorUnlocked = useCallback(
    (targetRoomId: string): boolean => {
      /* Current room must be cleared to go forward.
         Going backward (to already-visited rooms) is always allowed. */
      const room = getRoom(currentRoomId);

      /* Find room indices to determine direction */
      const currentIdx = ROOM_ORDER.indexOf(currentRoomId);
      const targetIdx = ROOM_ORDER.indexOf(targetRoomId);

      /* Going backward is always OK */
      if (targetIdx < currentIdx) return true;

      /* Going forward requires at least 1 quest cleared in current room */
      return isRoomCleared(room.questIds);
    },
    [currentRoomId, isRoomCleared],
  );

  /* ── Correct answer → XP + toast ──────────── */
  const handleCorrect = useCallback(
    (questId: number) => {
      handleCorrectAnswer(questId);
      setToast('클리어! XP +10 🎉');
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
              onRoomChange={handleRoomChange}
              checkDoorUnlocked={checkDoorUnlocked}
              overlayOpen={overlayOpen}
            />

            {/* Room progress */}
            {roomProgress && (
              <div className="glass-card mt-3 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {currentRoom.theme.name}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {roomProgress.completed}/{roomProgress.total} 퀘스트
                  </span>
                </div>
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full"
                  style={{ background: 'var(--bg-elevated)' }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(roomProgress.completed / roomProgress.total) * 100}%`,
                      background: `#${currentRoom.theme.accent.toString(16).padStart(6, '0')}`,
                    }}
                  />
                </div>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {roomProgress.completed === 0
                    ? 'NPC에게 다가가 [E]로 대화 → 퀴즈를 맞추면 문이 열려!'
                    : roomProgress.completed < roomProgress.total
                      ? '다음 방으로 이동 가능! 문 앞에서 [E]를 눌러봐'
                      : '이 방의 모든 퀘스트 클리어! 🎉'}
                </p>
              </div>
            )}
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

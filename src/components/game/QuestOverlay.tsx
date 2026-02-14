'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Quest, QuizQuestion } from '@/data/quests';

type Phase = 'dialog' | 'quiz' | 'correct' | 'wrong';

interface Props {
  visible: boolean;
  onClose: () => void;
  quest: Quest | null;
  question: QuizQuestion | null;
  onCorrect: (questId: number) => void;
  allCleared: boolean;
}

export default function QuestOverlay({
  visible,
  onClose,
  quest,
  question,
  onCorrect,
  allCleared,
}: Props) {
  const [phase, setPhase] = useState<Phase>('dialog');

  useEffect(() => {
    if (visible) setPhase('dialog');
  }, [visible]);

  if (!visible) return null;

  /* All quests with quizzes cleared */
  if (allCleared) {
    return (
      <Backdrop onClick={onClose}>
        <Panel>
          <div className="text-center">
            <p className="mb-2 text-2xl">&#x2728;</p>
            <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              모든 퀘스트를 클리어했어!<br />
              새로운 퀘스트가 곧 추가될 예정이야.
            </p>
            <Btn onClick={onClose} className="mt-4">닫기</Btn>
          </div>
        </Panel>
      </Backdrop>
    );
  }

  if (!quest || !question) return null;

  const handleAnswer = (idx: number) => {
    if (idx === question.correctIndex) {
      setPhase('correct');
      onCorrect(quest.id);
    } else {
      setPhase('wrong');
    }
  };

  return (
    <Backdrop onClick={phase === 'dialog' ? onClose : undefined}>
      <Panel>
        <AnimatePresence mode="wait">
          {/* ── Dialog ──────────────────── */}
          {phase === 'dialog' && (
            <motion.div
              key="dialog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* NPC header */}
              <div className="mb-3 flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: 'rgba(34, 197, 94, 0.15)' }}
                >
                  <div className="h-3 w-3 rounded-sm" style={{ background: '#22c55e' }} />
                </div>
                <div>
                  <span className="text-sm font-bold" style={{ color: '#22c55e' }}>
                    던전 NPC
                  </span>
                  <span
                    className="ml-2 text-xs"
                    style={{ color: 'var(--text-quaternary)' }}
                  >
                    XP +10
                  </span>
                </div>
              </div>

              <p
                className="mb-2 text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                용사여, 이 던전의 비밀을 알고 싶은가?
                나의 퀴즈에 답하면 경험치를 주겠다!
              </p>

              <p
                className="mb-4 rounded-lg px-3 py-2 text-xs font-medium"
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-tertiary)',
                }}
              >
                {quest.title}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-lg py-2.5 text-sm transition-colors active:brightness-90"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  나중에
                </button>
                <Btn className="flex-1" onClick={() => setPhase('quiz')}>
                  퀴즈 시작
                </Btn>
              </div>
            </motion.div>
          )}

          {/* ── Quiz ────────────────────── */}
          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <p
                className="mb-4 text-sm font-medium leading-relaxed"
                style={{ color: 'var(--text-primary)' }}
              >
                {question.question}
              </p>
              <div className="flex flex-col gap-2">
                {question.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg px-4 py-3 text-left text-sm transition-colors active:brightness-110"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span className="mr-2 text-xs font-bold" style={{ color: 'var(--text-quaternary)' }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Correct ─────────────────── */}
          {phase === 'correct' && (
            <motion.div
              key="correct"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <motion.p
                className="mb-2 text-3xl"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                &#x1f389;
              </motion.p>
              <p className="mb-1 text-base font-bold" style={{ color: '#22c55e' }}>
                정답!
              </p>
              <p
                className="mb-2 text-xs leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {question.explanation}
              </p>
              <p
                className="mb-4 text-sm font-bold"
                style={{ color: 'var(--accent)' }}
              >
                XP +10
              </p>
              <Btn onClick={onClose}>클리어!</Btn>
            </motion.div>
          )}

          {/* ── Wrong ───────────────────── */}
          {phase === 'wrong' && (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <motion.p
                className="mb-2 text-3xl"
                animate={{ x: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.4 }}
              >
                &#x1f605;
              </motion.p>
              <p className="mb-1 text-base font-bold" style={{ color: '#ef4444' }}>
                오답!
              </p>
              <p
                className="mb-4 text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                다시 한번 생각해보게...
              </p>
              <Btn onClick={() => setPhase('quiz')}>다시 도전</Btn>
            </motion.div>
          )}
        </AnimatePresence>
      </Panel>
    </Backdrop>
  );
}

/* ── Shared UI pieces ────────────────────── */
function Backdrop({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.65)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClick) onClick();
      }}
    >
      {children}
    </motion.div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="card mx-4 mb-24 w-full max-w-[460px] p-5"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}

function Btn({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`w-full rounded-lg py-2.5 text-sm font-medium ${className}`}
      style={{ background: 'var(--accent)', color: '#fff' }}
    >
      {children}
    </motion.button>
  );
}

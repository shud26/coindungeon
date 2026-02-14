'use client';

import { useState, useEffect } from 'react';
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
      <Backdrop>
        <Panel>
          <p className="text-center text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            모든 퀘스트를 클리어했어!<br />
            새로운 퀘스트가 곧 추가될 예정이야.
          </p>
          <Btn onClick={onClose}>닫기</Btn>
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
    <Backdrop>
      <Panel>
        {/* ── Dialog ──────────────────── */}
        {phase === 'dialog' && (
          <>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-5 w-5 rounded" style={{ background: '#22c55e' }} />
              <span className="text-sm font-bold" style={{ color: '#22c55e' }}>
                던전 NPC
              </span>
            </div>
            <p
              className="mb-3 text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              용사여, 이 던전의 비밀을 알고 싶은가?
              <br />
              나의 퀴즈에 답하면 경험치를 주겠다!
            </p>
            <p className="mb-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {quest.title} &middot; XP +10
            </p>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg py-2.5 text-sm"
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
          </>
        )}

        {/* ── Quiz ────────────────────── */}
        {phase === 'quiz' && (
          <>
            <p
              className="mb-4 text-sm font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              {question.question}
            </p>
            <div className="flex flex-col gap-2">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="rounded-lg px-4 py-3 text-left text-sm transition-colors hover:brightness-110"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── Correct ─────────────────── */}
        {phase === 'correct' && (
          <div className="text-center">
            <p className="mb-1 text-2xl">&#x1f389;</p>
            <p className="mb-1 text-sm font-bold" style={{ color: '#22c55e' }}>
              정답!
            </p>
            <p
              className="mb-1 text-xs leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {question.explanation}
            </p>
            <p
              className="mb-4 text-xs font-medium"
              style={{ color: 'var(--accent)' }}
            >
              XP +10
            </p>
            <Btn onClick={onClose}>클리어!</Btn>
          </div>
        )}

        {/* ── Wrong ───────────────────── */}
        {phase === 'wrong' && (
          <div className="text-center">
            <p className="mb-1 text-2xl">&#x1f605;</p>
            <p className="mb-1 text-sm font-bold" style={{ color: '#ef4444' }}>
              오답!
            </p>
            <p
              className="mb-4 text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              다시 한번 생각해보게...
            </p>
            <Btn onClick={() => setPhase('quiz')}>다시 도전</Btn>
          </div>
        )}
      </Panel>
    </Backdrop>
  );
}

/* ── Shared UI pieces ────────────────────── */
function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.6)' }}
    >
      {children}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="card mx-4 mb-24 w-full max-w-[460px] p-5">
      {children}
    </div>
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
    <button
      onClick={onClick}
      className={`w-full rounded-lg py-2.5 text-sm font-medium ${className}`}
      style={{ background: 'var(--accent)', color: '#fff' }}
    >
      {children}
    </button>
  );
}

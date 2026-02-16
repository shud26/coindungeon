'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Trophy, Flame, Check, X, Zap, Star } from 'lucide-react';
import {
  getTodayQuestions,
  loadDailyQuiz,
  saveDailyQuiz,
  canPlayToday,
  finishDailyQuiz,
  calcXP,
  todayString,
  type DailyQuizProgress,
} from '@/lib/dailyQuiz';
import { loadProgress, saveProgress, getLevel } from '@/lib/progress';
import type { DailyQuestion } from '@/data/dailyQuizPool';

type Phase = 'ready' | 'playing' | 'result' | 'already-done';

const TIMER_SECONDS = 10;
const OPTIONS_LABELS = ['A', 'B', 'C', 'D'];

export default function DailyQuizPage() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>('ready');
  const [questions, setQuestions] = useState<DailyQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [dailyProgress, setDailyProgress] = useState<DailyQuizProgress | null>(null);
  const [xpGained, setXpGained] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    const dp = loadDailyQuiz();
    setDailyProgress(dp);

    // Refresh todayScore if date matches
    if (dp.lastAttemptDate === todayString() && dp.todayScore !== null) {
      setPhase('already-done');
    }

    setQuestions(getTodayQuestions());
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          // Time's up = wrong answer
          setShowAnswer(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const startQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowAnswer(false);
    setPhase('playing');
    startTimer();
  };

  const handleSelect = (idx: number) => {
    if (showAnswer || selected !== null) return;
    stopTimer();
    setSelected(idx);
    setShowAnswer(true);
    if (idx === questions[current].correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowAnswer(false);
      startTimer();
    } else {
      // Quiz finished
      stopTimer();
      const finalScore = selected === questions[current].correctIndex ? score : score; // score already updated
      const xp = calcXP(finalScore);
      setXpGained(xp);

      // Save daily quiz progress
      const dp = loadDailyQuiz();
      const updated = finishDailyQuiz(dp, finalScore);
      saveDailyQuiz(updated);
      setDailyProgress(updated);

      // Award XP to main progress
      if (xp > 0) {
        const prog = loadProgress();
        const lvl = getLevel(prog.xp + xp);
        const newProg = {
          ...prog,
          xp: prog.xp + xp,
          level: lvl.level,
          lastActiveDate: todayString(),
          streak: (() => {
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            if (prog.lastActiveDate === todayString()) return prog.streak;
            return prog.lastActiveDate === yesterday ? prog.streak + 1 : 1;
          })(),
        };
        saveProgress(newProg);
      }

      setPhase('result');
    }
  };

  // Compute final score correctly for result phase
  const finalScore = score;

  if (!mounted) return null;

  const q = questions[current];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/play" className="text-text-tertiary">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-[22px] font-bold">데일리 퀴즈</h1>
      </div>

      <AnimatePresence mode="wait">
        {/* ===== READY ===== */}
        {phase === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="card-elevated p-6 text-center">
              <div
                className="mx-auto mb-4 flex items-center justify-center rounded-full"
                style={{ width: 64, height: 64, background: 'var(--accent-dim)' }}
              >
                <Trophy size={28} className="text-accent" />
              </div>
              <h2 className="text-[18px] font-bold">오늘의 퀴즈</h2>
              <p className="mt-2 text-[14px] text-text-secondary">
                5문제 · 문제당 10초 · 정답 10XP
              </p>

              {dailyProgress && dailyProgress.streak > 0 && (
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: 'var(--warning-dim)' }}>
                  <Flame size={14} className="text-warning" />
                  <span className="text-[13px] font-medium text-warning">{dailyProgress.streak}일 연속</span>
                </div>
              )}

              <button
                onClick={startQuiz}
                className="mt-6 w-full rounded-xl py-3 text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
                style={{ background: 'var(--accent)' }}
              >
                시작하기
              </button>
            </div>
          </motion.div>
        )}

        {/* ===== ALREADY DONE ===== */}
        {phase === 'already-done' && dailyProgress && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="card p-6 text-center">
              <div
                className="mx-auto mb-4 flex items-center justify-center rounded-full"
                style={{ width: 64, height: 64, background: 'var(--success-dim)' }}
              >
                <Check size={28} className="text-success" />
              </div>
              <h2 className="text-[18px] font-bold">오늘 퀴즈 완료!</h2>
              <p className="mt-2 text-[14px] text-text-secondary">
                오늘 점수: {dailyProgress.todayScore}/5
              </p>
              <div className="mt-4 flex justify-center gap-6 text-center">
                <div>
                  <p className="text-[20px] font-bold text-accent">{dailyProgress.streak}</p>
                  <p className="text-[12px] text-text-tertiary">연속 일수</p>
                </div>
                <div>
                  <p className="text-[20px] font-bold text-warning">{dailyProgress.bestScore}</p>
                  <p className="text-[12px] text-text-tertiary">최고 점수</p>
                </div>
              </div>
              <p className="mt-5 text-[13px] text-text-tertiary">내일 다시 도전하세요!</p>
              <Link
                href="/play"
                className="mt-4 block rounded-xl py-3 text-[15px] font-semibold text-center transition-transform active:scale-[0.98]"
                style={{ background: 'var(--bg-elevated)' }}
              >
                게임 허브로
              </Link>
            </div>
          </motion.div>
        )}

        {/* ===== PLAYING ===== */}
        {phase === 'playing' && q && (
          <motion.div
            key={`q-${current}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Progress & Timer */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] text-text-secondary">
                {current + 1} / {questions.length}
              </span>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className={timer <= 3 ? 'text-danger' : 'text-text-tertiary'} />
                <span
                  className="text-[14px] font-mono font-semibold"
                  style={{ color: timer <= 3 ? 'var(--danger)' : 'var(--text-primary)', minWidth: 20, textAlign: 'right' }}
                >
                  {timer}
                </span>
              </div>
            </div>

            {/* Timer bar */}
            <div className="h-1 rounded-full mb-6" style={{ background: 'var(--bg-elevated)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: timer <= 3 ? 'var(--danger)' : 'var(--accent)' }}
                initial={{ width: '100%' }}
                animate={{ width: `${(timer / TIMER_SECONDS) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Category */}
            <span className="text-[12px] text-text-tertiary">{q.category}</span>

            {/* Question */}
            <h2 className="mt-2 text-[17px] font-bold leading-snug">{q.question}</h2>

            {/* Options */}
            <div className="mt-5 flex flex-col gap-2.5">
              {q.options.map((opt, idx) => {
                let bg = 'var(--bg-surface)';
                let border = 'var(--border)';
                let textColor = 'var(--text-primary)';

                if (showAnswer) {
                  if (idx === q.correctIndex) {
                    bg = 'var(--success-dim)';
                    border = 'var(--success)';
                    textColor = 'var(--success)';
                  } else if (idx === selected && idx !== q.correctIndex) {
                    bg = 'var(--danger-dim)';
                    border = 'var(--danger)';
                    textColor = 'var(--danger)';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={showAnswer}
                    className="flex items-center gap-3 rounded-xl p-4 text-left transition-all active:scale-[0.98]"
                    style={{
                      background: bg,
                      boxShadow: `0 0 0 1px ${border}`,
                      color: textColor,
                      opacity: showAnswer && idx !== q.correctIndex && idx !== selected ? 0.4 : 1,
                    }}
                  >
                    <span
                      className="flex items-center justify-center rounded-lg text-[13px] font-semibold shrink-0"
                      style={{
                        width: 28,
                        height: 28,
                        background: showAnswer && idx === q.correctIndex ? 'var(--success)' : showAnswer && idx === selected ? 'var(--danger)' : 'var(--bg-elevated)',
                        color: showAnswer && (idx === q.correctIndex || idx === selected) ? '#fff' : 'var(--text-secondary)',
                      }}
                    >
                      {showAnswer && idx === q.correctIndex ? <Check size={14} /> : showAnswer && idx === selected ? <X size={14} /> : OPTIONS_LABELS[idx]}
                    </span>
                    <span className="text-[14px] font-medium">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation + Next */}
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-elevated)' }}>
                  <p className="text-[13px] text-text-secondary">{q.explanation}</p>
                </div>
                <button
                  onClick={handleNext}
                  className="mt-4 w-full rounded-xl py-3 text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
                  style={{ background: 'var(--accent)' }}
                >
                  {current < questions.length - 1 ? '다음 문제' : '결과 보기'}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ===== RESULT ===== */}
        {phase === 'result' && dailyProgress && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card-elevated p-6 text-center">
              {/* Score emoji */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
                className="text-[48px] mb-3"
              >
                {finalScore === 5 ? '🏆' : finalScore >= 3 ? '🎉' : '💪'}
              </motion.div>

              <h2 className="text-[22px] font-bold">
                {finalScore === 5 ? '퍼펙트!' : finalScore >= 3 ? '잘했어!' : '다음엔 더 잘할 수 있어!'}
              </h2>

              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: 12,
                      height: 12,
                      background: i < finalScore ? 'var(--success)' : 'var(--bg-elevated)',
                    }}
                  />
                ))}
              </div>

              <p className="mt-3 text-[18px] font-bold">
                {finalScore} / 5
              </p>

              {/* XP */}
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5" style={{ background: 'var(--accent-dim)' }}>
                <Zap size={14} className="text-accent" />
                <span className="text-[14px] font-semibold text-accent">+{xpGained} XP</span>
                {finalScore === 5 && (
                  <span className="text-[12px] text-accent opacity-70 ml-1">(보너스 포함)</span>
                )}
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="card p-3">
                  <Flame size={16} className="mx-auto text-warning" />
                  <p className="mt-1 text-[18px] font-bold">{dailyProgress.streak}</p>
                  <p className="text-[11px] text-text-tertiary">연속 일수</p>
                </div>
                <div className="card p-3">
                  <Star size={16} className="mx-auto text-accent" />
                  <p className="mt-1 text-[18px] font-bold">{dailyProgress.bestScore}</p>
                  <p className="text-[11px] text-text-tertiary">최고 점수</p>
                </div>
              </div>

              <Link
                href="/play"
                className="mt-6 block rounded-xl py-3 text-[15px] font-semibold text-center transition-transform active:scale-[0.98]"
                style={{ background: 'var(--accent)' }}
              >
                <span className="text-white">게임 허브로</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

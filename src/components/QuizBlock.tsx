'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';
import type { QuizQuestion } from '@/data/quests';

interface QuizBlockProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function QuizBlock({ questions, onComplete }: QuizBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIndex];

  function handleSelect(index: number) {
    if (isRevealed) return;
    setSelectedAnswer(index);
    setIsRevealed(true);
    if (index === question.correctIndex) {
      setCorrectCount((c) => c + 1);
    }
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      setIsFinished(true);
      const finalCorrect = selectedAnswer === question.correctIndex
        ? correctCount + 1
        : correctCount;
      onComplete(Math.round((finalCorrect / questions.length) * 100));
    }
  }

  if (isFinished) {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-dim">
          <Trophy size={24} className="text-primary" />
        </div>
        <p className="mt-3 text-lg font-bold">
          {questions.length}문제 중 {correctCount}개 정답
        </p>
        <p className="mt-1 text-sm text-text-secondary">{score}점</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-6 rounded-full ${
                i < currentIndex ? 'bg-primary' : i === currentIndex ? 'bg-primary/50' : 'bg-surface-2'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-text-disabled">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <h4 className="mb-4 text-[15px] font-semibold leading-snug">{question.question}</h4>

      <div className="space-y-2">
        {question.options.map((option, i) => {
          let style = 'border-border hover:border-border-light bg-surface-2';
          if (isRevealed) {
            if (i === question.correctIndex) {
              style = 'border-success/40 bg-success-dim';
            } else if (i === selectedAnswer) {
              style = 'border-accent/40 bg-accent-dim';
            } else {
              style = 'border-border bg-surface-2 opacity-40';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isRevealed}
              className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all ${style}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-background font-mono text-xs text-text-disabled">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{option}</span>
              {isRevealed && i === question.correctIndex && (
                <CheckCircle2 size={16} className="shrink-0 text-success" />
              )}
              {isRevealed && i === selectedAnswer && i !== question.correctIndex && (
                <XCircle size={16} className="shrink-0 text-accent" />
              )}
            </button>
          );
        })}
      </div>

      {isRevealed && (
        <div className="mt-4 animate-in">
          <p className="mb-3 rounded-xl bg-background p-3 text-sm leading-relaxed text-text-secondary">
            {question.explanation}
          </p>
          <button
            onClick={handleNext}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {currentIndex < questions.length - 1 ? '다음 문제' : '결과 보기'}
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

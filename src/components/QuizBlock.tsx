'use client';

import { useState } from 'react';
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
      const finalScore = selectedAnswer === question.correctIndex
        ? correctCount + 1
        : correctCount;
      // recalculate to count current question
      const score = Math.round(
        ((selectedAnswer === question.correctIndex ? correctCount + 1 : correctCount) /
          questions.length) *
          100
      );
      onComplete(score);
    }
  }

  if (isFinished) {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <div className="text-4xl">{score >= 80 ? '🎉' : score >= 50 ? '👍' : '📚'}</div>
        <p className="mt-2 text-lg font-bold">
          {questions.length}문제 중 {correctCount}개 정답!
        </p>
        <p className="text-text-secondary">점수: {score}점</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-text-secondary">
          퀴즈 {currentIndex + 1}/{questions.length}
        </span>
        <span className="text-xs text-primary">{correctCount}개 정답</span>
      </div>

      <h4 className="mb-4 text-lg font-bold">{question.question}</h4>

      <div className="space-y-2">
        {question.options.map((option, i) => {
          let borderColor = 'border-border hover:border-primary/50';
          if (isRevealed) {
            if (i === question.correctIndex) {
              borderColor = 'border-success bg-success/10';
            } else if (i === selectedAnswer) {
              borderColor = 'border-accent bg-accent/10';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isRevealed}
              className={`w-full rounded-lg border p-3 text-left transition-colors ${borderColor} ${
                isRevealed ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span className="mr-2 font-mono text-sm text-text-disabled">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {isRevealed && (
        <div className="mt-4">
          <p className="mb-3 rounded-lg bg-background p-3 text-sm text-text-secondary">
            {selectedAnswer === question.correctIndex ? '✅ ' : '❌ '}
            {question.explanation}
          </p>
          <button
            onClick={handleNext}
            className="w-full rounded-lg bg-primary py-2.5 font-bold text-background transition-opacity hover:opacity-90"
          >
            {currentIndex < questions.length - 1 ? '다음 문제' : '결과 보기'}
          </button>
        </div>
      )}
    </div>
  );
}

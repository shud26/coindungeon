'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import type { QuizQuestion } from '@/data/quests';

export default function QuizBlock({ questions, onComplete }: { questions: QuizQuestion[]; onComplete: (score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[idx];

  function pick(i: number) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.correctIndex) setCorrect(c => c + 1);
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(i => i + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setFinished(true);
      const final = selected === q.correctIndex ? correct + 1 : correct;
      onComplete(Math.round((final / questions.length) * 100));
    }
  }

  if (finished) {
    return (
      <div className="rounded-xl border border-border p-5 text-center">
        <p className="text-lg font-semibold">{questions.length}문제 중 {correct}개 정답</p>
        <p className="mt-1 text-sm text-text-tertiary">{Math.round((correct / questions.length) * 100)}점</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`h-0.5 w-5 rounded-full ${i <= idx ? 'bg-accent' : 'bg-bg-elevated'}`} />
          ))}
        </div>
        <span className="text-xs text-text-quaternary">{idx + 1}/{questions.length}</span>
      </div>

      <p className="mb-3 text-sm font-semibold">{q.question}</p>

      <div className="space-y-1.5">
        {q.options.map((opt, i) => {
          let border = 'border-border';
          if (revealed) {
            if (i === q.correctIndex) border = 'border-success/40 bg-success-dim';
            else if (i === selected) border = 'border-danger/40 bg-danger-dim';
            else border = 'border-border opacity-40';
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={revealed}
              className={`flex w-full items-center gap-2.5 rounded-lg border p-2.5 text-left text-sm transition-colors ${border}`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[10px] text-text-quaternary bg-bg-base">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {revealed && i === q.correctIndex && <Check size={14} className="text-success" />}
              {revealed && i === selected && i !== q.correctIndex && <X size={14} className="text-danger" />}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-3 animate-in">
          <p className="mb-2.5 rounded-lg bg-bg-surface p-2.5 text-xs leading-relaxed text-text-secondary">{q.explanation}</p>
          <button onClick={next} className="w-full rounded-lg bg-accent py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            {idx < questions.length - 1 ? '다음 문제' : '결과 보기'}
          </button>
        </div>
      )}
    </div>
  );
}

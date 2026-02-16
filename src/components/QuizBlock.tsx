'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="card p-6 text-center">
        <p className="text-lg font-semibold">{questions.length}문제 중 {correct}개 정답</p>
        <p className="mt-1.5 text-[14px] text-text-tertiary">{Math.round((correct / questions.length) * 100)}점</p>
      </motion.div>
    );
  }

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div key={i} className={`h-[3px] w-6 rounded-full transition-colors ${i <= idx ? 'bg-accent' : 'bg-bg-elevated'}`} />
          ))}
        </div>
        <span className="text-[12px] text-text-quaternary">{idx + 1}/{questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2 }}>
          <p className="mb-4 text-[15px] font-semibold leading-snug">{q.question}</p>

          <div className="space-y-2">
            {q.options.map((opt, i) => {
              let stateClass = '';
              if (revealed) {
                if (i === q.correctIndex) stateClass = 'bg-success-dim !shadow-[0_0_0_1px_rgba(52,211,153,0.3)]';
                else if (i === selected) stateClass = 'bg-danger-dim !shadow-[0_0_0_1px_rgba(248,113,113,0.3)]';
                else stateClass = 'opacity-30';
              }
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  disabled={revealed}
                  className={`flex w-full items-center gap-3 rounded-xl p-3.5 text-left text-[14px] transition-all card ${stateClass}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-bg-elevated text-[11px] text-text-quaternary">
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
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <p className="mb-3 rounded-xl bg-bg-elevated p-4 text-[14px] leading-relaxed text-text-secondary">{q.explanation}</p>
              <button onClick={next} className="w-full rounded-xl bg-accent py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-hover">
                {idx < questions.length - 1 ? '다음 문제' : '결과 보기'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

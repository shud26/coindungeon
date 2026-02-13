'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  loadProgress,
  saveProgress,
  updateStreak,
  completeQuest,
  type UserProgress,
} from '@/lib/progress';
import { quests, type Quest, type QuizQuestion } from '@/data/quests';

export function useGameProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const p = loadProgress();
    const updated = updateStreak(p);
    if (updated !== p) saveProgress(updated);
    setProgress(updated);
  }, []);

  const getQuizQuestion = useCallback((): {
    quest: Quest;
    question: QuizQuestion;
  } | null => {
    if (!progress) return null;
    for (const q of quests) {
      if (!progress.completedQuests.includes(q.id) && q.quiz && q.quiz.length > 0) {
        return { quest: q, question: q.quiz[0] };
      }
    }
    return null;
  }, [progress]);

  const handleCorrectAnswer = useCallback(
    (questId: number) => {
      if (!progress) return;
      const updated = completeQuest(progress, questId, 10);
      saveProgress(updated);
      setProgress(updated);
    },
    [progress],
  );

  return { progress, getQuizQuestion, handleCorrectAnswer };
}

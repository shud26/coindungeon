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

  /** Get next uncompleted quiz from any quest (fallback) */
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

  /** Get next uncompleted quiz for specific quest IDs (room-specific) */
  const getQuizForRoom = useCallback(
    (questIds: number[]): { quest: Quest; question: QuizQuestion } | null => {
      if (!progress) return null;
      for (const id of questIds) {
        const q = quests.find((quest) => quest.id === id);
        if (q && !progress.completedQuests.includes(q.id) && q.quiz && q.quiz.length > 0) {
          return { quest: q, question: q.quiz[0] };
        }
      }
      return null;
    },
    [progress],
  );

  /** Check if at least one quest in the list is completed */
  const isRoomCleared = useCallback(
    (questIds: number[]): boolean => {
      if (!progress) return false;
      return questIds.some((id) => progress.completedQuests.includes(id));
    },
    [progress],
  );

  /** Count completed quests from a list */
  const getRoomProgress = useCallback(
    (questIds: number[]): { completed: number; total: number } => {
      if (!progress) return { completed: 0, total: questIds.length };
      const completed = questIds.filter((id) => progress.completedQuests.includes(id)).length;
      return { completed, total: questIds.length };
    },
    [progress],
  );

  const handleCorrectAnswer = useCallback(
    (questId: number) => {
      if (!progress) return;
      const updated = completeQuest(progress, questId, 10);
      saveProgress(updated);
      setProgress(updated);
    },
    [progress],
  );

  return {
    progress,
    getQuizQuestion,
    getQuizForRoom,
    isRoomCleared,
    getRoomProgress,
    handleCorrectAnswer,
  };
}

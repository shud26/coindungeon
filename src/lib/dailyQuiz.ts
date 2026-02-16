import { dailyQuizPool, type DailyQuestion } from '@/data/dailyQuizPool';

const STORAGE_KEY = 'coindungeon-daily-quiz';
const QUESTIONS_PER_DAY = 5;

export interface DailyQuizProgress {
  lastAttemptDate: string;
  streak: number;
  bestScore: number;
  todayScore: number | null;
  history: { date: string; score: number }[];
}

const DEFAULT: DailyQuizProgress = {
  lastAttemptDate: '',
  streak: 0,
  bestScore: 0,
  todayScore: null,
  history: [],
};

export function loadDailyQuiz(): DailyQuizProgress {
  if (typeof window === 'undefined') return DEFAULT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function saveDailyQuiz(p: DailyQuizProgress) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {}
}

// Deterministic daily seed → same 5 questions for everyone
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function dateSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) || 1;
}

export function getTodayQuestions(): DailyQuestion[] {
  const today = new Date().toISOString().split('T')[0];
  const rng = seededRandom(dateSeed(today));

  // Shuffle indices using Fisher-Yates with seeded random
  const indices = Array.from({ length: dailyQuizPool.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices.slice(0, QUESTIONS_PER_DAY).map((idx) => dailyQuizPool[idx]);
}

export function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function canPlayToday(p: DailyQuizProgress): boolean {
  return p.lastAttemptDate !== todayString();
}

export function finishDailyQuiz(
  prev: DailyQuizProgress,
  score: number,
): DailyQuizProgress {
  const today = todayString();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const newStreak =
    prev.lastAttemptDate === yesterday ? prev.streak + 1 : 1;

  const newHistory = [
    ...prev.history.slice(-29), // keep last 30 days
    { date: today, score },
  ];

  return {
    lastAttemptDate: today,
    streak: newStreak,
    bestScore: Math.max(prev.bestScore, score),
    todayScore: score,
    history: newHistory,
  };
}

// XP calculation
export function calcXP(score: number): number {
  const base = score * 10; // 10 XP per correct
  const bonus = score === QUESTIONS_PER_DAY ? 50 : 0; // Perfect bonus
  return base + bonus;
}

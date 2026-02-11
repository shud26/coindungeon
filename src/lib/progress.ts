'use client';

export interface UserProgress {
  completedQuests: number[];
  currentStep: Record<number, number>;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  quizScores: Record<number, number>;
}

const STORAGE_KEY = 'coindungeon-progress';

const DEFAULT_PROGRESS: UserProgress = {
  completedQuests: [],
  currentStep: {},
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: '',
  quizScores: {},
};

export const LEVELS = [
  { level: 1, requiredXp: 0, title: '크린이' },
  { level: 2, requiredXp: 100, title: '초보 모험가' },
  { level: 3, requiredXp: 300, title: '지갑 보유자' },
  { level: 4, requiredXp: 600, title: '트레이더 견습생' },
  { level: 5, requiredXp: 1000, title: '디파이 입문자' },
  { level: 6, requiredXp: 1500, title: '온체인 탐험가' },
  { level: 7, requiredXp: 2100, title: '크립토 전사' },
  { level: 8, requiredXp: 2800, title: '블록체인 마스터' },
  { level: 9, requiredXp: 3600, title: '디젠 전설' },
  { level: 10, requiredXp: 4500, title: '던전 클리어' },
];

export function getLevel(xp: number): { level: number; title: string; currentXp: number; nextXp: number; progress: number } {
  let current = LEVELS[0];
  let next = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].requiredXp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || LEVELS[i];
      break;
    }
  }

  const currentXp = xp - current.requiredXp;
  const nextXp = next.requiredXp - current.requiredXp;
  const progress = nextXp > 0 ? Math.min((currentXp / nextXp) * 100, 100) : 100;

  return {
    level: current.level,
    title: current.title,
    currentXp,
    nextXp,
    progress,
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(saved) as UserProgress;
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage full or unavailable
  }
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (progress.lastActiveDate === today) {
    return progress;
  }

  let newStreak = 1;
  if (progress.lastActiveDate === yesterday) {
    newStreak = progress.streak + 1;
  }

  return {
    ...progress,
    streak: newStreak,
    lastActiveDate: today,
  };
}

export function completeQuest(progress: UserProgress, questId: number, xpGain: number): UserProgress {
  if (progress.completedQuests.includes(questId)) return progress;

  const newXp = progress.xp + xpGain;
  const levelInfo = getLevel(newXp);

  const updated: UserProgress = {
    ...progress,
    completedQuests: [...progress.completedQuests, questId],
    xp: newXp,
    level: levelInfo.level,
  };

  return updateStreak(updated);
}

export function isQuestUnlocked(questId: number, completedQuests: number[]): boolean {
  if (questId === 1) return true;
  return completedQuests.includes(questId - 1);
}

export function getNextQuestId(completedQuests: number[]): number {
  for (let i = 1; i <= 10; i++) {
    if (!completedQuests.includes(i)) return i;
  }
  return 10;
}

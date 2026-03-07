'use client';

export interface UserProgress {
  completedStrategies: string[];
  currentStep: Record<string, number>;
  xp: number;
  level: number;
  toolsUsed: string[];
}

const STORAGE_KEY = 'coindungeon-v2-progress';

const DEFAULT_PROGRESS: UserProgress = {
  completedStrategies: [],
  currentStep: {},
  xp: 0,
  level: 1,
  toolsUsed: [],
};

export const LEVELS = [
  { level: 1, requiredXp: 0, title: '관찰자' },
  { level: 2, requiredXp: 100, title: '리서처' },
  { level: 3, requiredXp: 300, title: '실행자' },
  { level: 4, requiredXp: 600, title: '트레이더' },
  { level: 5, requiredXp: 1000, title: '전략가' },
  { level: 6, requiredXp: 1500, title: '프로' },
  { level: 7, requiredXp: 2100, title: '크립토 네이티브' },
  { level: 8, requiredXp: 2800, title: '알파 헌터' },
  { level: 9, requiredXp: 3600, title: '마켓 메이커' },
  { level: 10, requiredXp: 4500, title: '마스터' },
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

export function completeStrategy(progress: UserProgress, slug: string, xpGain: number): UserProgress {
  if (progress.completedStrategies.includes(slug)) return progress;

  const newXp = progress.xp + xpGain;
  const levelInfo = getLevel(newXp);

  return {
    ...progress,
    completedStrategies: [...progress.completedStrategies, slug],
    xp: newXp,
    level: levelInfo.level,
  };
}

export function markToolUsed(progress: UserProgress, toolSlug: string): UserProgress {
  if (progress.toolsUsed.includes(toolSlug)) return progress;
  return {
    ...progress,
    toolsUsed: [...progress.toolsUsed, toolSlug],
    xp: progress.xp + 20,
  };
}

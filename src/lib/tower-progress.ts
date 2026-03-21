'use client';

export interface TowerProgress {
  currentFloor: number;
  cumulativeEarnings: number;
  completedQuests: string[];
  clearedStages: number[];
  lastUpdated: string;
}

const STORAGE_KEY = 'coindungeon-tower';

const DEFAULT_PROGRESS: TowerProgress = {
  currentFloor: 1,
  cumulativeEarnings: 0,
  completedQuests: [],
  clearedStages: [],
  lastUpdated: new Date().toISOString(),
};

export function loadTowerProgress(): TowerProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveTowerProgress(progress: TowerProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...progress,
      lastUpdated: new Date().toISOString(),
    }));
  } catch {
    // storage full or unavailable
  }
}

export function completeQuest(progress: TowerProgress, questId: string): TowerProgress {
  if (progress.completedQuests.includes(questId)) return progress;
  return {
    ...progress,
    completedQuests: [...progress.completedQuests, questId],
  };
}

export function clearStage(progress: TowerProgress, stageId: number): TowerProgress {
  if (progress.clearedStages.includes(stageId)) return progress;
  const nextFloor = Math.max(progress.currentFloor, stageId + 1);
  return {
    ...progress,
    clearedStages: [...progress.clearedStages, stageId],
    currentFloor: Math.min(nextFloor, 6),
  };
}

export function updateEarnings(progress: TowerProgress, amount: number): TowerProgress {
  return {
    ...progress,
    cumulativeEarnings: amount,
  };
}

export function getStageStatus(progress: TowerProgress, stageId: number): 'cleared' | 'current' | 'locked' {
  if (progress.clearedStages.includes(stageId)) return 'cleared';
  if (stageId === progress.currentFloor) return 'current';
  return 'locked';
}

export function getQuestProgress(progress: TowerProgress, stageId: number, totalQuests: number): { done: number; total: number; percent: number } {
  const done = progress.completedQuests.filter((q) => q.startsWith(`${stageId}-`)).length;
  return { done, total: totalQuests, percent: totalQuests > 0 ? (done / totalQuests) * 100 : 0 };
}

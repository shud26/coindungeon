const STORAGE_KEY = 'coindungeon-mini-games';

export interface MiniGameScores {
  updown: { plays: number; bestScore: number; lastScore: number };
  priceGuess: { plays: number; bestScore: number; lastScore: number };
  whaleOrAnt: { plays: number; bestScore: number; lastScore: number };
}

const DEFAULT: MiniGameScores = {
  updown: { plays: 0, bestScore: 0, lastScore: 0 },
  priceGuess: { plays: 0, bestScore: 0, lastScore: 0 },
  whaleOrAnt: { plays: 0, bestScore: 0, lastScore: 0 },
};

export function loadMiniGames(): MiniGameScores {
  if (typeof window === 'undefined') return DEFAULT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function saveMiniGames(data: MiniGameScores) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function updateGameScore(
  game: keyof MiniGameScores,
  score: number,
): MiniGameScores {
  const data = loadMiniGames();
  const g = data[game];
  const updated = {
    ...data,
    [game]: {
      plays: g.plays + 1,
      bestScore: Math.max(g.bestScore, score),
      lastScore: score,
    },
  };
  saveMiniGames(updated);
  return updated;
}

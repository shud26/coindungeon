const CACHE_KEY = 'coindungeon-cg-cache';
const TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: unknown;
  ts: number;
}

type CacheStore = Record<string, CacheEntry>;

function loadCache(): CacheStore {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCache(store: CacheStore) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(store));
  } catch {}
}

export async function cachedFetch<T>(url: string): Promise<T> {
  const store = loadCache();
  const cached = store[url];
  if (cached && Date.now() - cached.ts < TTL_MS) {
    return cached.data as T;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
  const data = await res.json();

  store[url] = { data, ts: Date.now() };
  // Prune old entries (keep max 20)
  const keys = Object.keys(store);
  if (keys.length > 20) {
    const sorted = keys.sort((a, b) => store[a].ts - store[b].ts);
    for (let i = 0; i < keys.length - 20; i++) {
      delete store[sorted[i]];
    }
  }
  saveCache(store);
  return data as T;
}

// Commonly used endpoints
const CG_BASE = 'https://api.coingecko.com/api/v3';

export interface SimplePriceData {
  [coinId: string]: {
    usd: number;
    usd_24h_change?: number;
    usd_24h_vol?: number;
    usd_market_cap?: number;
  };
}

export async function getSimplePrices(
  ids: string[],
  extra = false,
): Promise<SimplePriceData> {
  const params = new URLSearchParams({
    ids: ids.join(','),
    vs_currencies: 'usd',
    ...(extra
      ? {
          include_24hr_change: 'true',
          include_24hr_vol: 'true',
          include_market_cap: 'true',
        }
      : {}),
  });
  return cachedFetch<SimplePriceData>(`${CG_BASE}/simple/price?${params}`);
}

export interface MarketChartData {
  prices: [number, number][];
}

export async function getMarketChart(
  coinId: string,
  days: number,
): Promise<MarketChartData> {
  return cachedFetch<MarketChartData>(
    `${CG_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
  );
}

// Top 10 coins for games
export const GAME_COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: '비트코인' },
  { id: 'ethereum', symbol: 'ETH', name: '이더리움' },
  { id: 'solana', symbol: 'SOL', name: '솔라나' },
  { id: 'ripple', symbol: 'XRP', name: '리플' },
  { id: 'dogecoin', symbol: 'DOGE', name: '도지코인' },
  { id: 'cardano', symbol: 'ADA', name: '카르다노' },
  { id: 'avalanche-2', symbol: 'AVAX', name: '아발란체' },
  { id: 'chainlink', symbol: 'LINK', name: '체인링크' },
  { id: 'polkadot', symbol: 'DOT', name: '폴카닷' },
  { id: 'sui', symbol: 'SUI', name: '수이' },
] as const;

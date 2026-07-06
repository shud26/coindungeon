// 청산 공유 카드 — 게임(coindungeon-game MainScene)과 공유하는 데이터 레지스트리.
// 게임의 몬스터 ai 키 / 직업 id와 반드시 일치해야 함.

export interface DeathMonster {
  name: string;
  emoji: string;
  image?: string; // 일러스트 절대경로 (OG 카드용)
  lesson: string; // 교육 한 줄
  slug: string; // 용어사전 딥링크
}

export const DEATH_MONSTERS: Record<string, DeathMonster> = {
  slime: { name: '슬리피지 슬라임', emoji: '🫠', image: '/monsters/slime.png', lesson: '큰 물량은 나눠서 체결하는 게 기본.', slug: 'slippage' },
  gas: { name: '가스비 고블린', emoji: '⛽', lesson: '잦은 소액 거래는 수수료가 수익을 잠식한다.', slug: 'gas-fee' },
  fud: { name: 'FUD 유령', emoji: '👻', lesson: '패닉에 팔면 항상 바닥에서 팔게 된다. DYOR.', slug: 'fomo' },
  pump: { name: '펌핑 임프', emoji: '👺', lesson: '고점 추격이 개미 최대 사망 원인.', slug: 'fomo' },
  rug: { name: '러그풀 두더지', emoji: '🕳️', lesson: 'APY가 비현실적이면 그게 러그다.', slug: 'rug-pull' },
  kraken: { name: '고래 크라켄', emoji: '🐙', lesson: '고래가 벽을 치면 정면돌파하지 마라.', slug: 'whale' },
  wolf: { name: '청산 늑대', emoji: '🐺', image: '/monsters/wolf.png', lesson: '레버리지는 쓰는 순간 청산가가 생긴다.', slug: 'liquidation' },
  bear: { name: '베어마켓 곰', emoji: '🐻', lesson: '하락장은 이기는 게 아니라 살아남는 것.', slug: 'bull-bear' },
  swan: { name: '블랙스완', emoji: '🦢', image: '/monsters/swan.png', lesson: '헤지 비용은 아까운 게 아니라 보험료다.', slug: 'delta-neutral' },
};

export const DEATH_CLASSES: Record<string, { name: string; icon: string }> = {
  hodler: { name: '호들러', icon: '🪨' },
  farmer: { name: '에어드랍 파머', icon: '🌾' },
  copytrader: { name: '따리꾼', icon: '👥' },
  futures: { name: '선물 트레이더', icon: '📊' },
};

export interface DeathParams {
  monster: DeathMonster & { key: string };
  floor: number;
  kills: number;
  cls: { key: string; name: string; icon: string };
  clear: boolean; // 완주(클리어) 카드 여부
}

/** searchParams → 검증된 파라미터. 이상한 값은 전부 안전한 기본값으로. */
export function parseDeathParams(sp: Record<string, string | string[] | undefined>): DeathParams {
  const get = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]) ?? '';
  const mKey = DEATH_MONSTERS[get('m')] ? get('m') : 'wolf';
  const cKey = DEATH_CLASSES[get('c')] ? get('c') : 'hodler';
  const floor = Math.min(5, Math.max(1, parseInt(get('f'), 10) || 1));
  const kills = Math.min(99, Math.max(0, parseInt(get('k'), 10) || 0));
  return {
    monster: { key: mKey, ...DEATH_MONSTERS[mKey] },
    floor,
    kills,
    cls: { key: cKey, ...DEATH_CLASSES[cKey] },
    clear: get('w') === '1',
  };
}

export function deathQueryString(p: Record<string, string>): string {
  return new URLSearchParams(p).toString();
}

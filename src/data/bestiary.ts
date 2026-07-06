// 몬스터 도감 — 세계관: shud-brain/notes/코인던전/리뉴얼-세계관-2026-07.md
// 원칙(그리드 아일랜드): 개념 자체가 몬스터의 행동 규칙. 공략법을 안다 = 개념을 이해했다.

export type MonsterRank = '잡몹' | '일반' | '엘리트' | '보스';

export interface Monster {
  slug: string;
  name: string;
  emoji: string;
  concept: string; // 크립토 개념 한 줄
  rank: MonsterRank;
  floor: number; // 1~5
  mechanism: string; // 전투 메커니즘 = 개념
  lesson: string; // 공략 = 배움
  memeLine: string; // 인텐트 밈 대사
  glossarySlugs: string[]; // 용어사전 딥링크
  inGame: boolean; // 현재 게임에 구현됐는지
  image?: string; // 일러스트 (없으면 이모지 폴백)
}

export interface Floor {
  depth: number;
  name: string;
  theme: string;
}

export const floors: Floor[] = [
  { depth: 1, name: 'B1 — 시장 심리', theme: '슬리피지 · 가스비 · FUD. 시장의 첫 관문.' },
  { depth: 2, name: 'B2 — 스캠과 공격', theme: '러그풀 · 펌프&덤프. 너무 좋은 공짜는 미끼다.' },
  { depth: 3, name: 'B3 — 레버리지', theme: '청산 · 마진콜. 여기서부터 진짜 돈이 사라진다.' },
  { depth: 4, name: 'B4 — 고래의 영역', theme: '매도벽 · 변동성. 개미는 타이밍으로 이긴다.' },
  { depth: 5, name: 'B5 — 사이클의 심연', theme: '베어마켓 · 블랙스완. 이기는 게 아니라 살아남는 것.' },
];

export const monsters: Monster[] = [
  {
    slug: 'slippage-slime',
    name: '슬리피지 슬라임',
    emoji: '🟢',
    concept: '슬리피지 — 주문이 미끄러져 예상보다 나쁜 가격에 체결되는 것',
    rank: '잡몹',
    floor: 1,
    mechanism:
      '미끌미끌: 한 방 데미지 8 이상인 큰 공격은 25% 미끄러져 깎인다. 잘게 나눈 멀티히트는 안 깎임.',
    lesson: '큰 주문일수록 슬리피지가 크다. 분할 체결이 유리하다.',
    memeLine: '"당신의 시장가 주문, 잘 먹겠습니다"',
    glossarySlugs: ['slippage', 'market-order', 'order-book'],
    inGame: true,
    image: '/monsters/slime.png',
  },
  {
    slug: 'gas-goblin',
    name: '가스비 고블린',
    emoji: '⛽',
    concept: '가스비 — 트랜잭션마다 내는 네트워크 수수료',
    rank: '잡몹',
    floor: 1,
    mechanism: '통행료: 플레이어가 카드를 낼 때마다 고블린의 방어막이 +1 (거래마다 가스비 징수).',
    lesson: '잔거래 남발 = 수수료 잠식. 한 턴에 굵은 한 방이 이득.',
    memeLine: '"가스비는 선불입니다, 고객님"',
    glossarySlugs: ['gas-fee', 'layer2'],
    inGame: true,
  },
  {
    slug: 'fud-ghost',
    name: 'FUD 유령',
    emoji: '👻',
    concept: 'FUD — 공포·불확실성·의심을 퍼뜨리는 과장된 악재',
    rank: '일반',
    floor: 1,
    mechanism:
      '실체 없음: 인텐트가 뻥튀기로 표시된다 — "💥 999 거래소 해킹 루머!!!" → 실제 타격은 3~5. 겁먹고 올방어(패닉셀)하면 템포를 잃는다.',
    lesson: 'FUD는 과장이다. 패닉에 팔지 마라. DYOR.',
    memeLine: '"소식통에 따르면… (아마도… 몰라요…)"',
    glossarySlugs: ['fomo', 'bull-bear'],
    inGame: true,
  },
  {
    slug: 'pump-imp',
    name: '펌핑 임프',
    emoji: '📈',
    concept: '펌프&덤프 — 인위적으로 띄운 뒤 물량을 던지는 시세조작',
    rank: '일반',
    floor: 2,
    mechanism:
      '펌프→덤프 사이클: 3턴 연속 힘을 불리며 "가즈아아" → 4턴째 몰빵 덤프 후 힘 전부 소멸 + 자기 덤프에 자기가 다침.',
    lesson: '고점 추격 금지. 펌프 초입에 잡거나, 덤프 한 방을 버티면 그 뒤가 기회.',
    memeLine: '"이번엔 진짜 다르다니까? 가즈아아아"',
    glossarySlugs: ['fomo', 'volume', 'market-cap'],
    inGame: true,
  },
  {
    slug: 'rug-mole',
    name: '러그풀 두더지',
    emoji: '🕳️',
    concept: '러그풀 — 개발자가 자금 들고 튀는 먹튀 스캠',
    rank: '일반',
    floor: 2,
    mechanism:
      '먹튀 시나리오: 1~2턴은 공격 없이 선물을 준다(턴마다 골드 +5, "에어드랍이에요~ APY 800%"). 3턴째 준 것의 2배를 강탈하고 굴로 숨는다.',
    lesson: '너무 좋은 공짜 = 미끼. 선물에 취하지 말고 초반에 패라.',
    memeLine: '"APY 800% 무료 에어드랍이에요~ 믿으세요~"',
    glossarySlugs: ['rug-pull', 'phishing', 'airdrop'],
    inGame: true,
  },
  {
    slug: 'liquidation-wolf',
    name: '청산 늑대',
    emoji: '🐺',
    concept: '강제청산 — 레버리지 포지션이 증거금 부족으로 강제 종료되는 것',
    rank: '일반',
    floor: 3,
    mechanism:
      '청산 사냥: 이번 턴 레버리지 카드를 썼다면 늑대의 다음 공격이 2배 크리티컬. 체력 30% 미만이면 공격 +50% (마진콜 사냥).',
    lesson: '레버리지는 쓰는 순간 청산 리스크에 노출된다. 잔고 얇을 때 레버리지 = 죽음.',
    memeLine: '"레버리지 포지션 냄새가 나는군… 킁킁"',
    glossarySlugs: ['liquidation', 'leverage', 'long-short'],
    inGame: true,
    image: '/monsters/wolf.png',
  },
  {
    slug: 'whale-kraken',
    name: '고래 크라켄',
    emoji: '🐙',
    concept: '고래 — 시장을 흔드는 대형 보유자의 물량',
    rank: '엘리트',
    floor: 4,
    mechanism:
      '매도벽 + 물량 투하: 벽 턴(방어 20, 잔공격 흡수)과 투하 턴(막아도 2 관통하는 광역 강타)이 교대. 벽 턴에 딜을 넣으면 낭비.',
    lesson: '고래가 벽을 치면 정면돌파하지 말고 기다려라. 개미는 타이밍으로 이긴다.',
    memeLine: '"이 벽, 뚫을 수 있겠어?"',
    glossarySlugs: ['whale', 'order-book', 'volume'],
    inGame: true,
  },
  {
    slug: 'bear-market',
    name: '베어마켓 곰',
    emoji: '🐻',
    concept: '하락장 — 모든 것이 천천히 녹아내리는 시장의 겨울',
    rank: '보스',
    floor: 5,
    mechanism:
      '겨울: 전투 내내 매 턴 체력 -2 (포트폴리오 출혈) + 회복 효과 절반. 예고 후 "하락 N파" 강타. 단, 10턴 이후 곰의 힘이 턴마다 감소한다 — 하락장은 영원하지 않다.',
    lesson: '하락장은 이기는 게 아니라 살아남는 것. 출혈을 관리하고 버티면 사이클이 돈다.',
    memeLine: '"겨울은 길다… 네 잔고보다는 짧겠지만"',
    glossarySlugs: ['bull-bear', 'dca', 'stop-loss'],
    inGame: true,
  },
  {
    slug: 'black-swan',
    name: '블랙스완',
    emoji: '🦢',
    concept: '테일리스크 — 낮은 확률, 치명적 충격의 폭락 이벤트',
    rank: '보스',
    floor: 5,
    mechanism:
      '테일리스크: 인텐트에 확률만 공개된다 — "🎲 90% 평타 7 / 10% 블랙스완 40". 뭐가 나올지는 모르지만 기대값 계산은 가능. 헤지(보험) 카드로 받는 피해에 상한을 걸 수 있다.',
    lesson: '최악의 시나리오는 확률이 낮아도 대비해야 한다. 헤지는 비용이 아니라 보험이다.',
    memeLine: '"설마가 사람 잡는 걸 보여줄게"',
    glossarySlugs: ['delta-neutral', 'stop-loss', 'perpetual'],
    inGame: true,
    image: '/monsters/swan.png',
  },
];

export function getMonstersByFloor(depth: number): Monster[] {
  return monsters.filter((m) => m.floor === depth);
}

export function getMonsterBySlug(slug: string): Monster | undefined {
  return monsters.find((m) => m.slug === slug);
}

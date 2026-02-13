/**
 * Multi-room dungeon system.
 * Each room has a unique map, theme, NPCs, coins, and doors.
 * Quest categories → rooms:
 *   lobby       → 기초/지갑 (quests 1-5)
 *   defi-hall   → 디파이 (quests 6-10)
 *   trading-pit → 트레이딩/거래소 (quests 11-20)
 *   nft-cave    → NFT/에어드랍 (quests 21-25)
 *   whale-vault → 온체인/보안 (quests 26-30)
 */

export interface RoomNpc {
  col: number;
  row: number;
  label: string;
  color: number;
}

export interface RoomCoin {
  col: number;
  row: number;
  fact: string; // crypto micro-fact shown on pickup
}

export interface RoomDoor {
  col: number;
  row: number;
  targetRoom: string;
  spawnCol: number;
  spawnRow: number;
  label: string;
}

export interface RoomTheme {
  wall: number;
  wallHighlight: number;
  floor: number;
  floorAlt: number;
  accent: number;
  torchColor: number;
  name: string;
  nameEn: string;
}

export interface RoomData {
  id: string;
  map: number[][];
  theme: RoomTheme;
  npcs: RoomNpc[];
  coins: RoomCoin[];
  doors: RoomDoor[];
  torches: [number, number][]; // [col, row]
  playerSpawn: { col: number; row: number };
}

/* ── Map Layouts ──────────────────────────────── */
// 0 = floor, 1 = wall, 2 = door (visual only, logic in doors array)

const LOBBY_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // east door row
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const DEFI_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // doors row
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const TRADING_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const NFT_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const WHALE_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

/* ── Room Definitions ─────────────────────────── */

export const ROOMS: Record<string, RoomData> = {
  lobby: {
    id: 'lobby',
    map: LOBBY_MAP,
    theme: {
      wall: 0x3f3f46,
      wallHighlight: 0x52525b,
      floor: 0x18181b,
      floorAlt: 0x1c1c20,
      accent: 0x6366f1,
      torchColor: 0xf59e0b,
      name: '시작의 방',
      nameEn: 'Lobby',
    },
    npcs: [
      { col: 7, row: 2, label: '가이드', color: 0x22c55e },
    ],
    coins: [
      { col: 3, row: 3, fact: 'BTC는 2009년 탄생' },
      { col: 11, row: 3, fact: '1 BTC = 1억 사토시' },
      { col: 3, row: 7, fact: '이더리움 창시자: 비탈릭 부테린' },
      { col: 11, row: 7, fact: '블록체인 = 분산 원장' },
    ],
    doors: [
      { col: 14, row: 5, targetRoom: 'defi-hall', spawnCol: 1, spawnRow: 5, label: 'DeFi →' },
    ],
    torches: [[2, 1], [12, 1], [2, 8], [12, 8]],
    playerSpawn: { col: 7, row: 7 },
  },

  'defi-hall': {
    id: 'defi-hall',
    map: DEFI_MAP,
    theme: {
      wall: 0x1e3a5f,
      wallHighlight: 0x2a4a70,
      floor: 0x0f1b2d,
      floorAlt: 0x121f33,
      accent: 0x3b82f6,
      torchColor: 0x60a5fa,
      name: 'DeFi 홀',
      nameEn: 'DeFi Hall',
    },
    npcs: [
      { col: 7, row: 2, label: 'DeFi 마스터', color: 0x3b82f6 },
    ],
    coins: [
      { col: 5, row: 2, fact: 'DeFi = 탈중앙 금융' },
      { col: 9, row: 2, fact: 'TVL = 총 예치 자산' },
      { col: 5, row: 7, fact: 'AMM = 자동 마켓 메이커' },
      { col: 9, row: 7, fact: 'LP = 유동성 공급자' },
      { col: 7, row: 5, fact: '이자 농사 = Yield Farming' },
    ],
    doors: [
      { col: 0, row: 5, targetRoom: 'lobby', spawnCol: 13, spawnRow: 5, label: '← 로비' },
      { col: 14, row: 5, targetRoom: 'trading-pit', spawnCol: 1, spawnRow: 5, label: '트레이딩 →' },
    ],
    torches: [[2, 1], [12, 1], [2, 8], [12, 8]],
    playerSpawn: { col: 7, row: 7 },
  },

  'trading-pit': {
    id: 'trading-pit',
    map: TRADING_MAP,
    theme: {
      wall: 0x5f1e1e,
      wallHighlight: 0x702a2a,
      floor: 0x2d0f0f,
      floorAlt: 0x331212,
      accent: 0xef4444,
      torchColor: 0xf87171,
      name: '트레이딩 핏',
      nameEn: 'Trading Pit',
    },
    npcs: [
      { col: 4, row: 3, label: '트레이더', color: 0xef4444 },
      { col: 10, row: 7, label: '차트 분석가', color: 0xfbbf24 },
    ],
    coins: [
      { col: 2, row: 2, fact: '롱 = 가격 상승에 베팅' },
      { col: 12, row: 2, fact: '숏 = 가격 하락에 베팅' },
      { col: 7, row: 5, fact: '레버리지 = 빌려서 매매' },
      { col: 2, row: 7, fact: '스탑로스 = 손절 주문' },
      { col: 12, row: 7, fact: '김프 = 한국 프리미엄' },
    ],
    doors: [
      { col: 0, row: 5, targetRoom: 'defi-hall', spawnCol: 13, spawnRow: 5, label: '← DeFi' },
      { col: 14, row: 5, targetRoom: 'nft-cave', spawnCol: 1, spawnRow: 5, label: 'NFT →' },
    ],
    torches: [[1, 1], [13, 1], [1, 8], [13, 8]],
    playerSpawn: { col: 7, row: 5 },
  },

  'nft-cave': {
    id: 'nft-cave',
    map: NFT_MAP,
    theme: {
      wall: 0x1e5f3a,
      wallHighlight: 0x2a7048,
      floor: 0x0f2d1b,
      floorAlt: 0x12331f,
      accent: 0x22c55e,
      torchColor: 0x4ade80,
      name: 'NFT 동굴',
      nameEn: 'NFT Cave',
    },
    npcs: [
      { col: 7, row: 4, label: 'NFT 아티스트', color: 0x22c55e },
    ],
    coins: [
      { col: 3, row: 1, fact: 'NFT = 대체 불가 토큰' },
      { col: 11, row: 1, fact: 'OpenSea = NFT 마켓' },
      { col: 3, row: 8, fact: 'PFP = 프로필 사진 NFT' },
      { col: 11, row: 8, fact: 'BAYC = 유명 NFT 컬렉션' },
      { col: 7, row: 7, fact: '에어드랍 = 무료 토큰 배포' },
    ],
    doors: [
      { col: 0, row: 5, targetRoom: 'trading-pit', spawnCol: 13, spawnRow: 5, label: '← 트레이딩' },
      { col: 14, row: 5, targetRoom: 'whale-vault', spawnCol: 1, spawnRow: 5, label: '금고 →' },
    ],
    torches: [[1, 1], [13, 1], [1, 8], [13, 8]],
    playerSpawn: { col: 7, row: 5 },
  },

  'whale-vault': {
    id: 'whale-vault',
    map: WHALE_MAP,
    theme: {
      wall: 0x4a3f1e,
      wallHighlight: 0x5c4f2a,
      floor: 0x2d250f,
      floorAlt: 0x332b12,
      accent: 0xf59e0b,
      torchColor: 0xfbbf24,
      name: '고래의 금고',
      nameEn: "Whale's Vault",
    },
    npcs: [
      { col: 7, row: 3, label: '고래', color: 0xf59e0b },
      { col: 4, row: 6, label: '보안 전문가', color: 0xa855f7 },
    ],
    coins: [
      { col: 2, row: 2, fact: '고래 = 대량 보유자' },
      { col: 12, row: 2, fact: '콜드월렛 = 오프라인 지갑' },
      { col: 7, row: 5, fact: '개인키 = 절대 공유 금지!' },
      { col: 2, row: 7, fact: '2FA = 이중 인증 필수' },
      { col: 12, row: 7, fact: 'DYOR = 직접 조사하기' },
    ],
    doors: [
      { col: 0, row: 5, targetRoom: 'nft-cave', spawnCol: 13, spawnRow: 5, label: '← NFT' },
    ],
    torches: [[2, 1], [12, 1], [2, 8], [12, 8]],
    playerSpawn: { col: 7, row: 5 },
  },
};

export const ROOM_ORDER = ['lobby', 'defi-hall', 'trading-pit', 'nft-cave', 'whale-vault'];

export function getRoom(id: string): RoomData {
  return ROOMS[id] ?? ROOMS.lobby;
}

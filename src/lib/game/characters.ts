export interface CharacterMeta {
  key: string;
  name: string;
  nameKo: string;
  description: string;
  spritePath: string;
  frameWidth: number;
  frameHeight: number;
  /** Fallback color when PNG is missing (hex number for Phaser) */
  color: number;
  /** Pixel art sprite data: 2D array, null = transparent, number = hex color */
  pixels: (number | null)[][];
}

/* ── Palette constants ──────────────────────── */
const SKIN = 0xf5c6a0;
const SKIN_S = 0xd4a574;
const EYE = 0x1a1a2e;
const HAIR_BR = 0x5c3317;
const BOOT_BR = 0x3d2b1f;
const PANT_DK = 0x2a2a3a;

/* ── 10x14 Pixel Art Sprites ────────────────── */
const _ = null; // transparent

const ADVENTURER_PX: (number | null)[][] = [
  [_, _, _, 0x4f46e5, 0x4f46e5, 0x4f46e5, 0x4f46e5, _, _, _],
  [_, _, 0x4f46e5, 0x6366f1, 0x6366f1, 0x6366f1, 0x6366f1, 0x4f46e5, _, _],
  [_, _, HAIR_BR, HAIR_BR, HAIR_BR, HAIR_BR, HAIR_BR, HAIR_BR, _, _],
  [_, HAIR_BR, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, HAIR_BR, _],
  [_, _, SKIN, EYE, SKIN, SKIN, EYE, SKIN, _, _],
  [_, _, SKIN_S, SKIN, SKIN_S, SKIN_S, SKIN, SKIN_S, _, _],
  [_, _, _, SKIN, SKIN, SKIN, SKIN, _, _, _],
  [_, 0x4f46e5, 0x6366f1, 0x6366f1, 0x6366f1, 0x6366f1, 0x6366f1, 0x6366f1, 0x4f46e5, _],
  [_, 0x4f46e5, 0x6366f1, 0x818cf8, 0x6366f1, 0x6366f1, 0x818cf8, 0x6366f1, 0x4f46e5, _],
  [_, _, 0x6366f1, 0x6366f1, 0x6366f1, 0x6366f1, 0x6366f1, 0x6366f1, _, _],
  [_, _, SKIN, 0x6366f1, 0x6366f1, 0x6366f1, 0x6366f1, SKIN, _, _],
  [_, _, _, PANT_DK, PANT_DK, PANT_DK, PANT_DK, _, _, _],
  [_, _, _, PANT_DK, _, _, PANT_DK, _, _, _],
  [_, _, BOOT_BR, BOOT_BR, _, _, BOOT_BR, BOOT_BR, _, _],
];

const HACKER_PX: (number | null)[][] = [
  [_, _, _, 0x166534, 0x166534, 0x166534, 0x166534, _, _, _],
  [_, _, 0x166534, 0x166534, 0x166534, 0x166534, 0x166534, 0x166534, _, _],
  [_, _, 0x166534, 0x15803d, 0x15803d, 0x15803d, 0x15803d, 0x166534, _, _],
  [_, 0x166534, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, 0x166534, _],
  [_, _, SKIN, 0x00ff41, SKIN, SKIN, 0x00ff41, SKIN, _, _],
  [_, _, SKIN_S, SKIN, SKIN_S, SKIN_S, SKIN, SKIN_S, _, _],
  [_, _, _, SKIN, SKIN, SKIN, SKIN, _, _, _],
  [_, 0x166534, 0x15803d, 0x15803d, 0x15803d, 0x15803d, 0x15803d, 0x15803d, 0x166534, _],
  [_, 0x166534, 0x15803d, 0x22c55e, 0x15803d, 0x15803d, 0x22c55e, 0x15803d, 0x166534, _],
  [_, _, 0x15803d, 0x15803d, 0x15803d, 0x15803d, 0x15803d, 0x15803d, _, _],
  [_, _, SKIN, 0x15803d, 0x15803d, 0x15803d, 0x15803d, SKIN, _, _],
  [_, _, _, 0x1a1a2e, 0x1a1a2e, 0x1a1a2e, 0x1a1a2e, _, _, _],
  [_, _, _, 0x1a1a2e, _, _, 0x1a1a2e, _, _, _],
  [_, _, 0x1a1a2e, 0x1a1a2e, _, _, 0x1a1a2e, 0x1a1a2e, _, _],
];

const KNIGHT_PX: (number | null)[][] = [
  [_, _, _, 0xb45309, 0xf59e0b, 0xf59e0b, 0xb45309, _, _, _],
  [_, _, 0xb45309, 0xf59e0b, 0xfbbf24, 0xfbbf24, 0xf59e0b, 0xb45309, _, _],
  [_, _, 0x92400e, 0x92400e, 0x92400e, 0x92400e, 0x92400e, 0x92400e, _, _],
  [_, 0x92400e, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, 0x92400e, _],
  [_, _, SKIN, EYE, SKIN, SKIN, EYE, SKIN, _, _],
  [_, _, SKIN_S, SKIN, SKIN_S, SKIN_S, SKIN, SKIN_S, _, _],
  [_, _, _, SKIN, SKIN, SKIN, SKIN, _, _, _],
  [_, 0xb45309, 0xd97706, 0xd97706, 0xf59e0b, 0xf59e0b, 0xd97706, 0xd97706, 0xb45309, _],
  [_, 0xb45309, 0xd97706, 0xfbbf24, 0xd97706, 0xd97706, 0xfbbf24, 0xd97706, 0xb45309, _],
  [_, _, 0xd97706, 0xd97706, 0xd97706, 0xd97706, 0xd97706, 0xd97706, _, _],
  [_, _, SKIN, 0xd97706, 0xd97706, 0xd97706, 0xd97706, SKIN, _, _],
  [_, _, _, PANT_DK, PANT_DK, PANT_DK, PANT_DK, _, _, _],
  [_, _, _, PANT_DK, _, _, PANT_DK, _, _, _],
  [_, _, 0x92400e, 0x92400e, _, _, 0x92400e, 0x92400e, _, _],
];

const MAGE_PX: (number | null)[][] = [
  [_, _, _, _, 0x7e22ce, _, _, _, _, _],
  [_, _, _, 0x7e22ce, 0x9333ea, 0x7e22ce, _, _, _, _],
  [_, _, 0x7e22ce, 0x9333ea, 0xa855f7, 0x9333ea, 0x7e22ce, _, _, _],
  [_, 0x7e22ce, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, 0x7e22ce, _],
  [_, _, SKIN, 0xc084fc, SKIN, SKIN, 0xc084fc, SKIN, _, _],
  [_, _, SKIN_S, SKIN, SKIN_S, SKIN_S, SKIN, SKIN_S, _, _],
  [_, _, _, SKIN, SKIN, SKIN, SKIN, _, _, _],
  [_, 0x7e22ce, 0x9333ea, 0x9333ea, 0xa855f7, 0xa855f7, 0x9333ea, 0x9333ea, 0x7e22ce, _],
  [_, 0x7e22ce, 0x9333ea, 0xc084fc, 0x9333ea, 0x9333ea, 0xc084fc, 0x9333ea, 0x7e22ce, _],
  [_, _, 0x9333ea, 0x9333ea, 0x9333ea, 0x9333ea, 0x9333ea, 0x9333ea, _, _],
  [_, _, 0x9333ea, 0x9333ea, 0x9333ea, 0x9333ea, 0x9333ea, 0x9333ea, _, _],
  [_, _, _, 0x9333ea, 0x9333ea, 0x9333ea, 0x9333ea, _, _, _],
  [_, _, _, PANT_DK, _, _, PANT_DK, _, _, _],
  [_, _, 0x3d2b1f, 0x3d2b1f, _, _, 0x3d2b1f, 0x3d2b1f, _, _],
];

export const CHARACTERS: CharacterMeta[] = [
  {
    key: 'adventurer',
    name: 'Adventurer',
    nameKo: '모험가',
    description: '크립토 세계를 처음 탐험하는 용감한 모험가',
    spritePath: '/assets/sprites/characters/adventurer.png',
    frameWidth: 64,
    frameHeight: 64,
    color: 0x6366f1,
    pixels: ADVENTURER_PX,
  },
  {
    key: 'hacker',
    name: 'Hacker',
    nameKo: '해커',
    description: '코드와 블록체인을 자유자재로 다루는 해커',
    spritePath: '/assets/sprites/characters/hacker.png',
    frameWidth: 64,
    frameHeight: 64,
    color: 0x22c55e,
    pixels: HACKER_PX,
  },
  {
    key: 'knight',
    name: 'Knight',
    nameKo: '기사',
    description: '자산을 굳건히 지키는 HODLer 기사',
    spritePath: '/assets/sprites/characters/knight.png',
    frameWidth: 64,
    frameHeight: 64,
    color: 0xf59e0b,
    pixels: KNIGHT_PX,
  },
  {
    key: 'mage',
    name: 'Mage',
    nameKo: '마법사',
    description: 'DeFi 마법으로 수익을 창조하는 마법사',
    spritePath: '/assets/sprites/characters/mage.png',
    frameWidth: 64,
    frameHeight: 64,
    color: 0xa855f7,
    pixels: MAGE_PX,
  },
];

export const CHARACTER_STORAGE_KEY = 'coindungeon:selectedCharacter';

export function getCharacter(key: string): CharacterMeta {
  return CHARACTERS.find((c) => c.key === key) ?? CHARACTERS[0];
}

export function getSavedCharacterKey(): string {
  if (typeof window === 'undefined') return CHARACTERS[0].key;
  return localStorage.getItem(CHARACTER_STORAGE_KEY) ?? CHARACTERS[0].key;
}

export function saveCharacterKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CHARACTER_STORAGE_KEY, key);
}

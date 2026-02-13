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
}

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

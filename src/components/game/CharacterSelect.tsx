'use client';

import { useState, useEffect } from 'react';
import { Gamepad2 } from 'lucide-react';
import {
  CHARACTERS,
  CHARACTER_STORAGE_KEY,
  saveCharacterKey,
} from '@/lib/game/characters';

interface Props {
  onStart: (characterKey: string) => void;
}

export default function CharacterSelect({ onStart }: Props) {
  const [selected, setSelected] = useState(CHARACTERS[0].key);

  useEffect(() => {
    const saved = localStorage.getItem(CHARACTER_STORAGE_KEY);
    if (saved && CHARACTERS.some((c) => c.key === saved)) {
      setSelected(saved);
    }
  }, []);

  const handleStart = () => {
    saveCharacterKey(selected);
    onStart(selected);
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      {/* Title */}
      <div className="mb-6 text-center">
        <Gamepad2
          size={28}
          className="mx-auto mb-2"
          style={{ color: 'var(--accent)' }}
        />
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          캐릭터 선택
        </h2>
        <p className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
          던전을 함께할 동료를 골라보자
        </p>
      </div>

      {/* 2x2 grid */}
      <div className="grid w-full max-w-[400px] grid-cols-2 gap-3">
        {CHARACTERS.map((char) => {
          const active = selected === char.key;
          const cssColor = `#${char.color.toString(16).padStart(6, '0')}`;
          return (
            <button
              key={char.key}
              onClick={() => setSelected(char.key)}
              className="card relative flex flex-col items-center gap-2 p-4 transition-all"
              style={{
                outline: active ? `2px solid var(--accent)` : '2px solid transparent',
                outlineOffset: -1,
              }}
            >
              {/* Preview square (placeholder for sprite) */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-lg"
                style={{ background: `${cssColor}22` }}
              >
                <div
                  className="h-8 w-8 rounded"
                  style={{ background: cssColor }}
                />
              </div>

              {/* Name */}
              <div className="text-center">
                <p
                  className="text-sm font-bold"
                  style={{ color: active ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  {char.nameKo}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {char.name}
                </p>
              </div>

              {/* Description */}
              <p
                className="text-[10px] leading-snug"
                style={{ color: 'var(--text-quaternary)' }}
              >
                {char.description}
              </p>

              {/* Selected badge */}
              {active && (
                <div
                  className="absolute -top-1 -right-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  선택
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        className="mt-6 w-full max-w-[400px] rounded-xl py-3 text-sm font-bold transition-opacity active:opacity-80"
        style={{ background: 'var(--accent)', color: '#fff' }}
      >
        시작하기
      </button>
    </div>
  );
}

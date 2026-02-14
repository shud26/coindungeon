'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';
import {
  CHARACTERS,
  CHARACTER_STORAGE_KEY,
  saveCharacterKey,
} from '@/lib/game/characters';
import PixelSprite from './PixelSprite';

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
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4">
      {/* Title */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Swords
          size={24}
          className="mx-auto mb-3"
          style={{ color: 'var(--accent)' }}
        />
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          동료를 선택하세요
        </h2>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          던전을 함께 탐험할 캐릭터를 골라보세요
        </p>
      </motion.div>

      {/* 2x2 grid */}
      <div className="grid w-full max-w-[420px] grid-cols-2 gap-3">
        {CHARACTERS.map((char, idx) => {
          const active = selected === char.key;
          const cssColor = `#${char.color.toString(16).padStart(6, '0')}`;
          return (
            <motion.button
              key={char.key}
              onClick={() => setSelected(char.key)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              className="card relative flex flex-col items-center gap-3 p-5 transition-all"
              style={{
                outline: active ? `2px solid ${cssColor}` : '2px solid transparent',
                outlineOffset: -1,
                background: active ? `${cssColor}08` : undefined,
              }}
            >
              {/* Pixel art avatar */}
              <motion.div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 64,
                  height: 72,
                  background: active ? `${cssColor}12` : 'var(--bg-elevated)',
                }}
                animate={active ? { y: [0, -3, 0] } : { y: 0 }}
                transition={active ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
              >
                <PixelSprite pixels={char.pixels} size={4} />
              </motion.div>

              {/* Name */}
              <div className="text-center">
                <p
                  className="text-sm font-bold"
                  style={{ color: active ? cssColor : 'var(--text-primary)' }}
                >
                  {char.nameKo}
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: 'var(--text-quaternary)' }}
                >
                  {char.name}
                </p>
              </div>

              {/* Description */}
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {char.description}
              </p>

              {/* Selected indicator */}
              {active && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ background: cssColor, color: '#fff' }}
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Start button */}
      <motion.button
        onClick={handleStart}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35 }}
        whileTap={{ scale: 0.97 }}
        className="mt-8 w-full max-w-[420px] rounded-xl py-3.5 text-sm font-bold transition-opacity"
        style={{ background: 'var(--accent)', color: '#fff' }}
      >
        던전 입장
      </motion.button>
    </div>
  );
}

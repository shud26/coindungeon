'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, ChevronRight, Trophy } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/components/Motion';
import { loadMiniGames, type MiniGameScores } from '@/lib/miniGames';

export default function MiniGamesPage() {
  const [scores, setScores] = useState<MiniGameScores | null>(null);

  useEffect(() => {
    setScores(loadMiniGames());
  }, []);

  const games = [
    {
      href: '/mini/updown',
      title: '코인 업다운',
      desc: '차트를 보고 다음날 방향을 맞춰라',
      icon: TrendingUp,
      color: '#34D399',
      plays: scores?.updown.plays ?? 0,
      best: scores?.updown.bestScore ?? 0,
      maxScore: 10,
    },
  ];

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
        <Link href="/play" className="text-text-tertiary">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-[22px] font-bold">미니게임</h1>
      </motion.div>

      <div className="flex flex-col gap-3">
        {games.map((g) => (
          <motion.div key={g.href} variants={staggerItem}>
            <Link href={g.href} className="block">
              <div className="card p-5 flex items-center gap-4 transition-transform active:scale-[0.995]">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{ width: 48, height: 48, background: `${g.color}12` }}
                >
                  <g.icon size={22} style={{ color: g.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold">{g.title}</span>
                    <ChevronRight size={16} className="text-text-quaternary" />
                  </div>
                  <p className="mt-0.5 text-[13px] text-text-secondary">{g.desc}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-[12px] text-text-tertiary">
                    <span>{g.plays}회 플레이</span>
                    {g.plays > 0 && (
                      <span className="flex items-center gap-0.5">
                        <Trophy size={11} />
                        최고 {g.best}/{g.maxScore}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {games.length <= 1 && (
        <motion.div variants={staggerItem} className="mt-8 text-center">
          <p className="text-[13px] text-text-tertiary">더 많은 미니게임이 곧 추가됩니다!</p>
        </motion.div>
      )}
    </motion.div>
  );
}

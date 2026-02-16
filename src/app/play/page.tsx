'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gamepad2, CalendarCheck, Zap, ChevronRight, TrendingUp, Trophy } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/components/Motion';
import { loadProgress } from '@/lib/progress';

interface DailyQuizProgress {
  lastAttemptDate: string;
  streak: number;
  bestScore: number;
  todayScore: number | null;
}

interface MiniGameProgress {
  updown: { plays: number; bestScore: number };
}

export default function PlayPage() {
  const [dailyDone, setDailyDone] = useState(false);
  const [miniGames, setMiniGames] = useState<MiniGameProgress | null>(null);
  const [roomsCleared, setRoomsCleared] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const dq = localStorage.getItem('coindungeon-daily-quiz');
      if (dq) {
        const parsed: DailyQuizProgress = JSON.parse(dq);
        setDailyDone(parsed.lastAttemptDate === today);
      }
    } catch {}
    try {
      const mg = localStorage.getItem('coindungeon-mini-games');
      if (mg) setMiniGames(JSON.parse(mg));
    } catch {}
    const progress = loadProgress();
    const completed = progress.completedQuests.length;
    setRoomsCleared(Math.min(Math.floor(completed / 5), 5));
  }, []);

  const games = [
    {
      href: '/game',
      title: '던전 RPG',
      desc: '5개 방을 탐험하며 퀴즈를 풀자',
      icon: Gamepad2,
      color: '#8B7CFF',
      stat: `${roomsCleared}/5 방 클리어`,
    },
    {
      href: '/daily',
      title: '데일리 퀴즈',
      desc: '매일 5문제, 10초 타이머',
      icon: CalendarCheck,
      color: '#34D399',
      stat: dailyDone ? '오늘 완료!' : '도전 가능',
    },
    {
      href: '/mini',
      title: '미니게임',
      desc: '코인 업다운, 가격 맞추기',
      icon: Zap,
      color: '#FBBF24',
      stat: miniGames ? `${miniGames.updown.plays}회 플레이` : '새로운 게임',
    },
  ];

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={staggerItem}>
        <h1 className="text-[28px] font-bold tracking-tight leading-tight">게임</h1>
        <p className="mt-1.5 text-[15px] text-text-secondary">
          놀면서 크립토를 배우자
        </p>
      </motion.div>

      <div className="mt-8 flex flex-col gap-3">
        {games.map((g) => (
          <motion.div key={g.href} variants={staggerItem}>
            <Link href={g.href} className="block">
              <div
                className="card p-5 flex items-center gap-4 transition-transform active:scale-[0.995]"
              >
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 48,
                    height: 48,
                    background: `${g.color}12`,
                  }}
                >
                  <g.icon size={22} style={{ color: g.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold">{g.title}</span>
                    <ChevronRight size={16} className="text-text-quaternary" />
                  </div>
                  <p className="mt-0.5 text-[13px] text-text-secondary truncate">{g.desc}</p>
                  <p className="mt-1 text-[12px] text-text-tertiary">{g.stat}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div variants={staggerItem} className="mt-8">
        <p className="section-label mb-3">빠른 도전</p>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/daily" className="block">
            <div className="card p-4 text-center transition-transform active:scale-[0.995]">
              <Trophy size={20} className="mx-auto text-accent" />
              <p className="mt-2 text-[13px] font-medium">데일리 퀴즈</p>
              <p className="mt-0.5 text-[12px] text-text-tertiary">
                {dailyDone ? '내일 다시!' : '오늘 도전'}
              </p>
            </div>
          </Link>
          <Link href="/mini/updown" className="block">
            <div className="card p-4 text-center transition-transform active:scale-[0.995]">
              <TrendingUp size={20} className="mx-auto text-warning" />
              <p className="mt-2 text-[13px] font-medium">업다운 게임</p>
              <p className="mt-0.5 text-[12px] text-text-tertiary">바로 시작</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

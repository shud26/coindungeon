'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, Trophy, RotateCcw, Zap } from 'lucide-react';
import { getMarketChart, GAME_COINS } from '@/lib/coinGeckoCache';
import { updateGameScore } from '@/lib/miniGames';
import { loadProgress, saveProgress, getLevel } from '@/lib/progress';

const TOTAL_ROUNDS = 10;
const XP_PER_CORRECT = 5;

type Phase = 'loading' | 'playing' | 'reveal' | 'result';

interface RoundData {
  coinIndex: number;
  // 7 days of prices, we show first 6 and hide last day
  prices: number[];
  // Whether price went up on the last day
  wentUp: boolean;
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  let s = seed;
  const rng = () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function UpDownPage() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [rounds, setRounds] = useState<RoundData[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState<'up' | 'down' | null>(null);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadRounds = useCallback(async () => {
    setPhase('loading');
    setError('');
    try {
      // Pick 10 random coins (with repetition OK across rounds)
      const seed = Math.floor(Date.now() / 1000);
      const shuffled = seededShuffle(
        Array.from({ length: GAME_COINS.length }, (_, i) => i),
        seed,
      );

      const roundsData: RoundData[] = [];

      // Fetch chart data for unique coins
      const uniqueIndices = [...new Set(shuffled.slice(0, TOTAL_ROUNDS))];
      // If less than TOTAL_ROUNDS unique, cycle
      const coinIndices: number[] = [];
      for (let i = 0; i < TOTAL_ROUNDS; i++) {
        coinIndices.push(shuffled[i % shuffled.length]);
      }

      const chartCache = new Map<number, number[]>();

      for (const idx of uniqueIndices) {
        const coin = GAME_COINS[idx];
        const data = await getMarketChart(coin.id, 8);
        // Get daily prices (pick one per day)
        const daily: number[] = [];
        const msPerDay = 86400000;
        let dayStart = data.prices[0]?.[0] ?? 0;
        for (const [ts, price] of data.prices) {
          if (ts >= dayStart) {
            daily.push(price);
            dayStart = ts + msPerDay * 0.8; // skip to next day approx
          }
        }
        // Need at least 8 data points
        if (daily.length >= 8) {
          chartCache.set(idx, daily.slice(0, 8));
        }
      }

      for (const idx of coinIndices) {
        const prices = chartCache.get(idx);
        if (!prices || prices.length < 8) continue;

        // Randomize which 7-day window to use
        const startOffset = roundsData.length % 2; // slight variation
        const sliced = prices.slice(startOffset, startOffset + 7);
        if (sliced.length < 7) continue;

        const showPrices = sliced.slice(0, 6);
        const lastPrice = sliced[6];
        const wentUp = lastPrice >= sliced[5];

        roundsData.push({ coinIndex: idx, prices: showPrices, wentUp });
        if (roundsData.length >= TOTAL_ROUNDS) break;
      }

      if (roundsData.length < 5) {
        setError('데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      setRounds(roundsData);
      setCurrentRound(0);
      setScore(0);
      setGuess(null);
      setPhase('playing');
    } catch {
      setError('API 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  }, []);

  useEffect(() => {
    loadRounds();
  }, [loadRounds]);

  // Draw chart
  useEffect(() => {
    if (phase !== 'playing' && phase !== 'reveal') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const round = rounds[currentRound];
    if (!round) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const pad = { top: 20, right: 20, bottom: 30, left: 20 };

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Prices to show
    const prices = [...round.prices];
    const isRevealing = phase === 'reveal';

    // If revealing, we extrapolate the last point
    const allPrices = isRevealing
      ? [...prices, round.wentUp ? prices[prices.length - 1] * 1.03 : prices[prices.length - 1] * 0.97]
      : prices;

    const minP = Math.min(...allPrices) * 0.998;
    const maxP = Math.max(...allPrices) * 1.002;
    const rangeP = maxP - minP || 1;

    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const toX = (i: number) => pad.left + (i / (allPrices.length - 1)) * chartW;
    const toY = (p: number) => pad.top + chartH - ((p - minP) / rangeP) * chartH;

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const y = pad.top + (chartH / 3) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(W - pad.right, y);
      ctx.stroke();
    }

    // Draw known line
    ctx.beginPath();
    ctx.strokeStyle = '#8B7CFF';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    for (let i = 0; i < prices.length; i++) {
      const x = toX(i);
      const y = toY(prices[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Gradient fill under line
    const grad = ctx.createLinearGradient(0, pad.top, 0, H - pad.bottom);
    grad.addColorStop(0, 'rgba(139,124,255,0.15)');
    grad.addColorStop(1, 'rgba(139,124,255,0)');
    ctx.beginPath();
    for (let i = 0; i < prices.length; i++) {
      const x = toX(i);
      const y = toY(prices[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(toX(prices.length - 1), H - pad.bottom);
    ctx.lineTo(toX(0), H - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Dots
    for (let i = 0; i < prices.length; i++) {
      ctx.beginPath();
      ctx.arc(toX(i), toY(prices[i]), 3, 0, Math.PI * 2);
      ctx.fillStyle = '#8B7CFF';
      ctx.fill();
    }

    // Day labels
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    for (let i = 0; i < prices.length; i++) {
      ctx.fillText(`D${i + 1}`, toX(i), H - pad.bottom + 16);
    }

    // "?" or revealed line
    if (!isRevealing) {
      // Question mark
      const qx = toX(allPrices.length - 1);
      const qy = toY(prices[prices.length - 1]) - 12;
      ctx.fillStyle = 'var(--accent)';
      ctx.font = 'bold 20px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('?', qx, qy);

      // Dashed line from last point
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1.5;
      ctx.moveTo(toX(prices.length - 1), toY(prices[prices.length - 1]));
      ctx.lineTo(qx, toY(prices[prices.length - 1]));
      ctx.stroke();
      ctx.setLineDash([]);

      // D7 label
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '11px system-ui';
      ctx.fillText('D7', qx, H - pad.bottom + 16);
    } else {
      // Draw revealed segment
      const lastKnown = prices.length - 1;
      const revealPrice = allPrices[allPrices.length - 1];
      const color = round.wentUp ? '#34D399' : '#F87171';

      ctx.beginPath();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.moveTo(toX(lastKnown), toY(prices[lastKnown]));
      ctx.lineTo(toX(allPrices.length - 1), toY(revealPrice));
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrow dot
      ctx.beginPath();
      ctx.arc(toX(allPrices.length - 1), toY(revealPrice), 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Label
      ctx.fillStyle = color;
      ctx.font = 'bold 13px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(round.wentUp ? '📈 UP' : '📉 DOWN', toX(allPrices.length - 1), toY(revealPrice) - 12);

      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '11px system-ui';
      ctx.fillText('D7', toX(allPrices.length - 1), H - pad.bottom + 16);
    }
  }, [phase, currentRound, rounds]);

  const handleGuess = (g: 'up' | 'down') => {
    if (phase !== 'playing' || guess !== null) return;
    setGuess(g);
    const round = rounds[currentRound];
    const correct = (g === 'up' && round.wentUp) || (g === 'down' && !round.wentUp);
    if (correct) setScore((s) => s + 1);
    setPhase('reveal');
  };

  const handleNext = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound((c) => c + 1);
      setGuess(null);
      setPhase('playing');
    } else {
      // Finish game
      const finalScore = score;
      updateGameScore('updown', finalScore);

      // Award XP
      const xp = finalScore * XP_PER_CORRECT;
      if (xp > 0) {
        const prog = loadProgress();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const lvl = getLevel(prog.xp + xp);
        saveProgress({
          ...prog,
          xp: prog.xp + xp,
          level: lvl.level,
          lastActiveDate: today,
          streak: prog.lastActiveDate === today
            ? prog.streak
            : prog.lastActiveDate === yesterday
              ? prog.streak + 1
              : 1,
        });
      }

      setPhase('result');
    }
  };

  const round = rounds[currentRound];
  const coin = round ? GAME_COINS[round.coinIndex] : null;
  const isCorrect = round && guess
    ? (guess === 'up' && round.wentUp) || (guess === 'down' && !round.wentUp)
    : false;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Link href="/mini" className="text-text-tertiary">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-[22px] font-bold">코인 업다운</h1>
      </div>

      {error && (
        <div className="card p-6 text-center">
          <p className="text-[14px] text-text-secondary mb-4">{error}</p>
          <button
            onClick={loadRounds}
            className="rounded-xl px-6 py-2.5 text-[14px] font-semibold text-white"
            style={{ background: 'var(--accent)' }}
          >
            다시 시도
          </button>
        </div>
      )}

      {phase === 'loading' && !error && (
        <div className="card p-8 text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-[14px] text-text-secondary">차트 데이터 불러오는 중...</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {(phase === 'playing' || phase === 'reveal') && round && coin && (
          <motion.div
            key={`round-${currentRound}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
          >
            {/* Round info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-text-secondary">
                  라운드 {currentRound + 1}/{rounds.length}
                </span>
                <span className="text-[13px] font-medium text-accent">{score}점</span>
              </div>
              <span className="text-[14px] font-semibold">
                {coin.symbol} {coin.name}
              </span>
            </div>

            {/* Chart */}
            <div className="card p-3">
              <canvas
                ref={canvasRef}
                className="w-full"
                style={{ height: 200, display: 'block' }}
              />
            </div>

            {/* Question or Result */}
            {phase === 'playing' && (
              <div className="mt-5">
                <p className="text-[15px] text-center font-medium mb-4">
                  7일째 가격은 올랐을까, 내렸을까?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleGuess('up')}
                    className="card p-4 flex flex-col items-center gap-2 transition-transform active:scale-[0.97]"
                    style={{ boxShadow: '0 0 0 1px rgba(52,211,153,0.2)' }}
                  >
                    <TrendingUp size={28} className="text-success" />
                    <span className="text-[15px] font-semibold text-success">UP</span>
                  </button>
                  <button
                    onClick={() => handleGuess('down')}
                    className="card p-4 flex flex-col items-center gap-2 transition-transform active:scale-[0.97]"
                    style={{ boxShadow: '0 0 0 1px rgba(248,113,113,0.2)' }}
                  >
                    <TrendingDown size={28} className="text-danger" />
                    <span className="text-[15px] font-semibold text-danger">DOWN</span>
                  </button>
                </div>
              </div>
            )}

            {phase === 'reveal' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5"
              >
                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: isCorrect ? 'var(--success-dim)' : 'var(--danger-dim)',
                  }}
                >
                  <p className="text-[16px] font-bold" style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)' }}>
                    {isCorrect ? '정답! 🎉' : '오답 😅'}
                  </p>
                  <p className="mt-1 text-[13px] text-text-secondary">
                    {coin.symbol}은 {round.wentUp ? '올랐어요 📈' : '내렸어요 📉'}
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="mt-4 w-full rounded-xl py-3 text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
                  style={{ background: 'var(--accent)' }}
                >
                  {currentRound < rounds.length - 1 ? '다음 라운드' : '결과 보기'}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="card-elevated p-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                className="text-[48px] mb-3"
              >
                {score >= 8 ? '🏆' : score >= 5 ? '🎉' : '💪'}
              </motion.div>

              <h2 className="text-[22px] font-bold">
                {score >= 8 ? '차트 고수!' : score >= 5 ? '좋은 감각!' : '연습이 실력이야!'}
              </h2>

              <p className="mt-3 text-[28px] font-bold">
                {score} / {rounds.length}
              </p>

              <div className="mt-3 flex justify-center gap-1">
                {rounds.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: 8,
                      height: 8,
                      background: i < score ? 'var(--success)' : 'var(--bg-elevated)',
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5" style={{ background: 'var(--accent-dim)' }}>
                <Zap size={14} className="text-accent" />
                <span className="text-[14px] font-semibold text-accent">+{score * XP_PER_CORRECT} XP</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={loadRounds}
                  className="card p-3 flex flex-col items-center gap-1.5 transition-transform active:scale-[0.97]"
                >
                  <RotateCcw size={18} className="text-text-secondary" />
                  <span className="text-[13px] font-medium">다시 하기</span>
                </button>
                <Link href="/play" className="block">
                  <div className="card p-3 flex flex-col items-center gap-1.5 transition-transform active:scale-[0.97]">
                    <Trophy size={18} className="text-accent" />
                    <span className="text-[13px] font-medium">게임 허브</span>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

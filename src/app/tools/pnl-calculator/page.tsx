'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PnlCalculatorPage() {
  const [entryPrice, setEntryPrice] = useState(50000);
  const [exitPrice, setExitPrice] = useState(55000);
  const [positionSize, setPositionSize] = useState(1000);
  const [leverage, setLeverage] = useState(2);
  const [isLong, setIsLong] = useState(true);

  const priceDiff = isLong ? exitPrice - entryPrice : entryPrice - exitPrice;
  const pnlPct = (priceDiff / entryPrice) * 100;
  const leveragedPnlPct = pnlPct * leverage;
  const pnlAmount = positionSize * (leveragedPnlPct / 100);
  const roi = (pnlAmount / (positionSize / leverage)) * 100;
  const liquidationPct = 100 / leverage;
  const liquidationPrice = isLong
    ? entryPrice * (1 - liquidationPct / 100)
    : entryPrice * (1 + liquidationPct / 100);

  const inputClass = "mt-2 w-full rounded-xl border border-white/[0.06] bg-bg-surface px-4 py-3 text-[15px] font-medium outline-none transition-colors focus:border-[#8B7CFF]/50 focus:ring-2 focus:ring-[#8B7CFF]/20";

  return (
    <div>
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-quaternary transition-colors hover:text-text-secondary">
        <ArrowLeft size={15} /> 도구
      </Link>

      <div className="mt-6">
        <h1 className="text-[24px] font-extrabold leading-tight tracking-tight">PnL 계산기</h1>
        <p className="mt-2 text-[14px] text-text-tertiary">진입가와 청산가로 손익과 수익률을 계산합니다.</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">방향</label>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setIsLong(true)}
              className={`flex-1 rounded-xl py-3 text-[14px] font-bold transition-all ${isLong ? 'bg-emerald-500 text-white' : 'bg-bg-subtle text-text-quaternary'}`}
            >
              롱 (매수)
            </button>
            <button
              onClick={() => setIsLong(false)}
              className={`flex-1 rounded-xl py-3 text-[14px] font-bold transition-all ${!isLong ? 'bg-red-500 text-white' : 'bg-bg-subtle text-text-quaternary'}`}
            >
              숏 (매도)
            </button>
          </div>
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">진입가 ($)</label>
          <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">청산가 ($)</label>
          <input type="number" value={exitPrice} onChange={(e) => setExitPrice(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">포지션 크기 ($)</label>
          <input type="number" value={positionSize} onChange={(e) => setPositionSize(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">레버리지 (x)</label>
          <input type="number" value={leverage} onChange={(e) => setLeverage(Number(e.target.value))} className={inputClass} />
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 rounded-2xl bg-accent-dim p-5">
        <h2 className="text-[15px] font-bold text-accent">손익 결과</h2>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">가격 변동</span>
            <span className={`font-bold ${pnlPct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">레버리지 적용 수익률</span>
            <span className={`font-bold ${leveragedPnlPct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {leveragedPnlPct >= 0 ? '+' : ''}{leveragedPnlPct.toFixed(2)}%
            </span>
          </div>
          <div className="border-t border-white/[0.06] pt-3 flex justify-between text-[15px]">
            <span className="font-bold text-accent">손익 금액</span>
            <span className={`font-extrabold ${pnlAmount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {pnlAmount >= 0 ? '+' : ''}${pnlAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">마진 대비 ROI</span>
            <span className={`font-bold ${roi >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {roi >= 0 ? '+' : ''}{roi.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">예상 청산가</span>
            <span className="font-bold text-amber-600">
              ${liquidationPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[12px] text-text-quaternary text-center">
        * 수수료, 펀딩비, 슬리피지는 포함되지 않습니다.
      </p>
    </div>
  );
}

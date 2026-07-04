'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Period = 'daily' | 'weekly' | 'monthly';

export default function CompoundCalculatorPage() {
  const [initial, setInitial] = useState(1000);
  const [rate, setRate] = useState(1);
  const [period, setPeriod] = useState<Period>('daily');
  const [duration, setDuration] = useState(30);

  const periodsMap: Record<Period, { label: string; perYear: number }> = {
    daily: { label: '일', perYear: 365 },
    weekly: { label: '주', perYear: 52 },
    monthly: { label: '월', perYear: 12 },
  };

  const totalPeriods = duration;
  const finalAmount = initial * Math.pow(1 + rate / 100, totalPeriods);
  const totalProfit = finalAmount - initial;
  const totalReturnPct = (totalProfit / initial) * 100;
  const simpleProfit = initial * (rate / 100) * totalPeriods;
  const compoundBonus = totalProfit - simpleProfit;

  const annualizedPeriods = periodsMap[period].perYear;
  const annualizedReturn = (Math.pow(1 + rate / 100, annualizedPeriods) - 1) * 100;

  const inputClass = "mt-2 w-full rounded-xl border border-white/[0.06] bg-bg-surface px-4 py-3 text-[15px] font-medium outline-none transition-colors focus:border-[#3DDC97]/50 focus:ring-2 focus:ring-[#3DDC97]/20";

  return (
    <div>
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-quaternary transition-colors hover:text-text-secondary">
        <ArrowLeft size={15} /> 도구
      </Link>

      <div className="mt-6">
        <h1 className="text-[24px] font-extrabold leading-tight tracking-tight">복리 수익률 계산기</h1>
        <p className="mt-2 text-[14px] text-text-tertiary">일/주/월 수익률의 복리 효과로 자산 성장을 시뮬레이션합니다.</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">초기 자본 ($)</label>
          <input type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">수익률 주기</label>
          <div className="mt-2 flex gap-2">
            {(['daily', 'weekly', 'monthly'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 rounded-xl py-3 text-[14px] font-bold transition-all ${period === p ? 'bg-accent text-white' : 'bg-bg-subtle text-text-quaternary'}`}
              >
                {periodsMap[p].label}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">{periodsMap[period].label} 수익률 (%)</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">기간 ({periodsMap[period].label})</label>
          <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className={inputClass} />
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 rounded-2xl bg-accent-dim p-5">
        <h2 className="text-[15px] font-bold text-accent">복리 시뮬레이션</h2>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">최종 자산</span>
            <span className="font-extrabold text-accent">${finalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">총 수익</span>
            <span className={`font-bold ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">총 수익률</span>
            <span className={`font-bold ${totalReturnPct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {totalReturnPct >= 0 ? '+' : ''}{totalReturnPct.toFixed(1)}%
            </span>
          </div>
          <div className="border-t border-white/[0.06] pt-3 flex justify-between text-[14px]">
            <span className="text-text-tertiary">단리 수익</span>
            <span className="font-medium">${simpleProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">복리 효과 (보너스)</span>
            <span className="font-bold text-purple-600">+${compoundBonus.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="border-t border-white/[0.06] pt-3 flex justify-between text-[14px]">
            <span className="font-bold text-accent">연환산 수익률</span>
            <span className={`font-extrabold ${annualizedReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {annualizedReturn.toLocaleString(undefined, { maximumFractionDigits: 1 })}%
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[12px] text-text-quaternary text-center">
        * 실제 수익률은 시장 상황에 따라 달라지며, 복리 수익은 꾸준한 수익률을 전제합니다.
      </p>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FundingCalculatorPage() {
  const [capital, setCapital] = useState(1000);
  const [spreadHourly, setSpreadHourly] = useState(0.02);
  const [holdHours, setHoldHours] = useState(24);
  const [roundTripFee, setRoundTripFee] = useState(0.16);

  const grossReturn = capital * (spreadHourly / 100) * holdHours;
  const fees = capital * (roundTripFee / 100);
  const netReturn = grossReturn - fees;
  const netPct = (netReturn / capital) * 100;
  const annualized = netPct * (365 * 24 / holdHours);

  const inputClass = "mt-2 w-full rounded-xl border border-white/[0.06] bg-bg-surface px-4 py-3 text-[15px] font-medium outline-none transition-colors focus:border-[#8B7CFF]/50 focus:ring-2 focus:ring-[#8B7CFF]/20";

  return (
    <div>
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-quaternary transition-colors hover:text-text-secondary">
        <ArrowLeft size={15} /> 도구
      </Link>

      <div className="mt-6">
        <h1 className="text-[24px] font-extrabold leading-tight tracking-tight">펀딩비 수익 계산기</h1>
        <p className="mt-2 text-[14px] text-text-tertiary">두 거래소 간 펀딩비 스프레드로 예상 수익을 계산합니다.</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">투입 자본 ($)</label>
          <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">시간당 스프레드 (%)</label>
          <input type="number" step="0.001" value={spreadHourly} onChange={(e) => setSpreadHourly(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">예상 보유 시간</label>
          <input type="number" value={holdHours} onChange={(e) => setHoldHours(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">왕복 수수료 (%)</label>
          <input type="number" step="0.01" value={roundTripFee} onChange={(e) => setRoundTripFee(Number(e.target.value))} className={inputClass} />
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 rounded-2xl bg-accent-dim p-5">
        <h2 className="text-[15px] font-bold text-accent">예상 결과</h2>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">총 펀딩비 수익</span>
            <span className="font-bold">${grossReturn.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">수수료</span>
            <span className="font-bold text-red-400">-${fees.toFixed(2)}</span>
          </div>
          <div className="border-t border-white/[0.06] pt-3 flex justify-between text-[15px]">
            <span className="font-bold text-accent">순 수익</span>
            <span className={`font-extrabold ${netReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              ${netReturn.toFixed(2)} ({netPct.toFixed(3)}%)
            </span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-tertiary">연환산 수익률</span>
            <span className={`font-bold ${annualized >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {annualized.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[12px] text-text-quaternary text-center">
        * 이 계산기는 참고용입니다. 실제 수익은 시장 상황에 따라 달라집니다.
      </p>
    </div>
  );
}

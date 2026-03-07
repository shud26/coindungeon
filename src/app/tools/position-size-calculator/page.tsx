'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PositionSizeCalculatorPage() {
  const [capital, setCapital] = useState(1000);
  const [riskPct, setRiskPct] = useState(2);
  const [stopLossPct, setStopLossPct] = useState(3);
  const [leverage, setLeverage] = useState(2);

  const riskAmount = capital * (riskPct / 100);
  const positionSize = riskAmount / (stopLossPct / 100);
  const margin = positionSize / leverage;
  const capitalUsagePct = (margin / capital) * 100;

  const inputClass = "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] font-medium outline-none transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100";

  return (
    <div>
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-quaternary transition-colors hover:text-text-secondary">
        <ArrowLeft size={15} /> 도구
      </Link>

      <div className="mt-6">
        <h1 className="text-[24px] font-extrabold leading-tight tracking-tight">포지션 사이징 계산기</h1>
        <p className="mt-2 text-[14px] text-text-tertiary">자본금과 리스크 허용도에 따른 적정 포지션 크기를 계산합니다.</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">총 자본 ($)</label>
          <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">리스크 허용 (%)</label>
          <input type="number" step="0.5" value={riskPct} onChange={(e) => setRiskPct(Number(e.target.value))} className={inputClass} />
          <p className="mt-1.5 text-[12px] text-text-quaternary">한 번 트레이드에서 감수할 최대 손실 비율</p>
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">손절 거리 (%)</label>
          <input type="number" step="0.5" value={stopLossPct} onChange={(e) => setStopLossPct(Number(e.target.value))} className={inputClass} />
          <p className="mt-1.5 text-[12px] text-text-quaternary">진입가 대비 손절 설정 거리</p>
        </div>

        <div className="card p-5">
          <label className="block text-[13px] font-semibold text-text-secondary">레버리지 (x)</label>
          <input type="number" value={leverage} onChange={(e) => setLeverage(Number(e.target.value))} className={inputClass} />
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-5">
        <h2 className="text-[15px] font-bold text-indigo-700">적정 포지션</h2>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-[14px]">
            <span className="text-indigo-500/70">최대 손실 금액</span>
            <span className="font-bold text-red-500">${riskAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-indigo-500/70">적정 포지션 크기</span>
            <span className="font-extrabold text-indigo-600">${positionSize.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-indigo-500/70">필요 마진</span>
            <span className="font-bold">${margin.toFixed(2)}</span>
          </div>
          <div className="border-t border-indigo-200/50 pt-3 flex justify-between text-[14px]">
            <span className="font-bold text-indigo-700">자본 사용률</span>
            <span className={`font-extrabold ${capitalUsagePct > 50 ? 'text-red-500' : capitalUsagePct > 30 ? 'text-amber-500' : 'text-emerald-600'}`}>
              {capitalUsagePct.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {capitalUsagePct > 50 && (
        <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-[13px] font-medium text-amber-700">
          자본 사용률이 50%를 초과합니다. 레버리지를 낮추거나 리스크를 줄이는 것을 권장합니다.
        </div>
      )}

      <p className="mt-4 text-[12px] text-text-quaternary text-center">
        * 이 계산기는 참고용입니다. 실전에서는 수수료와 슬리피지도 고려하세요.
      </p>
    </div>
  );
}

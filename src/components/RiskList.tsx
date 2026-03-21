import { AlertTriangle } from 'lucide-react';

export default function RiskList({ risks }: { risks: string[] }) {
  return (
    <div className="rounded-2xl bg-red-500/10 p-5">
      <div className="flex items-center gap-2">
        <AlertTriangle size={16} className="text-red-400" />
        <h3 className="text-[14px] font-bold text-red-400">리스크</h3>
      </div>
      <ul className="mt-3 space-y-2">
        {risks.map((risk, i) => (
          <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-red-300/80">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/50" />
            {risk}
          </li>
        ))}
      </ul>
    </div>
  );
}

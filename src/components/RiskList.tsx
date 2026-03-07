import { AlertTriangle } from 'lucide-react';

export default function RiskList({ risks }: { risks: string[] }) {
  return (
    <div className="card p-5" style={{ borderLeft: '2px solid var(--color-danger)' }}>
      <div className="flex items-center gap-2">
        <AlertTriangle size={15} className="text-danger" />
        <h3 className="text-[14px] font-semibold text-danger">리스크</h3>
      </div>
      <ul className="mt-3 space-y-2">
        {risks.map((risk, i) => (
          <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-text-secondary">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-quaternary" />
            {risk}
          </li>
        ))}
      </ul>
    </div>
  );
}

import Link from 'next/link';
import { Calculator, Scale } from 'lucide-react';
import { calculatorTools } from '@/data/tools';

const iconMap: Record<string, typeof Calculator> = { Calculator, Scale };

export default function ToolsPage() {
  return (
    <div>
      <div>
        <h1 className="text-[28px] font-bold tracking-tight">도구</h1>
        <p className="mt-1.5 text-[15px] text-text-secondary">트레이딩에 필요한 계산기</p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {calculatorTools.map((tool) => {
          const Icon = iconMap[tool.icon] ?? Calculator;
          return (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-5 transition-all active:scale-[0.995]">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-dim">
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold">{tool.title}</p>
                  <p className="mt-1 text-[13px] text-text-tertiary">{tool.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

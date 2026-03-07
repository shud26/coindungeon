import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { calculatorTools } from '@/data/tools';

const emojiMap: Record<string, string> = {
  'funding-calculator': '💰',
  'position-size-calculator': '📐',
};

export default function ToolsPage() {
  return (
    <div>
      <div>
        <h1 className="text-[28px] font-extrabold tracking-tight">도구</h1>
        <p className="mt-2 text-[15px] text-text-secondary">트레이딩에 필요한 계산기</p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {calculatorTools.map((tool) => {
          const emoji = emojiMap[tool.slug] ?? '🔧';
          return (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-5 group">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-[22px]">
                  {emoji}
                </div>
                <div className="flex-1">
                  <p className="text-[16px] font-bold">{tool.title}</p>
                  <p className="mt-1 text-[13px] text-text-tertiary">{tool.description}</p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-text-quaternary opacity-40 group-hover:opacity-70 transition-opacity" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

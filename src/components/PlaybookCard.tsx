import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';
import type { Playbook } from '@/data/playbooks';

const difficultyLabel: Record<string, string> = {
  beginner: '입문',
  intermediate: '중급',
  advanced: '고급',
};

const difficultyStyle: Record<string, string> = {
  beginner: 'bg-emerald-500/10 text-emerald-400',
  intermediate: 'bg-amber-500/10 text-amber-400',
  advanced: 'bg-red-500/10 text-red-400',
};

const emojiMap: Record<string, string> = {
  'crypto-intro': '🚀',
  'wallet-guide': '👛',
  'exchange-comparison': '🏦',
};

export default function PlaybookCard({ playbook }: { playbook: Playbook }) {
  const emoji = emojiMap[playbook.slug] ?? '📖';

  return (
    <Link href={`/playbook/${playbook.slug}`} className="block card p-5 group">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-[22px]">
          {emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-bold">{playbook.title}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className={`rounded-lg px-2 py-0.5 text-[11px] font-semibold ${difficultyStyle[playbook.difficulty]}`}>
              {difficultyLabel[playbook.difficulty]}
            </span>
            <span className="flex items-center gap-1 text-[12px] text-text-quaternary">
              <Clock size={11} />{playbook.estimatedMinutes}분
            </span>
          </div>
        </div>
        <ChevronRight size={18} className="mt-2 shrink-0 text-text-quaternary opacity-40 group-hover:opacity-70 transition-opacity" />
      </div>
      <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-text-secondary">{playbook.description}</p>
    </Link>
  );
}

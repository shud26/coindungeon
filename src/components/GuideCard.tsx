import Link from 'next/link';
import { Rocket, Wallet, ArrowLeftRight } from 'lucide-react';
import type { Guide } from '@/data/guides';

const iconMap: Record<string, typeof Rocket> = { Rocket, Wallet, ArrowLeftRight };

const difficultyLabel: Record<string, string> = {
  beginner: '입문',
  intermediate: '중급',
  advanced: '고급',
};

const difficultyColor: Record<string, string> = {
  beginner: 'bg-success-dim text-success',
  intermediate: 'bg-warning-dim text-warning',
  advanced: 'bg-danger-dim text-danger',
};

export default function GuideCard({ guide }: { guide: Guide }) {
  const Icon = iconMap[guide.icon] ?? Rocket;

  return (
    <Link href={`/guide/${guide.slug}`} className="block card p-5 transition-all active:scale-[0.99]">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-dim">
          <Icon size={20} className="text-accent" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold">{guide.title}</p>
          <div className="mt-1.5 flex items-center gap-2.5">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColor[guide.difficulty]}`}>
              {difficultyLabel[guide.difficulty]}
            </span>
            <span className="text-xs text-text-quaternary">{guide.estimatedMinutes}분</span>
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-tertiary">{guide.description}</p>
    </Link>
  );
}

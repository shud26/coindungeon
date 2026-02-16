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
  beginner: 'text-success',
  intermediate: 'text-warning',
  advanced: 'text-danger',
};

export default function GuideCard({ guide }: { guide: Guide }) {
  const Icon = iconMap[guide.icon] ?? Rocket;

  return (
    <Link href={`/guide/${guide.slug}`} className="block card p-5 transition-all active:scale-[0.995]">
      <div className="flex items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-dim">
          <Icon size={18} className="text-accent" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold">{guide.title}</p>
          <div className="mt-1.5 flex items-center gap-2.5 text-[12px]">
            <span className={`font-medium ${difficultyColor[guide.difficulty]}`}>
              {difficultyLabel[guide.difficulty]}
            </span>
            <span className="text-text-quaternary">{guide.estimatedMinutes}분</span>
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-text-tertiary">{guide.description}</p>
    </Link>
  );
}

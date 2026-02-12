import { guides } from '@/data/guides';
import GuideCard from '@/components/GuideCard';

export default function GuidePage() {
  return (
    <div className="ambient-glow stagger">
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-widest text-text-quaternary">Guide</p>
        <h1 className="mt-2 text-3xl font-bold">가이드</h1>
        <p className="mt-1 text-sm text-text-tertiary">크립토 입문부터 실전까지</p>
      </div>

      <div className="relative z-10 mt-6 flex flex-col gap-4">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>

      <p className="relative z-10 mt-6 text-center text-xs text-text-quaternary">
        더 많은 가이드 준비 중...
      </p>
    </div>
  );
}

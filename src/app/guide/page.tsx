import { guides } from '@/data/guides';
import GuideCard from '@/components/GuideCard';

export default function GuidePage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">가이드</h1>
        <p className="mt-2 text-sm text-text-tertiary">크립토 입문부터 실전까지</p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-text-quaternary">
        더 많은 가이드 준비 중...
      </p>
    </div>
  );
}

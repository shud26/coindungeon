import { playbooks } from '@/data/playbooks';
import PlaybookCard from '@/components/PlaybookCard';

export default function PlaybookPage() {
  return (
    <div>
      <div>
        <h1 className="text-[28px] font-bold tracking-tight">플레이북</h1>
        <p className="mt-1.5 text-[15px] text-text-secondary">크립토 입문부터 실전까지</p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {playbooks.map((pb) => (
          <PlaybookCard key={pb.slug} playbook={pb} />
        ))}
      </div>

      <p className="mt-8 text-center text-[13px] text-text-quaternary">
        더 많은 플레이북 준비 중...
      </p>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = 'https://coindungeon.games';

export const metadata: Metadata = {
  title: '코인던전 소개',
  description: '코인던전은 실전 크립토 수익 전략을 배우고 실행하는 플랫폼입니다.',
  alternates: { canonical: `${BASE_URL}/about` },
};

const features = [
  { title: '실전 전략', desc: '펀딩비 차익거래, 에어드랍 파밍 등 검증된 수익 전략을 단계별로 배워.' },
  { title: '계산기', desc: '펀딩비 수익, 포지션 사이징 등 실전 도구로 바로 계산해봐.' },
  { title: 'XP & 레벨', desc: '전략을 학습하면 XP를 얻고 레벨업. 관찰자에서 마스터까지.' },
  { title: '플레이북', desc: '크립토 입문부터 보안, DeFi까지 실전 가이드.' },
];

export default function AboutPage() {
  return (
    <div>
      <div>
        <h1 className="text-[28px] font-bold tracking-tight">코인던전 소개</h1>
      </div>

      {/* Mission */}
      <div className="mt-8 card-accent p-6">
        <h2 className="text-lg font-bold">읽기만 하지 말고, 실행하자</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
          크립토로 수익을 내고 싶은데 어디서 시작할지 모르겠다면.
          코인던전은 실전 검증된 전략을 단계별로 알려주고, 바로 실행할 수 있는 도구를 제공해.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
          유튜브 100개 보는 것보다, 전략 하나를 제대로 실행하는 게 낫다고 믿어.
        </p>
      </div>

      {/* Features */}
      <div className="mt-8">
        <p className="mb-3 section-label">Features</p>
        <div className="space-y-2.5">
          {features.map(f => (
            <div key={f.title} className="card p-4">
              <p className="text-[15px] font-semibold">{f.title}</p>
              <p className="mt-1 text-sm text-text-tertiary">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8">
        <p className="mb-3 section-label">How It Works</p>
        <div className="card p-5">
          <ol className="space-y-3.5 text-sm text-text-secondary">
            {[
              '전략을 선택하고, 단계별 레시피를 따라가',
              '각 단계의 개념과 실행 방법을 학습해',
              '계산기로 예상 수익과 리스크를 확인해',
              '학습 완료하고 XP를 획득해',
            ].map((text, i) => (
              <li key={i} className="flex gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-dim text-sm font-bold text-accent">{i + 1}</span>
                <span className="pt-0.5">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Who is this for */}
      <div className="mt-8">
        <p className="mb-3 section-label">Who Is This For</p>
        <div className="card p-5 text-sm text-text-secondary">
          <ul className="space-y-2">
            <li>&#x2022; 크립토로 수익을 내고 싶은데 방법을 모르는 사람</li>
            <li>&#x2022; 차익거래, 에어드랍 파밍 등을 체계적으로 배우고 싶은 사람</li>
            <li>&#x2022; 이론보다 실전 실행에 집중하고 싶은 사람</li>
            <li>&#x2022; 리스크 관리를 제대로 배우고 싶은 사람</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/strategies"
        className="mt-8 flex items-center justify-center rounded-xl bg-accent py-3.5 text-sm font-semibold text-white"
      >
        전략 둘러보기
      </Link>

      {/* Tech */}
      <div className="mt-8 text-center text-[12px] text-text-quaternary">
        <p>Next.js + TypeScript + Tailwind CSS</p>
        <p className="mt-1">100% 무료 &middot; 로그인 불필요 &middot; 오프라인 저장</p>
      </div>
    </div>
  );
}

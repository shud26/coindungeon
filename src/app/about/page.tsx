import type { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = 'https://coindungeon.vercel.app';

export const metadata: Metadata = {
  title: '코인던전 소개',
  description: '코인던전은 매일 한 층씩 깨며 크립토를 배우는 실전 퀘스트 플랫폼입니다.',
  alternates: { canonical: `${BASE_URL}/about` },
};

const features = [
  { title: '던전 시스템', desc: '1층부터 시작해서 한 층씩 올라가는 구조. 이전 퀘스트를 클리어해야 다음 층이 열려.' },
  { title: 'XP & 레벨', desc: '퀘스트를 깨면 XP를 얻고, 레벨이 올라가. 크린이에서 던전 클리어까지 10단계.' },
  { title: '스트릭', desc: '매일 접속하면 스트릭이 쌓여. 꾸준한 학습 습관을 만들어줘.' },
  { title: '퀴즈', desc: '배운 내용을 퀴즈로 확인. 진짜 이해했는지 스스로 체크할 수 있어.' },
];

export default function AboutPage() {
  return (
    <div>
      <div>
        <h1 className="text-[28px] font-bold tracking-tight">코인던전 소개</h1>
      </div>

      {/* Mission */}
      <div className="mt-8 card-accent p-6">
        <h2 className="text-lg font-bold">읽기만 하지 말고, 직접 해보자</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
          코인 3년 했는데 메타마스크도 안 써본 사람. 디파이가 뭔지 설명은 들었는데 직접 해본 적 없는 사람.
          코인던전은 그런 사람들을 위해 만들었어.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
          블로그 글 100개 읽는 것보다, 한 번 직접 해보는 게 낫다고 믿어.
          그래서 코인던전은 &quot;읽기&quot;가 아니라 &quot;실행&quot;에 집중해.
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
              '퀘스트를 선택하고, 단계별 가이드를 따라가',
              '각 단계를 완료하면 다음 단계로 넘어가',
              '퀴즈로 배운 내용을 확인하고, XP를 획득해',
              '레벨업하고, 다음 층의 퀘스트를 해금해',
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
            <li>&#x2022; 코인이 뭔지 하나도 모르는 완전 초보</li>
            <li>&#x2022; 업비트에서 코인만 사봤는데 지갑은 써본 적 없는 사람</li>
            <li>&#x2022; DeFi, NFT, 에어드랍 같은 거 해보고 싶은데 어디서 시작할지 모르는 사람</li>
            <li>&#x2022; 매일 조금씩 꾸준히 배우고 싶은 사람</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/dungeon"
        className="mt-8 flex items-center justify-center rounded-xl bg-accent py-3.5 text-sm font-semibold text-white"
      >
        던전 입장하기
      </Link>

      {/* Tech */}
      <div className="mt-8 text-center text-[12px] text-text-quaternary">
        <p>Next.js + TypeScript + Tailwind CSS</p>
        <p className="mt-1">100% 무료 &middot; 로그인 불필요 &middot; 오프라인 저장</p>
      </div>
    </div>
  );
}

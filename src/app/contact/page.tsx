import type { Metadata } from 'next';

const BASE_URL = 'https://coindungeon.games';

export const metadata: Metadata = {
  title: '문의하기',
  description: '코인던전에 대한 문의, 제안, 피드백을 보내주세요.',
  alternates: { canonical: `${BASE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">문의하기</h1>
      </div>

      <div className="mt-8 card-accent p-6">
        <p className="text-[15px] text-text-secondary">
          코인던전에 대한 문의, 제안, 피드백이 있으면 언제든 연락해 주세요.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="mt-5 space-y-2.5">
        <a
          href="mailto:yhun2345@gmail.com"
          className="card flex items-center gap-3.5 p-4 transition-colors hover:border-border-hover"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-dim text-lg">✉️</span>
          <div>
            <p className="text-[15px] font-semibold">이메일</p>
            <p className="mt-0.5 text-sm text-text-tertiary">yhun2345@gmail.com</p>
          </div>
        </a>

        <a
          href="https://github.com/shud26/coindungeon"
          target="_blank"
          rel="noopener noreferrer"
          className="card flex items-center gap-3.5 p-4 transition-colors hover:border-border-hover"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-dim text-lg">🐙</span>
          <div>
            <p className="text-[15px] font-semibold">GitHub</p>
            <p className="mt-0.5 text-sm text-text-tertiary">버그 리포트 & 기능 제안</p>
          </div>
        </a>
      </div>

      {/* FAQ */}
      <div className="mt-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-quaternary">FAQ</p>
        <div className="space-y-2.5">
          {[
            { q: '코인던전은 무료인가요?', a: '네, 완전 무료입니다. 회원가입도 필요 없어요.' },
            { q: '진행도가 초기화됐어요', a: '브라우저 데이터를 삭제하면 진행도가 초기화됩니다. 현재는 브라우저(localStorage)에 저장되기 때문이에요.' },
            { q: '새로운 퀘스트는 언제 추가되나요?', a: '매주 새로운 퀘스트를 추가하고 있어요. 현재 DeFi, NFT, DAO 관련 퀘스트를 준비 중입니다.' },
            { q: '투자 조언을 받을 수 있나요?', a: '코인던전은 교육 목적 서비스로, 투자 조언을 제공하지 않습니다. 모든 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.' },
            { q: '제휴/광고 문의', a: '거래소, 프로젝트, 교육 관련 제휴 문의는 이메일로 보내주세요.' },
          ].map(item => (
            <div key={item.q} className="card p-4">
              <p className="text-[15px] font-semibold">{item.q}</p>
              <p className="mt-1.5 text-sm text-text-tertiary">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

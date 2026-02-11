import type { Metadata } from 'next';

const BASE_URL = 'https://coindungeon.vercel.app';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '코인던전의 개인정보처리방침입니다.',
  alternates: { canonical: `${BASE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="ambient-glow stagger">
      <div className="relative z-10">
        <p className="text-[11px] font-medium uppercase tracking-widest text-text-quaternary">Privacy Policy</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight">개인정보처리방침</h1>
        <p className="mt-1 text-xs text-text-quaternary">최종 수정: 2026년 2월 13일</p>
      </div>

      <div className="relative z-10 mt-6 space-y-6 text-sm leading-relaxed text-text-secondary">
        <section>
          <h2 className="mb-2 text-base font-semibold text-text-primary">1. 수집하는 정보</h2>
          <p>코인던전은 현재 별도의 회원가입 없이 이용할 수 있으며, 개인정보를 직접 수집하지 않습니다. 퀘스트 진행도, XP, 레벨 등의 데이터는 사용자의 브라우저(localStorage)에만 저장됩니다.</p>
          <p className="mt-2">다만, 다음과 같은 정보가 서비스 운영 과정에서 자동으로 수집될 수 있습니다:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-text-tertiary">
            <li>IP 주소, 브라우저 유형, 운영체제</li>
            <li>방문 페이지, 체류 시간, 접속 경로</li>
            <li>쿠키 및 유사 기술을 통한 정보</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-text-primary">2. 쿠키 및 광고</h2>
          <p>코인던전은 서비스 개선 및 운영비 충당을 위해 제3자 광고 서비스를 이용할 수 있습니다. 이러한 서비스는 쿠키를 사용하여 사용자의 관심사에 기반한 광고를 표시할 수 있습니다.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-text-tertiary">
            <li><strong className="text-text-secondary">Google AdSense</strong>: Google의 광고 쿠키를 사용합니다. <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google 광고 정책</a></li>
            <li><strong className="text-text-secondary">AADS</strong>: 크립토 광고 네트워크를 사용할 수 있습니다.</li>
          </ul>
          <p className="mt-2">브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 기능이 제한될 수 있습니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-text-primary">3. 분석 도구</h2>
          <p>코인던전은 서비스 이용 현황을 파악하기 위해 다음 분석 도구를 사용할 수 있습니다:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-text-tertiary">
            <li>Google Analytics 4</li>
            <li>Vercel Analytics</li>
          </ul>
          <p className="mt-2">이러한 도구는 익명화된 통계 데이터를 수집하며, 개인을 식별하지 않습니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-text-primary">4. 제3자 링크</h2>
          <p>코인던전의 퀘스트에는 거래소, 지갑 등 외부 서비스로의 링크가 포함될 수 있습니다. 이러한 외부 사이트의 개인정보 처리에 대해서는 해당 서비스의 개인정보처리방침을 확인해 주세요. 일부 링크는 제휴 링크일 수 있으며, 이를 통해 코인던전이 소정의 수수료를 받을 수 있습니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-text-primary">5. 데이터 저장 및 삭제</h2>
          <p>모든 퀘스트 진행 데이터는 사용자의 브라우저 localStorage에 저장됩니다. 브라우저의 사이트 데이터를 삭제하거나, 프로필 페이지의 &quot;진행도 초기화&quot; 버튼을 통해 언제든 삭제할 수 있습니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-text-primary">6. 면책조항</h2>
          <p>코인던전은 교육 목적의 서비스이며, 투자 조언을 제공하지 않습니다. 암호화폐 투자는 높은 위험을 수반하며, 모든 투자 결정은 사용자 본인의 책임입니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-text-primary">7. 변경 사항</h2>
          <p>본 개인정보처리방침은 서비스 변경에 따라 수정될 수 있으며, 변경 시 이 페이지를 통해 공지합니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-text-primary">8. 문의</h2>
          <p>개인정보 관련 문의는 <a href="/contact" className="text-accent hover:underline">문의 페이지</a>를 이용해 주세요.</p>
        </section>
      </div>
    </div>
  );
}

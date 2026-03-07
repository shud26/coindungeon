export type StrategyCategory = '차익거래' | '파밍' | '분석' | '디파이' | '리스크관리';

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface StrategyStep {
  title: string;
  content: string;
}

export interface Strategy {
  slug: string;
  title: string;
  subtitle: string;
  category: StrategyCategory;
  difficulty: Difficulty;
  expectedReturn: string;
  requiredCapital: string;
  timeRequired: string;
  icon: string;
  xp: number;
  steps: StrategyStep[];
  risks: string[];
  relatedToolSlugs: string[];
  relatedTermSlugs: string[];
}

export const STRATEGY_CATEGORIES: StrategyCategory[] = ['차익거래', '파밍', '분석', '디파이', '리스크관리'];

export const strategies: Strategy[] = [
  {
    slug: 'funding-rate-arbitrage',
    title: '펀딩비 차익거래',
    subtitle: '두 거래소 반대 포지션으로 가격 리스크 없이 펀딩비 수익',
    category: '차익거래',
    difficulty: 4,
    expectedReturn: '연 15-40%',
    requiredCapital: '$500+',
    timeRequired: '하루 30분',
    icon: 'ArrowLeftRight',
    xp: 200,
    steps: [
      {
        title: '개념 이해하기',
        content: `펀딩비(Funding Rate)는 무기한 선물(Perpetual Futures) 시장에서 매수자와 매도자 사이에 주기적으로 정산되는 수수료야.

**핵심 원리:**
- 펀딩비가 +면: 롱 포지션이 숏 포지션에 돈을 줌 (시장 과열)
- 펀딩비가 -면: 숏 포지션이 롱 포지션에 돈을 줌 (시장 공포)
- 거래소마다 펀딩비가 달라 → 이 차이를 이용해 수익을 냄

**델타 뉴트럴 전략:**
같은 코인을 A거래소에서 롱, B거래소에서 숏 → 가격이 오르든 내리든 손익 상쇄. 오직 펀딩비 차이만 수익으로 가져가는 구조야.`,
      },
      {
        title: '거래소 준비',
        content: `최소 2개 거래소 계정이 필요해:

**추천 조합:**
- Hyperliquid (탈중앙, maker 리베이트 -0.015%) + Bybit (중앙화, 다양한 코인)
- Binance + Bybit (둘 다 중앙화, 유동성 최고)

**준비물:**
1. 각 거래소 계정 생성 + KYC 완료
2. API 키 발급 (읽기 + 거래 권한)
3. 각 거래소에 자본 분배 (50:50)
4. 테스트넷으로 먼저 연습

**중요:** 한국 거래소(업비트, 빗썸)는 선물 거래 불가. 해외 거래소 사용 필수.`,
      },
      {
        title: '스프레드 계산',
        content: `수익이 나려면 두 거래소의 펀딩비 차이(스프레드)가 수수료보다 커야 해.

**수수료 구조 예시:**
- 거래소 A maker: -0.015% (리베이트)
- 거래소 B taker: 0.055%
- 왕복 수수료: ~0.16% (슬리피지 포함)

**손익분기점 계산:**
- 왕복 수수료 0.16% ÷ 예상 보유시간(h) = 최소 hourly 스프레드
- 예: 0.16% ÷ 24h = 시간당 0.0067% 이상 필요

**실전 진입 기준:**
- hourly 스프레드 0.020% 이상 (보수적)
- 코인 Open Interest $1M 이상 (유동성)
- 최대 보유 48시간`,
      },
      {
        title: '실행하기',
        content: `**진입 순서:**
1. 스프레드가 기준 이상인 코인 탐색
2. 펀딩비가 높은 거래소에서 반대 포지션 (수취 방향)
3. 다른 거래소에서 같은 크기로 반대 포지션
4. 두 주문이 거의 동시에 체결되도록 실행

**청산 조건:**
- 스프레드가 역전되면 양쪽 동시 청산
- 최대 보유시간(48h) 초과 시 청산
- 비정상 시장 (급락/급등) 시 즉시 청산

**자동화:**
Python이나 JavaScript로 봇을 만들면 24시간 자동 모니터링 + 진입/청산 가능. 처음엔 수동으로 연습하고 패턴을 익힌 뒤 자동화를 추천해.`,
      },
      {
        title: '리스크 관리',
        content: `**필수 안전장치:**
- 포지션 크기: 전체 자본의 20% 이하
- 레버리지: 2-3x (낮을수록 안전)
- 최대 동시 포지션: 2-3개
- 일일 손실 한도: 전체 자본의 5%
- 서킷브레이커: 연속 손실 시 자동 중단

**주의사항:**
- 교차검증: 봇 상태와 실제 포지션 주기적 확인
- 고아 포지션: 한쪽만 체결/청산되는 상황 대비
- 거래소 다운타임: 정기점검 시간 피하기
- 네트워크 오류: 재시도 로직 필수`,
      },
    ],
    risks: [
      '한쪽 거래소가 다운되면 헷지가 풀려 가격 리스크 발생',
      '급격한 가격 변동 시 한쪽 포지션 청산 위험 (특히 고레버리지)',
      '거래소 수수료 변경으로 수익성이 떨어질 수 있음',
      '봇 오류나 API 장애로 고아 포지션 발생 가능',
    ],
    relatedToolSlugs: ['funding-calculator', 'position-size-calculator'],
    relatedTermSlugs: ['funding-rate', 'delta-neutral', 'liquidation', 'leverage'],
  },
  {
    slug: 'airdrop-farming',
    title: '에어드랍 파밍 시스템화',
    subtitle: '신규 프로토콜 에어드랍을 체계적으로 파밍하는 전략',
    category: '파밍',
    difficulty: 2,
    expectedReturn: '건당 $100-$5,000+',
    requiredCapital: '$100+',
    timeRequired: '주 2-3시간',
    icon: 'Gift',
    xp: 120,
    steps: [
      {
        title: '에어드랍 원리',
        content: `에어드랍은 프로토콜이 초기 사용자에게 무료로 토큰을 배포하는 이벤트야.

**왜 에어드랍을 할까?**
- 탈중앙화: 토큰을 다양한 사용자에게 분배
- 마케팅: 사용자 확보 + 입소문
- 거버넌스: 실제 사용자에게 투표권 부여

**역대 대형 에어드랍:**
- Uniswap (2020): 사용자당 ~$1,200
- Arbitrum (2023): 활성 사용자 $625+
- Jito (2023): SOL 스테이커 $2,000+
- Jupiter (2024): SOL 사용자 $500+

**핵심:** "지금 사용하고, 나중에 받는다" — 아직 토큰이 없는 프로토콜을 미리 사용하는 게 핵심이야.`,
      },
      {
        title: '유망 프로토콜 발굴',
        content: `**에어드랍 가능성 높은 프로토콜 특징:**
1. VC 투자를 받았지만 아직 토큰 없음
2. 활발한 개발 + 사용자 증가 중
3. 포인트/마일 시스템 운영 중
4. 테스트넷 활동 보상 예고

**정보 소스:**
- DeFiLlama: TVL 급성장 프로토콜
- Crypto Twitter/X: @aaboringdao, @DefiIgnas 등 에어드랍 헌터
- 에어드랍 트래커: earndrop.io, airdrops.io
- 공식 Discord/Blog: 로드맵에 "토큰" 언급 확인

**레드플래그:**
- 입금만 요구하고 활동 기준이 불명확
- 팀이 익명이고 감사(Audit) 없음
- "보장된 에어드랍" 홍보 (사기 가능성)`,
      },
      {
        title: '체계적 파밍 방법',
        content: `**월별 루틴 만들기:**

**주 1회 (30분):**
- 새로운 유망 프로토콜 리서치
- 기존 프로토콜 활동 상태 체크
- 지갑 잔액 + 가스비 확인

**프로토콜별 활동:**
1. 브릿지: 다른 체인에서 자금 이동 (공식 브릿지 사용)
2. 스왑: DEX에서 최소 거래 실행
3. 유동성 공급: LP에 소액이라도 공급
4. 거버넌스: 투표 참여 (비용 거의 없음)
5. 테스트넷: 테스트 토큰으로 무료 활동

**비용 관리:**
- 가스비 추적 스프레드시트 유지
- 체인별 활동 비용 비교 (ETH > SOL, Base)
- ROI 계산: 투입 가스비 vs 예상 에어드랍 가치`,
      },
      {
        title: '시빌 방지 & 보안',
        content: `**시빌 공격 주의:**
여러 지갑으로 같은 활동을 반복하면 "시빌(Sybil)"로 분류돼 에어드랍에서 제외될 수 있어.

**안전하게 파밍하는 법:**
- 주 지갑 1-2개로 진정성 있는 활동
- 각 프로토콜 최소 2-3개월 이상 활동
- 금액보다 활동 다양성이 중요
- 온체인 이력을 자연스럽게 쌓기

**보안 필수:**
- 에어드랍 클레임 사이트는 공식 채널에서만 접속
- "지갑 연결" 요청하는 피싱 사이트 주의
- 클레임 전 컨트랙트 주소 검증
- 하드웨어 지갑 사용 추천`,
      },
    ],
    risks: [
      '가스비를 쓰고도 에어드랍을 못 받을 수 있음 (보장 없음)',
      '시빌 판정으로 제외될 위험',
      '스마트 컨트랙트 해킹으로 예치 자금 손실',
      '에어드랍 토큰 가격이 빠르게 하락할 수 있음',
    ],
    relatedToolSlugs: [],
    relatedTermSlugs: ['airdrop', 'defi', 'gas-fee', 'smart-contract'],
  },
  {
    slug: 'liquidation-hunting',
    title: '청산 사냥 역이용',
    subtitle: '대규모 청산이 발생하는 가격대를 미리 파악해 역이용',
    category: '분석',
    difficulty: 3,
    expectedReturn: '트레이드당 3-10%',
    requiredCapital: '$300+',
    timeRequired: '하루 1시간',
    icon: 'Crosshair',
    xp: 150,
    steps: [
      {
        title: '청산 메커니즘 이해',
        content: `**청산(Liquidation)이란?**
레버리지 포지션의 손실이 마진을 초과하면 거래소가 강제로 포지션을 닫는 거야.

**왜 청산이 가격을 움직일까?**
- 롱 청산 = 강제 매도 → 가격 하락 가속
- 숏 청산 = 강제 매수 → 가격 상승 가속
- 연쇄 청산(Cascade): 하나의 청산이 다른 청산을 유발 → 폭포수 효과

**예시:**
BTC $90K에 10x 롱이 몰려있다면, $90K가 깨지면 대규모 롱 청산 → 가격이 $88K까지 급락할 수 있어.
반대로 $88K에서 연쇄 청산이 끝나면 "바닥"이 되어 반등할 가능성이 높아.`,
      },
      {
        title: '청산 데이터 수집',
        content: `**무료 도구:**
- CoinGlass (coinglass.com): 청산 히트맵, OI 데이터
- Hyblock Capital: 청산 레벨 차트
- Kingfisher: 청산 클러스터 시각화

**확인할 데이터:**
1. **청산 히트맵**: 어디에 큰 청산 물량이 쌓여있는지
2. **펀딩비**: 시장 방향 편향 확인
3. **OI(Open Interest)**: 레버리지 포지션 총량
4. **Long/Short Ratio**: 롱숏 비율

**핵심 패턴:**
- OI 급증 + 극단적 펀딩비 → 스퀴즈 가능성 높음
- 특정 가격대에 청산 물량 집중 → 그 가격이 "자석"처럼 끌어당김`,
      },
      {
        title: '전략 실행',
        content: `**전략 1: 청산 후 반등 매수**
1. 대규모 청산 레벨 파악 (예: BTC $88K 롱 청산 클러스터)
2. 청산 레벨 바로 아래에 지정가 매수 주문
3. 연쇄 청산으로 급락 → 주문 체결
4. 반등 시 이익 실현

**전략 2: 스퀴즈 방향 베팅**
1. 롱숏비가 극단적으로 치우친 코인 찾기
2. 소수 방향(반대쪽)으로 진입
3. 스퀴즈 발생 시 큰 움직임에 올라타기

**진입/청산 규칙:**
- 손절: 진입가 대비 2-3%
- 이익실현: 5-10% (또는 청산 폭포 끝난 후)
- 포지션 크기: 전체 자본의 10% 이하`,
      },
      {
        title: '주의사항',
        content: `**이 전략은 타이밍이 핵심이야:**
- 청산 레벨은 예측이지 보장이 아님
- 시장이 청산 레벨을 뚫고 더 떨어질 수 있음
- "떨어지는 칼날 잡기"가 될 수 있으니 반드시 손절 설정

**실수 피하기:**
- 레버리지 과다 사용 금지 (2-3x 이하)
- 큰 뉴스 이벤트 전에는 진입 자제
- 여러 코인에 분산하지 말고 BTC/ETH에 집중
- 연쇄 청산 중에 추가 매수(물타기) 금지

**연습 방법:**
1. CoinGlass 히트맵을 매일 체크
2. 가상 포지션으로 2주간 기록
3. 승률 60% 이상 나오면 소액으로 시작`,
      },
    ],
    risks: [
      '청산 레벨 예측이 빗나가면 손실 (떨어지는 칼날)',
      '연쇄 청산이 예상보다 깊어질 수 있음',
      '갑작스런 뉴스로 청산 패턴이 무효화될 수 있음',
      '레버리지 사용 시 본인도 청산당할 수 있음',
    ],
    relatedToolSlugs: ['position-size-calculator'],
    relatedTermSlugs: ['liquidation', 'leverage', 'funding-rate', 'open-interest'],
  },
  {
    slug: 'smart-money-tracking',
    title: '스마트머니 지갑 추적',
    subtitle: '고래/기관 지갑의 온체인 활동을 추적해 투자 인사이트 확보',
    category: '분석',
    difficulty: 2,
    expectedReturn: '인사이트 기반 (직접 수익 아님)',
    requiredCapital: '$0 (리서치만)',
    timeRequired: '하루 20분',
    icon: 'Eye',
    xp: 100,
    steps: [
      {
        title: '스마트머니란?',
        content: `**스마트머니 = 정보 우위를 가진 투자자**

블록체인은 모든 거래가 공개돼. 그래서 "잘하는 지갑"의 거래를 누구나 볼 수 있어.

**스마트머니 유형:**
1. **VC/기관**: a16z, Paradigm 등의 투자 지갑
2. **고래**: $1M+ 보유 개인 지갑
3. **초기 참여자**: 큰 수익을 낸 프로젝트 초기 투자자
4. **MEV 봇 운영자**: 전문 트레이딩 봇

**왜 추적할까?**
- 고래가 대량 매수 → 가격 상승 가능성
- VC가 새 프로토콜에 투자 → 잠재력 있는 프로젝트
- 고래가 거래소로 입금 → 매도 준비 신호`,
      },
      {
        title: '추적 도구',
        content: `**무료 도구:**
- **Arkham Intelligence** (platform.arkhamintelligence.com): 지갑 라벨링, 알림 설정
- **Nansen** (nansen.ai): 스마트머니 대시보드 (일부 무료)
- **DeBank** (debank.com): 지갑 포트폴리오 조회
- **Etherscan/Solscan**: 개별 트랜잭션 확인

**알림 설정 (필수):**
1. Arkham에서 관심 지갑 "Watch" 추가
2. 대규모 이동 시 알림 (이메일/텔레그램)
3. 특정 토큰 대량 매수/매도 알림

**유용한 온체인 데이터:**
- Token Terminal: 프로토콜 수익/지표
- Dune Analytics: 커스텀 대시보드
- Glassnode: BTC 온체인 지표`,
      },
      {
        title: '지갑 분석 방법',
        content: `**좋은 추적 대상 찾기:**
1. 큰 수익을 낸 트랜잭션 역추적
2. 토큰 초기 구매자 지갑 확인
3. 유명 VC 펀드 알려진 주소 모음

**분석할 것들:**
- **보유 기간**: 장기 보유 vs 단타
- **포트폴리오 구성**: 어떤 토큰에 집중?
- **활동 패턴**: 어떤 DeFi를 주로 사용?
- **최근 변화**: 새로 매수한 토큰은?

**실전 팁:**
- 한 지갑만 보지 말고 여러 스마트머니가 동시에 사는 토큰 찾기
- 매수 후 바로 따라 사지 말고 1-2일 더 관찰
- 소규모 거래는 무시하고 대규모 이동만 주목`,
      },
      {
        title: '인사이트를 투자에 적용',
        content: `**따라 사기(Copy Trading)의 함정:**
- 고래의 매수 가격과 내 매수 가격은 다름
- 고래는 잃어도 되는 돈이 많음
- 고래의 정보 속도를 따라갈 수 없음

**올바른 활용법:**
1. **리서치 보완**: 관심 프로젝트에 스마트머니 진입 여부 확인
2. **타이밍 참고**: 시장 센티먼트 파악 (고래가 사는 중 vs 파는 중)
3. **조기 경보**: 고래가 거래소로 대량 이동 → 매도 준비 가능성
4. **신규 프로젝트 발견**: 여러 VC가 동시에 관심 가지는 프로토콜

**절대 하지 말 것:**
- 단일 지갑만 맹목적으로 따라 사기
- 확인 없이 바로 큰 금액 투자
- 소셜 미디어의 "고래 알림"만 믿기`,
      },
    ],
    risks: [
      '고래 활동을 잘못 해석할 수 있음 (OTC, 지갑 정리 등)',
      '따라 사기 시 이미 늦은 타이밍일 수 있음',
      '지갑 주소가 잘못 라벨링되어 있을 수 있음',
      '스마트머니도 손실을 볼 수 있음 — 과신 금지',
    ],
    relatedToolSlugs: [],
    relatedTermSlugs: ['whale', 'on-chain', 'defi', 'smart-contract'],
  },
  {
    slug: 'onchain-data-analysis',
    title: '온체인 데이터 분석',
    subtitle: '블록체인 데이터를 직접 읽고 해석해서 남들보다 먼저 기회를 포착',
    category: '분석',
    difficulty: 3,
    expectedReturn: '인사이트 기반 알파',
    requiredCapital: '$0 (무료 도구)',
    timeRequired: '하루 30분',
    icon: 'Activity',
    xp: 180,
    steps: [
      {
        title: '온체인 데이터가 뭔데?',
        content: `블록체인의 모든 거래는 공개돼. 이걸 분석하면 가격 차트만 보는 사람들보다 한 발 앞서갈 수 있어.

**온체인 데이터로 알 수 있는 것:**
- 고래가 지금 사고 있는지, 팔고 있는지
- 거래소에 코인이 쌓이고 있는지 (매도 압력)
- DeFi 프로토콜에 돈이 얼마나 들어오는지
- 새 지갑이 얼마나 생기는지 (신규 유입)
- 스마트 컨트랙트와 상호작용하는 패턴

**차트 분석 vs 온체인 분석:**
- 차트: "가격이 어떻게 움직였는가" (과거)
- 온체인: "돈이 지금 어디로 가고 있는가" (현재)
- 둘 다 쓰면 더 정확한 판단이 가능해`,
      },
      {
        title: '필수 도구 세팅',
        content: `**1. Dune Analytics (dune.com) — 무료**
커스텀 SQL 대시보드. 수천 개의 커뮤니티 대시보드가 이미 만들어져 있어.
- 검색: "DEX volume", "stablecoin flows", "NFT mint" 등
- 인기 대시보드 팔로우하면 매일 업데이트 확인 가능
- SQL 몰라도 다른 사람이 만든 대시보드 볼 수 있음

**2. DefiLlama (defillama.com) — 무료**
DeFi 프로토콜의 TVL(예치금) 추적.
- TVL 급증하는 프로토콜 = 관심 증가 신호
- 체인별 비교 (Ethereum vs Solana vs Base)
- 수익(Revenue) 탭에서 실제 돈 버는 프로토콜 확인

**3. Glassnode / CryptoQuant — 일부 무료**
BTC/ETH 전문 온체인 지표.
- 거래소 입출금 흐름
- MVRV (시장가치/실현가치) 비율
- 장기 보유자(HODLer) 움직임

**4. Arkham Intelligence — 무료**
지갑 라벨링 + 자금 흐름 추적.
- 누구의 지갑인지 알려줌 (CEX, VC, 기관 등)
- 대규모 이동 알림 설정 가능

**5. Token Terminal — 일부 무료**
프로토콜의 "재무제표". 매출, 사용자 수, P/S 비율 등.`,
      },
      {
        title: '핵심 지표 읽는 법',
        content: `**1. 거래소 순유입/순유출 (Exchange Netflow)**
- 순유입(+): 코인이 거래소로 이동 → 매도 압력 증가
- 순유출(-): 코인이 거래소에서 빠져나감 → 장기 보유 의향
- BTC가 거래소에서 대량 출금 → 강세 신호

**2. TVL (Total Value Locked)**
- DeFi 프로토콜에 예치된 총 금액
- TVL 상승 = 프로토콜 신뢰도/인기 상승
- TVL 급락 = 불안감, 자금 이탈 (러그풀 가능성)
- TVL/시총 비율이 높으면 실제 사용되는 프로토콜

**3. 활성 주소 수 (Active Addresses)**
- 매일 거래하는 고유 지갑 수
- 증가 = 네트워크 성장, 신규 유입
- 감소 = 관심 하락
- 가격은 오르는데 활성 주소 감소 → 경고 신호

**4. 스테이블코인 유입 (Stablecoin Flows)**
- USDT/USDC가 거래소로 유입 → 매수 대기 자금
- 스테이블코인 시총 증가 → 시장에 돈이 들어오는 중
- 이건 "매수 총알"이 얼마나 준비됐는지 보는 거야

**5. MVRV Ratio (Market Value / Realized Value)**
- 1 이하: 평균적으로 손실 상태 → 바닥 가능성
- 3 이상: 과열 → 고점 가능성
- BTC 장기 사이클 판단에 매우 유용`,
      },
      {
        title: '실전 데일리 루틴',
        content: `**매일 아침 10분 체크리스트:**

1. **DefiLlama** → 체인별 TVL 변화 확인
   - 어떤 체인에 돈이 몰리는지?
   - 새로 등장한 프로토콜이 있는지?

2. **CryptoQuant/Glassnode** → 거래소 넷플로우
   - BTC/ETH 거래소 입출금 추세
   - 대규모 입금 알림 확인

3. **Arkham** → 스마트머니 알림
   - 어제 큰 움직임이 있었는지?
   - VC 지갑 새 투자 여부

4. **Dune** → 즐겨찾기 대시보드 체크
   - DEX 거래량 추세
   - 스테이블코인 흐름

**주간 심화 (30분):**
- Token Terminal에서 프로토콜 매출 비교
- 새로 뜨는 프로토콜 TVL 순위 변화
- 온체인 데이터와 가격 차트 교차 확인`,
      },
      {
        title: 'Dune 대시보드 활용법',
        content: `**Dune = 온체인 데이터의 구글**

SQL을 몰라도 기존 대시보드를 활용할 수 있어:

**추천 대시보드 (검색어):**
- "DEX Trading Volume" → DEX별 거래량 비교
- "Stablecoin Dashboard" → USDT/USDC 발행량, 유통량
- "Ethereum Gas Tracker" → 가스비 추세, 어떤 컨트랙트가 가스를 많이 쓰는지
- "NFT Marketplace" → OpenSea, Blur 거래량
- "Layer 2 Comparison" → Arbitrum, Optimism, Base 비교
- "Bridge Volume" → 어떤 체인으로 돈이 이동하는지

**대시보드 읽는 팁:**
1. 시간 범위를 7일/30일로 바꿔보기
2. 급격한 변화가 있는 구간에 주목
3. "Fork" 버튼으로 내 대시보드에 복사 가능
4. 여러 대시보드를 즐겨찾기해서 루틴에 활용

**직접 쿼리 쓰기 (선택):**
SQL을 조금만 배우면 나만의 분석이 가능해:
\`SELECT date, sum(amount) FROM trades WHERE token = 'WETH' GROUP BY date\`
이런 간단한 쿼리로도 유용한 인사이트를 얻을 수 있어.`,
      },
      {
        title: '실전 시그널 해석',
        content: `**강세 시그널 (매수 고려):**
- BTC 거래소 잔고 감소 + 활성 주소 증가
- 스테이블코인 거래소 유입 증가
- DeFi TVL 상승 + 신규 프로토콜 성장
- 장기 보유자(1년+) 비율 증가
- MVRV 1.0 근처 (역사적 바닥)

**약세 시그널 (주의/매도):**
- BTC 대량 거래소 입금 (특히 고래)
- 스테이블코인 시총 감소
- DeFi TVL 급락 + 프로토콜 해킹
- 활성 주소 감소 (관심 이탈)
- MVRV 3.0+ (역사적 고점)

**중요:** 하나의 지표만 보지 마. 여러 지표가 같은 방향을 가리킬 때 신뢰도가 높아져. 그리고 온체인 데이터는 "확인" 도구이지 "예측" 도구가 아니야.`,
      },
    ],
    risks: [
      '온체인 데이터 해석은 주관적일 수 있음 — 같은 데이터 다른 결론',
      '과거 패턴이 미래를 보장하지 않음',
      '무료 도구의 데이터는 지연이 있을 수 있음',
      '온체인 데이터만으로 투자 결정을 내리면 위험 — 다른 분석과 병행 필수',
    ],
    relatedToolSlugs: [],
    relatedTermSlugs: ['on-chain', 'whale', 'defi', 'mev', 'open-interest'],
  },
];

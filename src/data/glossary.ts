export type GlossaryCategory = '기초' | '트레이딩' | '디파이' | '온체인' | '보안' | 'NFT';

export interface GlossaryTerm {
  slug: string;
  titleKo: string;
  titleEn: string;
  shortDef: string;
  explanation: string;
  category: GlossaryCategory;
  relatedTermSlugs: string[];
  relatedQuestIds: number[];
}

export const CATEGORIES: GlossaryCategory[] = ['기초', '트레이딩', '디파이', '온체인', '보안', 'NFT'];

export const glossaryTerms: GlossaryTerm[] = [
  // ===== 기초 (8) =====
  {
    slug: 'blockchain',
    titleKo: '블록체인',
    titleEn: 'Blockchain',
    shortDef: '거래 기록을 블록에 담아 체인처럼 연결한 분산 장부 기술.',
    explanation: `블록체인은 데이터를 "블록" 단위로 묶어 시간순으로 연결하는 분산 원장 기술이야. 은행 같은 중앙 기관 없이도 전 세계 컴퓨터(노드)들이 동일한 기록을 공유하며 검증해.

핵심 특징은 세 가지야:
- **탈중앙화**: 한 곳이 아닌 수천~수만 대의 컴퓨터가 장부를 관리해. 한 곳이 해킹당해도 나머지가 정상이면 문제없어.
- **투명성**: 모든 거래 기록이 공개돼. 누구나 블록 탐색기(Block Explorer)로 확인 가능.
- **불변성**: 한번 기록된 데이터는 수정하거나 삭제할 수 없어. 이전 블록을 바꾸려면 이후 모든 블록을 다시 계산해야 하거든.

비트코인이 최초의 블록체인(2009)이고, 이더리움은 스마트 컨트랙트를 추가해 더 다양한 활용을 가능하게 했어.`,
    category: '기초',
    relatedTermSlugs: ['bitcoin', 'ethereum', 'smart-contract', 'layer2'],
    relatedQuestIds: [1],
  },
  {
    slug: 'bitcoin',
    titleKo: '비트코인',
    titleEn: 'Bitcoin (BTC)',
    shortDef: '2009년 만들어진 최초의 암호화폐. 디지털 금이라 불림.',
    explanation: `비트코인(BTC)은 2009년 사토시 나카모토라는 익명의 인물(또는 그룹)이 만든 세계 최초의 암호화폐야.

**왜 "디지털 금"이라 불릴까?**
- 총 발행량이 2,100만 개로 제한돼 있어 (희소성)
- 채굴(Mining)로 새 코인이 생기는데, 4년마다 보상이 반으로 줄어 (반감기)
- 중앙 기관이 마음대로 찍어낼 수 없어

**비트코인의 역할:**
비트코인은 "가치 저장(Store of Value)" 수단으로 주로 사용돼. 금처럼 장기 보유하는 사람이 많고, 시가총액 기준 암호화폐 1위야.

**주의할 점:**
가격 변동성이 매우 커. 하루에 10% 이상 오르내리기도 해. 투자할 때는 반드시 잃어도 괜찮은 금액만 넣어야 해.`,
    category: '기초',
    relatedTermSlugs: ['blockchain', 'halving', 'market-cap', 'wallet'],
    relatedQuestIds: [1, 2],
  },
  {
    slug: 'ethereum',
    titleKo: '이더리움',
    titleEn: 'Ethereum (ETH)',
    shortDef: '스마트 컨트랙트를 실행할 수 있는 블록체인 플랫폼.',
    explanation: `이더리움(ETH)은 2015년 비탈릭 부테린이 만든 블록체인 플랫폼이야. 비트코인이 "디지털 금"이라면, 이더리움은 "월드 컴퓨터"라고 불려.

**비트코인과 뭐가 다를까?**
비트코인은 주로 돈을 보내고 받는 데 쓰이지만, 이더리움은 **스마트 컨트랙트**를 실행할 수 있어. 스마트 컨트랙트 덕분에 DeFi, NFT, DAO 같은 것들이 가능해졌어.

**이더리움 위에서 돌아가는 것들:**
- **DeFi**: 탈중앙 금융 서비스 (대출, 거래, 이자 농사)
- **NFT**: 디지털 소유권 증명
- **DAO**: 탈중앙 자율 조직
- **Layer 2**: 더 빠르고 저렴한 확장 솔루션

**가스비(Gas Fee):**
이더리움에서 뭔가를 실행하려면 "가스비"를 내야 해. 네트워크가 바쁠수록 비싸져.`,
    category: '기초',
    relatedTermSlugs: ['blockchain', 'smart-contract', 'defi', 'gas-fee', 'nft'],
    relatedQuestIds: [1, 5],
  },
  {
    slug: 'altcoin',
    titleKo: '알트코인',
    titleEn: 'Altcoin',
    shortDef: '비트코인을 제외한 모든 암호화폐를 통칭하는 말.',
    explanation: `알트코인(Altcoin)은 "Alternative Coin"의 줄임말로, 비트코인이 아닌 모든 암호화폐를 뜻해.

**대표적인 알트코인:**
- **이더리움(ETH)**: 스마트 컨트랙트 플랫폼
- **솔라나(SOL)**: 초고속 블록체인
- **리플(XRP)**: 국제 송금 특화
- **카르다노(ADA)**: 학술 연구 기반 블록체인

**알트코인 시즌이란?**
비트코인이 먼저 오르고, 그 다음 알트코인들이 폭등하는 시기를 "알트코인 시즌(Altseason)"이라 해. 비트코인 도미넌스(점유율)가 떨어지면 알트 시즌 가능성이 높아져.

**주의:**
알트코인은 비트코인보다 변동성이 훨씬 커. 100배 오를 수도 있지만, 99% 떨어질 수도 있어. 특히 시가총액이 작은 코인일수록 위험해.`,
    category: '기초',
    relatedTermSlugs: ['bitcoin', 'ethereum', 'market-cap', 'stablecoin'],
    relatedQuestIds: [1],
  },
  {
    slug: 'stablecoin',
    titleKo: '스테이블코인',
    titleEn: 'Stablecoin',
    shortDef: '달러 등 법정화폐에 가치가 고정된 암호화폐.',
    explanation: `스테이블코인은 가격이 1달러(또는 다른 법정화폐)에 고정되도록 설계된 암호화폐야.

**왜 필요할까?**
비트코인, 이더리움은 가격 변동이 심해서 일상적인 결제나 거래에 쓰기 어려워. 스테이블코인은 1코인 = 1달러로 유지되니까 가격 걱정 없이 사용할 수 있어.

**종류별 차이:**
- **USDT (테더)**: 가장 많이 쓰이는 스테이블코인. 테더사가 달러를 보유하고 발행.
- **USDC (서클)**: 코인베이스가 지원. 규제 준수, 투명한 감사.
- **DAI**: 이더리움 담보로 발행하는 탈중앙 스테이블코인.

**스테이블코인의 활용:**
- 크립토 거래할 때 기축통화처럼 사용
- DeFi에서 이자 수익 획득
- 국제 송금 (빠르고 저렴)`,
    category: '기초',
    relatedTermSlugs: ['defi', 'dex', 'yield-farming', 'altcoin'],
    relatedQuestIds: [1, 6],
  },
  {
    slug: 'token',
    titleKo: '토큰',
    titleEn: 'Token',
    shortDef: '기존 블록체인 위에서 발행되는 디지털 자산.',
    explanation: `토큰은 이더리움 같은 기존 블록체인 위에서 만들어진 디지털 자산이야. 자체 블록체인을 가진 "코인"과는 구분돼.

**코인 vs 토큰:**
- **코인**: 자체 블록체인이 있음 (BTC, ETH, SOL)
- **토큰**: 다른 블록체인 위에서 발행 (UNI, LINK, AAVE)

**토큰의 종류:**
- **유틸리티 토큰**: 특정 서비스에서 사용 (UNI로 유니스왑 거버넌스 참여)
- **거버넌스 토큰**: 프로토콜 운영에 투표권 (AAVE, COMP)
- **보안 토큰**: 실제 자산(주식, 부동산)을 대표

**ERC-20이란?**
이더리움에서 토큰을 만드는 표준 규격이야. 대부분의 이더리움 토큰이 ERC-20을 따르고, 지갑과 거래소에서 쉽게 호환돼.`,
    category: '기초',
    relatedTermSlugs: ['ethereum', 'smart-contract', 'nft', 'defi'],
    relatedQuestIds: [1, 5],
  },
  {
    slug: 'whitepaper',
    titleKo: '백서',
    titleEn: 'Whitepaper',
    shortDef: '프로젝트의 기술, 비전, 토큰 경제를 설명하는 공식 문서.',
    explanation: `백서(Whitepaper)는 크립토 프로젝트가 "우리는 이런 문제를 이렇게 해결할 거야"라고 설명하는 공식 기술 문서야.

**백서에 담긴 내용:**
- 해결하려는 문제와 비전
- 기술적 구현 방법
- 토크노믹스 (토큰 발행량, 배분, 인센티브)
- 로드맵 (개발 일정)
- 팀 소개

**유명한 백서:**
- **비트코인 백서** (2008): 사토시 나카모토가 작성. 9페이지로 세상을 바꿈.
- **이더리움 백서** (2013): 비탈릭 부테린이 작성. 스마트 컨트랙트 개념 제시.

**백서 읽을 때 체크포인트:**
1. 실제로 해결하는 문제가 있나?
2. 기술이 실현 가능한가?
3. 토큰이 정말 필요한가?
4. 팀이 공개되어 있나?
답이 하나라도 "아니오"면 주의가 필요해.`,
    category: '기초',
    relatedTermSlugs: ['bitcoin', 'ethereum', 'token', 'rug-pull'],
    relatedQuestIds: [3],
  },
  {
    slug: 'halving',
    titleKo: '반감기',
    titleEn: 'Halving',
    shortDef: '비트코인 채굴 보상이 4년마다 절반으로 줄어드는 이벤트.',
    explanation: `반감기(Halving)는 비트코인 채굴 보상이 약 4년(21만 블록)마다 절반으로 줄어드는 이벤트야.

**반감기 역사:**
- 2009년: 블록당 50 BTC
- 2012년 (1차): 25 BTC
- 2016년 (2차): 12.5 BTC
- 2020년 (3차): 6.25 BTC
- 2024년 (4차): 3.125 BTC

**왜 중요할까?**
새로 만들어지는 비트코인이 줄어들면 공급이 감소해. 수요가 유지되거나 늘면 가격이 오를 수밖에 없지.

역사적으로 반감기 후 12~18개월 안에 사상 최고가를 기록했어. 물론 과거가 미래를 보장하진 않아.

**최종 반감기:**
2100만 개가 다 채굴되는 약 2140년까지 반감기가 계속돼. 그 이후에는 채굴자들이 거래 수수료만으로 운영해야 해.`,
    category: '기초',
    relatedTermSlugs: ['bitcoin', 'market-cap', 'volume'],
    relatedQuestIds: [1, 2],
  },

  // ===== 트레이딩 (5) =====
  {
    slug: 'market-cap',
    titleKo: '시가총액',
    titleEn: 'Market Cap',
    shortDef: '코인 가격 × 유통량. 프로젝트의 규모를 나타내는 지표.',
    explanation: `시가총액(Market Cap)은 암호화폐의 전체 가치를 나타내는 지표야.

**계산법:** 현재 가격 × 유통 공급량
예: BTC 가격 $100,000 × 유통량 1,970만 개 = 시총 약 $1.97조

**시가총액으로 코인 분류:**
- **대형주 (Large Cap)**: $10B 이상 (BTC, ETH, SOL)
- **중형주 (Mid Cap)**: $1B ~ $10B
- **소형주 (Small Cap)**: $100M ~ $1B
- **마이크로캡**: $100M 미만 (매우 고위험)

**시총이 중요한 이유:**
"이 코인이 100배 오를 수 있을까?" 답은 시총에 있어. 시총 $1B 코인이 100배 오르면 $100B인데, 그건 이더리움급이야. 현실적으로 어렵지.

**함정 주의:**
시총이 높다고 안전한 건 아니야. LUNA는 시총 $40B에서 하루아침에 거의 0이 됐어.`,
    category: '트레이딩',
    relatedTermSlugs: ['bitcoin', 'volume', 'altcoin'],
    relatedQuestIds: [2, 4],
  },
  {
    slug: 'volume',
    titleKo: '거래량',
    titleEn: 'Trading Volume',
    shortDef: '일정 기간 동안 거래된 코인의 총 금액.',
    explanation: `거래량(Volume)은 특정 기간(보통 24시간) 동안 얼마나 많은 코인이 거래됐는지 나타내는 지표야.

**거래량이 왜 중요할까?**
- **유동성 지표**: 거래량이 높으면 사고팔기 쉬워
- **추세 확인**: 가격이 오르면서 거래량도 늘면 진짜 상승, 거래량 없이 오르면 가짜
- **변곡점 신호**: 갑자기 거래량이 폭증하면 큰 움직임의 시작일 수 있어

**거래량 읽는 법:**
- 가격 상승 + 거래량 증가 = 강한 상승 (매수세 강함)
- 가격 상승 + 거래량 감소 = 약한 상승 (조만간 하락 가능)
- 가격 하락 + 거래량 증가 = 강한 하락 (패닉 매도)
- 가격 하락 + 거래량 감소 = 약한 하락 (바닥 가능)

**주의:** 일부 거래소는 거래량을 부풀리기도 해(워시 트레이딩). CoinGecko나 CoinMarketCap에서 신뢰도를 확인해.`,
    category: '트레이딩',
    relatedTermSlugs: ['market-cap', 'order-book', 'slippage'],
    relatedQuestIds: [4],
  },
  {
    slug: 'order-book',
    titleKo: '오더북',
    titleEn: 'Order Book',
    shortDef: '거래소에서 매수/매도 주문이 모여있는 호가창.',
    explanation: `오더북(Order Book)은 거래소에서 "사고 싶은 사람"과 "팔고 싶은 사람"의 주문이 가격별로 나열된 표야.

**구성:**
- **매수(Bid)**: 코인을 사려는 주문 (초록색). 가장 높은 매수 가격이 위에.
- **매도(Ask)**: 코인을 팔려는 주문 (빨간색). 가장 낮은 매도 가격이 위에.
- **스프레드**: 최고 매수가와 최저 매도가의 차이.

**오더북 읽는 법:**
- 매수벽(Buy Wall): 특정 가격에 큰 매수 주문 → 가격 지지선 역할
- 매도벽(Sell Wall): 특정 가격에 큰 매도 주문 → 가격 저항선 역할

**예시:**
매도: $100.50 (10 BTC), $100.30 (5 BTC), $100.10 (2 BTC)
매수: $100.00 (3 BTC), $99.80 (8 BTC), $99.50 (15 BTC)
→ 스프레드 = $100.10 - $100.00 = $0.10

**참고:** DEX(탈중앙 거래소)는 오더북 대신 AMM(자동화 마켓 메이커)을 사용해.`,
    category: '트레이딩',
    relatedTermSlugs: ['volume', 'slippage', 'dex', 'liquidity-pool'],
    relatedQuestIds: [4],
  },
  {
    slug: 'slippage',
    titleKo: '슬리피지',
    titleEn: 'Slippage',
    shortDef: '주문한 가격과 실제 체결 가격의 차이.',
    explanation: `슬리피지(Slippage)는 내가 원한 가격과 실제로 거래된 가격 사이의 차이야.

**왜 발생할까?**
- 유동성이 낮을 때 (사려는 양에 비해 매도 물량이 적으면)
- 시장이 급변할 때 (가격이 빠르게 움직이면)
- 큰 금액을 한 번에 거래할 때

**예시:**
ETH를 $3,000에 사려고 했는데, 실제로 $3,015에 체결 → 슬리피지 0.5%

**DEX에서 슬리피지:**
유니스왑 같은 DEX에서는 슬리피지 허용 범위를 직접 설정해. 보통 0.5~1%로 설정하지만, 유동성이 적은 코인은 5% 이상 필요할 수도 있어.

**슬리피지 줄이는 법:**
1. 유동성이 높은 거래소/풀 사용
2. 주문을 나눠서 실행
3. 급등/급락 시 거래 피하기
4. 지정가 주문 사용 (시장가 대신)`,
    category: '트레이딩',
    relatedTermSlugs: ['order-book', 'dex', 'liquidity-pool', 'volume'],
    relatedQuestIds: [4, 7],
  },
  {
    slug: 'leverage',
    titleKo: '레버리지',
    titleEn: 'Leverage',
    shortDef: '빌린 자금으로 투자 규모를 키우는 것. 수익과 손실 모두 증폭.',
    explanation: `레버리지(Leverage)는 자기 돈보다 더 큰 금액으로 거래할 수 있게 해주는 도구야.

**원리:**
- 내 돈(증거금) $100 + 10배 레버리지 = $1,000어치 거래 가능
- 가격이 10% 오르면: $100 수익 (원금 대비 100%)
- 가격이 10% 내리면: $100 손실 (원금 전액 날림 = 청산)

**청산(Liquidation):**
레버리지 거래에서 손실이 증거금에 가까워지면 거래소가 강제로 포지션을 닫아. 이걸 "청산"이라 해.

**레버리지 단계:**
- 2~3배: 보수적 (장기 트레이더)
- 5~10배: 중간 (스윙 트레이더)
- 20~100배: 고위험 (거의 도박)

**현실:**
통계적으로 레버리지 트레이더의 90% 이상이 손실을 봐. 초보자는 절대 레버리지를 쓰면 안 돼. "잃어도 되는 돈"의 범위를 넘어서기 때문이야.`,
    category: '트레이딩',
    relatedTermSlugs: ['order-book', 'volume', 'slippage'],
    relatedQuestIds: [4],
  },

  // ===== 디파이 (6) =====
  {
    slug: 'defi',
    titleKo: '디파이',
    titleEn: 'DeFi (Decentralized Finance)',
    shortDef: '은행 없이 블록체인에서 운영되는 탈중앙 금융 서비스.',
    explanation: `디파이(DeFi)는 Decentralized Finance의 약자로, 은행이나 증권사 같은 중개자 없이 블록체인에서 돌아가는 금융 서비스야.

**전통 금융 vs DeFi:**
- 은행 예금 → DeFi 예치(Lending)
- 주식 거래소 → DEX(탈중앙 거래소)
- 환전소 → 스왑(Swap)
- 대출 → 담보 대출(Collateralized Lending)

**DeFi의 장점:**
- 24시간 365일 운영 (은행 영업시간 없음)
- 누구나 참여 가능 (신분증, 신용점수 불필요)
- 투명한 규칙 (코드로 작성된 스마트 컨트랙트)

**대표적인 DeFi 프로토콜:**
- **Uniswap**: 탈중앙 거래소 (DEX)
- **Aave**: 대출/예금 프로토콜
- **Lido**: 이더리움 스테이킹
- **Curve**: 스테이블코인 특화 DEX

**위험 요소:**
스마트 컨트랙트 해킹, 러그풀, 비영구적 손실 등 전통 금융에는 없는 위험이 있어. 항상 감사(Audit)된 프로토콜만 사용하자.`,
    category: '디파이',
    relatedTermSlugs: ['dex', 'yield-farming', 'staking', 'liquidity-pool', 'smart-contract'],
    relatedQuestIds: [5, 6, 7],
  },
  {
    slug: 'dex',
    titleKo: '탈중앙 거래소',
    titleEn: 'DEX (Decentralized Exchange)',
    shortDef: '중앙 관리자 없이 스마트 컨트랙트로 운영되는 거래소.',
    explanation: `DEX(Decentralized Exchange)는 업비트, 바이낸스 같은 중앙화 거래소(CEX)와 달리, 스마트 컨트랙트가 거래를 처리하는 탈중앙 거래소야.

**CEX vs DEX:**
| | CEX (업비트, 바이낸스) | DEX (유니스왑, 레이디움) |
|---|---|---|
| 지갑 | 거래소가 관리 | 내가 직접 관리 |
| KYC | 필수 | 불필요 |
| 상장 | 거래소가 결정 | 누구나 토큰 추가 가능 |
| 해킹 | 거래소 해킹 위험 | 개인 지갑 보안이 관건 |

**DEX 작동 원리 (AMM):**
전통적인 오더북 대신 **유동성 풀(Liquidity Pool)**을 사용해. 사용자들이 토큰 쌍을 풀에 넣어두면, 알고리즘이 자동으로 가격을 계산해.

**대표 DEX:**
- **Uniswap** (이더리움)
- **Raydium** (솔라나)
- **PancakeSwap** (BNB Chain)
- **Hyperliquid** (자체 L1, 선물 특화)`,
    category: '디파이',
    relatedTermSlugs: ['defi', 'liquidity-pool', 'slippage', 'smart-contract'],
    relatedQuestIds: [7],
  },
  {
    slug: 'liquidity-pool',
    titleKo: '유동성 풀',
    titleEn: 'Liquidity Pool',
    shortDef: '거래를 가능하게 하기 위해 토큰 쌍을 모아둔 스마트 컨트랙트.',
    explanation: `유동성 풀(Liquidity Pool)은 DEX에서 거래가 이루어질 수 있도록 토큰 쌍을 모아놓은 스마트 컨트랙트야.

**어떻게 작동하나?**
1. 유동성 제공자(LP)가 두 토큰을 같은 가치만큼 넣어 (예: $500 ETH + $500 USDC)
2. 누군가 ETH를 사면 풀에서 ETH가 빠지고 USDC가 들어옴
3. x × y = k 공식으로 가격이 자동 결정됨

**유동성 제공의 보상:**
- 거래할 때마다 수수료(보통 0.3%)가 발생
- 이 수수료가 LP에게 지분만큼 분배됨
- 추가 토큰 보상을 주는 프로토콜도 있음

**비영구적 손실(Impermanent Loss):**
풀에 넣은 두 토큰의 가격 비율이 변하면 손실이 발생할 수 있어. 이건 "비영구적 손실" 용어에서 자세히 설명해.`,
    category: '디파이',
    relatedTermSlugs: ['dex', 'impermanent-loss', 'yield-farming', 'defi'],
    relatedQuestIds: [7, 8],
  },
  {
    slug: 'yield-farming',
    titleKo: '이자 농사',
    titleEn: 'Yield Farming',
    shortDef: 'DeFi 프로토콜에 자산을 예치하고 보상을 받는 투자 전략.',
    explanation: `이자 농사(Yield Farming)는 DeFi 프로토콜에 크립토 자산을 넣고 이자나 보상 토큰을 받는 투자 방식이야.

**이자 농사 방법:**
1. **유동성 제공**: DEX에 토큰 쌍을 넣고 거래 수수료 수익
2. **대출**: Aave에 코인을 예치하고 이자 수익
3. **스테이킹**: 네트워크 검증에 참여하고 보상
4. **볼트(Vault)**: Yearn 같은 프로토콜이 자동으로 최적 수익 추구

**APY vs APR:**
- **APR**: 단순 이율 (100% APR = 1년 후 원금의 2배)
- **APY**: 복리 이율 (이자에 이자가 붙음, 실제 수익 더 높음)

**높은 APY의 함정:**
1,000% APY를 보면 혹하지만, 보상 토큰의 가격이 폭락하면 실제 수익은 마이너스야. 보상 토큰이 가치가 있는지 먼저 확인해야 해.

**리스크:** 스마트 컨트랙트 해킹, 비영구적 손실, 토큰 가격 하락, 러그풀`,
    category: '디파이',
    relatedTermSlugs: ['defi', 'liquidity-pool', 'staking', 'impermanent-loss'],
    relatedQuestIds: [8, 9],
  },
  {
    slug: 'staking',
    titleKo: '스테이킹',
    titleEn: 'Staking',
    shortDef: '코인을 네트워크에 예치하여 블록 검증에 참여하고 보상을 받는 것.',
    explanation: `스테이킹(Staking)은 지분증명(PoS) 블록체인에서 코인을 "맡기고" 네트워크 검증에 참여하며 보상을 받는 것이야.

**왜 보상을 줄까?**
PoS 블록체인은 스테이커들이 거래를 검증해. 검증 대가로 새로 발행되는 코인을 보상으로 줘. 은행 예금 이자랑 비슷한 개념이야.

**스테이킹 방법:**
1. **직접 스테이킹**: 32 ETH로 이더리움 검증자 운영 (진입장벽 높음)
2. **리퀴드 스테이킹**: Lido에 ETH를 넣으면 stETH를 받음 (소액 가능)
3. **거래소 스테이킹**: 업비트, 바이낸스에서 간편 스테이킹

**리퀴드 스테이킹의 장점:**
일반 스테이킹은 락업(잠금) 기간이 있지만, 리퀴드 스테이킹은 stETH 같은 토큰을 받아서 DeFi에서 추가 활용 가능.

**주요 스테이킹 코인:**
- ETH: 연 3~4%
- SOL: 연 6~8%
- ATOM: 연 15~20%
- DOT: 연 12~15%`,
    category: '디파이',
    relatedTermSlugs: ['defi', 'yield-farming', 'ethereum', 'smart-contract'],
    relatedQuestIds: [6, 9],
  },
  {
    slug: 'impermanent-loss',
    titleKo: '비영구적 손실',
    titleEn: 'Impermanent Loss',
    shortDef: '유동성 풀에서 토큰 가격 변동으로 발생하는 잠재적 손실.',
    explanation: `비영구적 손실(Impermanent Loss, IL)은 유동성 풀에 넣은 토큰의 가격이 변할 때 발생하는 손실이야.

**쉬운 예시:**
1. ETH = $1,000일 때, $1,000 ETH + $1,000 USDC를 풀에 넣음
2. ETH가 $2,000으로 2배 오름
3. 풀에서 빼면: ~$1,414 ETH + ~$1,414 USDC = $2,828
4. 그냥 들고 있었으면: $2,000 ETH + $1,000 USDC = $3,000
5. 차이 $172 = 비영구적 손실 (약 5.7%)

**왜 "비영구적"일까?**
가격이 원래대로 돌아오면 손실도 사라지기 때문이야. 하지만 빼는 시점에 가격이 달라져 있으면 "영구적" 손실이 돼.

**비영구적 손실 줄이는 법:**
- 스테이블코인 쌍 사용 (USDT/USDC): 가격 변동 거의 없음
- 상관관계 높은 쌍 (ETH/stETH): 비슷하게 움직임
- 거래 수수료 수익이 IL보다 큰 풀 선택`,
    category: '디파이',
    relatedTermSlugs: ['liquidity-pool', 'dex', 'yield-farming', 'stablecoin'],
    relatedQuestIds: [8],
  },

  // ===== 온체인 (5) =====
  {
    slug: 'wallet',
    titleKo: '지갑',
    titleEn: 'Crypto Wallet',
    shortDef: '암호화폐를 보관하고 송금하는 소프트웨어 또는 하드웨어.',
    explanation: `크립토 지갑은 암호화폐를 보관하고, 보내고, 받을 수 있게 해주는 도구야. 실제로 코인이 지갑 "안"에 있는 건 아니고, 블록체인의 코인에 접근할 수 있는 "열쇠"를 보관해.

**지갑의 종류:**
1. **핫월렛 (인터넷 연결)**
   - 메타마스크(MetaMask): 이더리움 + EVM 체인
   - 팬텀(Phantom): 솔라나 + 이더리움
   - 거래소 지갑: 업비트, 바이낸스 앱 내 지갑

2. **콜드월렛 (오프라인)**
   - 레저(Ledger): USB 하드웨어 지갑
   - 트레저(Trezor): USB 하드웨어 지갑
   - 종이 지갑: 프라이빗 키를 종이에 적어 보관

**핫월렛 vs 콜드월렛:**
- 핫월렛: 편리하지만 해킹 위험
- 콜드월렛: 불편하지만 매우 안전

**꿀팁:** 거래용은 핫월렛, 장기 보관은 콜드월렛으로 나눠서 관리하는 게 가장 안전해.`,
    category: '온체인',
    relatedTermSlugs: ['private-key', 'seed-phrase', 'gas-fee', 'smart-contract'],
    relatedQuestIds: [2, 3],
  },
  {
    slug: 'gas-fee',
    titleKo: '가스비',
    titleEn: 'Gas Fee',
    shortDef: '블록체인에서 트랜잭션을 실행할 때 내는 수수료.',
    explanation: `가스비(Gas Fee)는 블록체인 네트워크에서 거래나 스마트 컨트랙트를 실행할 때 내야 하는 수수료야.

**왜 가스비가 있을까?**
- 네트워크를 유지하는 검증자(노드)에게 보상을 주기 위해
- 스팸 트랜잭션을 방지하기 위해

**가스비가 결정되는 요소:**
1. **네트워크 혼잡도**: 사용자가 많으면 비싸짐
2. **트랜잭션 복잡도**: 단순 전송 < 토큰 스왑 < NFT 민팅
3. **가스 가격(Gwei)**: 사용자가 더 높은 가격을 제시하면 빨리 처리됨

**체인별 가스비 비교:**
- 이더리움: $1~$50+ (비쌈, 혼잡할 때 $100 이상)
- 솔라나: $0.001 미만 (거의 무료)
- 아비트럼/옵티미즘: $0.01~$0.50 (이더리움 L2)

**가스비 절약 팁:**
- 한국시간 새벽이 가장 저렴 (미국이 자는 시간)
- L2 네트워크 활용
- etherscan.io/gastracker에서 실시간 확인`,
    category: '온체인',
    relatedTermSlugs: ['ethereum', 'smart-contract', 'layer2', 'wallet'],
    relatedQuestIds: [3, 5],
  },
  {
    slug: 'smart-contract',
    titleKo: '스마트 컨트랙트',
    titleEn: 'Smart Contract',
    shortDef: '조건이 충족되면 자동으로 실행되는 블록체인 위의 프로그램.',
    explanation: `스마트 컨트랙트는 "만약 A 조건이 충족되면 B를 실행해라"라는 규칙을 코드로 작성해 블록체인에 올린 프로그램이야.

**현실 세계 비유:**
자판기를 생각해봐. 동전을 넣으면(조건) 음료가 나와(실행). 사람이 개입할 필요 없이 자동으로 처리되지. 스마트 컨트랙트도 마찬가지야.

**활용 사례:**
- **DeFi**: 대출 조건 충족 시 자동 실행/청산
- **NFT**: 민팅, 거래, 로열티 자동 분배
- **DAO**: 투표 결과에 따라 자금 자동 집행
- **보험**: 조건 충족 시 자동 보상금 지급

**장점:**
- 중개인 불필요 (비용 절감)
- 24/7 자동 실행
- 투명하고 검증 가능

**위험:**
코드에 버그가 있으면 해킹당할 수 있어. 2016년 The DAO 해킹 ($60M 도난)이 대표적인 사례야. 그래서 감사(Audit)가 중요해.`,
    category: '온체인',
    relatedTermSlugs: ['ethereum', 'defi', 'gas-fee', 'token'],
    relatedQuestIds: [5, 10],
  },
  {
    slug: 'layer2',
    titleKo: '레이어 2',
    titleEn: 'Layer 2',
    shortDef: '메인 블록체인 위에 구축된 확장 솔루션으로 속도를 높이고 비용을 줄임.',
    explanation: `레이어 2(L2)는 이더리움 같은 메인 블록체인(L1) 위에 만들어진 확장 솔루션이야. L1의 보안은 유지하면서 더 빠르고 저렴하게 거래할 수 있어.

**왜 필요할까?**
이더리움은 초당 ~15건 거래만 처리 가능. 사용자가 늘면 가스비가 폭등해. L2는 거래를 모아서 한꺼번에 L1에 기록하므로 비용을 획기적으로 줄여.

**주요 L2 종류:**
1. **롤업(Rollup)**: 거래를 묶어서 L1에 제출
   - Optimistic Rollup: Optimism, Arbitrum, Base
   - ZK Rollup: zkSync, StarkNet, Linea
2. **사이드체인**: 독립적으로 운영, L1과 브릿지로 연결 (Polygon PoS)

**L2 비교:**
- **Arbitrum**: TVL 1위, DeFi 생태계 풍부
- **Base**: 코인베이스 지원, 빠르게 성장
- **Optimism**: OP Stack으로 슈퍼체인 구축 중
- **zkSync**: ZK 기술로 빠른 완결성

**L2 사용법:** 메인넷에서 L2로 브릿지하면 됨.`,
    category: '온체인',
    relatedTermSlugs: ['ethereum', 'gas-fee', 'bridge', 'smart-contract'],
    relatedQuestIds: [5, 10],
  },
  {
    slug: 'bridge',
    titleKo: '브릿지',
    titleEn: 'Bridge',
    shortDef: '서로 다른 블록체인 간에 자산을 이동시키는 프로토콜.',
    explanation: `브릿지(Bridge)는 이더리움에 있는 ETH를 아비트럼으로 옮기거나, 솔라나의 SOL을 이더리움으로 옮길 때 사용하는 프로토콜이야.

**왜 필요할까?**
각 블록체인은 독립적이라 직접 자산을 주고받을 수 없어. 브릿지가 "다리" 역할을 해서 체인 간 이동을 가능하게 해.

**작동 원리:**
1. A 체인에서 코인을 브릿지 컨트랙트에 보냄 (잠금)
2. B 체인에서 동일한 양의 래핑된(Wrapped) 토큰 발행
3. 돌아갈 때는 반대로 (B에서 소각 → A에서 잠금 해제)

**대표 브릿지:**
- **공식 브릿지**: 각 L2가 운영 (안전하지만 느릴 수 있음)
- **LayerZero/Wormhole**: 멀티체인 브릿지
- **Synapse/Stargate**: 빠른 크로스체인 스왑

**보안 주의:**
브릿지는 해킹의 주요 타깃이야. Ronin Bridge ($625M), Wormhole ($320M), Nomad ($190M) 등 대형 해킹이 있었어. 가능하면 공식 브릿지를 사용하고, 한 번에 큰 금액을 옮기지 마.`,
    category: '온체인',
    relatedTermSlugs: ['layer2', 'ethereum', 'wallet', 'smart-contract'],
    relatedQuestIds: [10],
  },

  // ===== 보안 (3) =====
  {
    slug: 'seed-phrase',
    titleKo: '시드 구문',
    titleEn: 'Seed Phrase (Recovery Phrase)',
    shortDef: '지갑을 복구할 수 있는 12~24개의 영단어 조합.',
    explanation: `시드 구문(Seed Phrase)은 크립토 지갑을 만들 때 생성되는 12~24개의 영어 단어 조합이야. 이 단어들이 네 지갑의 모든 것이라고 생각하면 돼.

**시드 구문의 역할:**
- 지갑 복구: 폰을 잃어버려도 시드 구문만 있으면 다른 기기에서 복구 가능
- 마스터 키: 하나의 시드에서 여러 개의 주소와 프라이빗 키 생성

**절대 하면 안 되는 것:**
- 온라인에 저장 (메모장, 카카오톡, 이메일, 클라우드)
- 캡처하거나 사진 찍기
- 누구에게든 공유하기
- DM으로 "지원팀"이라며 시드 구문을 요구하면 100% 사기

**안전한 보관법:**
1. 종이에 적어서 방수 봉투에 넣기
2. 금속 백업 플레이트에 각인 (화재 대비)
3. 2개 이상 다른 장소에 보관
4. 가까운 사람에게 보관 위치만 알려두기

**기억해:** "Not your keys, not your coins" - 시드 구문을 잃으면 코인도 영원히 잃는 거야.`,
    category: '보안',
    relatedTermSlugs: ['private-key', 'wallet', 'rug-pull'],
    relatedQuestIds: [2, 3],
  },
  {
    slug: 'private-key',
    titleKo: '프라이빗 키',
    titleEn: 'Private Key',
    shortDef: '암호화폐를 전송할 수 있는 비밀 암호. 절대 공유하면 안 됨.',
    explanation: `프라이빗 키(Private Key)는 네 지갑의 "비밀번호"야. 이걸 가진 사람이 코인의 주인이야.

**프라이빗 키 vs 퍼블릭 키:**
- **퍼블릭 키/주소**: 계좌번호 같은 것. 남에게 공유 OK (코인 받을 때)
- **프라이빗 키**: 비밀번호. 절대 비공개 (코인 보낼 때 필요)

**비유:**
이메일 주소 = 퍼블릭 키 (누구에게나 알려줘도 됨)
이메일 비밀번호 = 프라이빗 키 (절대 알려주면 안 됨)

**프라이빗 키의 형태:**
64자리 16진수 문자열이야.
예: 0x1a2b3c4d....(실제로는 훨씬 길어)

**시드 구문과의 관계:**
시드 구문 하나에서 수많은 프라이빗 키가 생성돼. 시드 구문이 마스터 키라면, 프라이빗 키는 각 방의 열쇠인 셈이야.

**보안 수칙:**
1. 프라이빗 키를 절대 공유하지 마
2. 피싱 사이트 주의 (URL 항상 확인)
3. 의심스러운 트랜잭션 서명 거부
4. 하드웨어 지갑 사용 권장`,
    category: '보안',
    relatedTermSlugs: ['seed-phrase', 'wallet', 'smart-contract'],
    relatedQuestIds: [2, 3],
  },
  {
    slug: 'rug-pull',
    titleKo: '러그풀',
    titleEn: 'Rug Pull',
    shortDef: '개발팀이 투자금을 들고 도망치는 크립토 사기 유형.',
    explanation: `러그풀(Rug Pull)은 말 그대로 "발밑의 양탄자를 당겨 넘어뜨리는 것"이야. 개발팀이 프로젝트를 만들고, 투자를 받은 뒤, 자금을 들고 사라지는 사기야.

**러그풀의 유형:**
1. **유동성 탈취**: DEX 유동성 풀에서 자금을 갑자기 빼감
2. **판매 제한**: 사용자가 팔 수 없게 코드에 장치를 숨겨놓음
3. **서서히 매도**: 팀이 보유한 토큰을 조금씩 팔아서 가격 하락

**러그풀 경고 신호:**
- 팀이 익명이거나 소셜미디어만 있음
- 백서가 없거나 내용이 빈약함
- "100배 확정" 같은 비현실적 약속
- 스마트 컨트랙트가 감사(Audit)되지 않음
- 유동성이 잠겨있지 않음 (Lock 안 됨)
- 토큰 분배에서 팀 지분이 과도함 (30% 이상)

**자기 방어법:**
1. 팀 확인 (실명, LinkedIn, 이전 프로젝트)
2. 감사 보고서 확인 (CertiK, SlowMist 등)
3. 유동성 잠금 확인 (Lock 기간)
4. 커뮤니티 활동 확인
5. 새 프로젝트에 큰 돈 넣지 않기`,
    category: '보안',
    relatedTermSlugs: ['whitepaper', 'seed-phrase', 'smart-contract', 'defi'],
    relatedQuestIds: [9, 10],
  },

  // ===== NFT (3) =====
  {
    slug: 'nft',
    titleKo: 'NFT',
    titleEn: 'NFT (Non-Fungible Token)',
    shortDef: '블록체인에 기록된 고유한 디지털 소유권 증명서.',
    explanation: `NFT(Non-Fungible Token)는 "대체 불가능한 토큰"이야. 각 NFT는 고유해서 다른 것으로 대체할 수 없어.

**대체 가능 vs 대체 불가능:**
- 1만 원짜리 지폐 → 다른 1만 원짜리와 교환 가능 (대체 가능 = Fungible)
- 모나리자 원본 → 다른 그림으로 대체 불가 (대체 불가능 = Non-Fungible)

**NFT의 활용:**
- **디지털 아트**: Beeple의 작품이 $69M에 팔림
- **프로필 사진(PFP)**: Bored Ape Yacht Club, CryptoPunks
- **게임 아이템**: 게임 내 캐릭터, 무기, 땅
- **멤버십**: NFT 보유자에게 특별 혜택
- **음악/영상**: 아티스트가 직접 팬에게 판매

**NFT의 현실:**
2021-2022년 NFT 열풍은 식었어. 대부분의 NFT 컬렉션은 가치가 99% 이상 하락했지. 하지만 기술 자체는 디지털 소유권 증명에 여전히 유용해.

**NFT 표준:** ERC-721(단일), ERC-1155(다중)`,
    category: 'NFT',
    relatedTermSlugs: ['ethereum', 'smart-contract', 'mint', 'floor-price'],
    relatedQuestIds: [9],
  },
  {
    slug: 'mint',
    titleKo: '민팅',
    titleEn: 'Minting',
    shortDef: 'NFT를 처음 생성하여 블록체인에 기록하는 과정.',
    explanation: `민팅(Minting)은 NFT를 처음으로 블록체인에 만드는 과정이야. "주조하다"라는 뜻에서 온 말이야.

**민팅 과정:**
1. 아티스트가 작품을 디지털 파일로 준비
2. NFT 마켓플레이스(OpenSea 등)에서 민팅 실행
3. 스마트 컨트랙트가 블록체인에 고유한 토큰 생성
4. 가스비 지불 → NFT 완성!

**민팅 비용:**
- 이더리움: $5~$100+ (가스비에 따라)
- 솔라나: $0.01 미만
- Base/Zora: $0.01 미만

**프리민트(Free Mint):**
최근에는 무료로 민팅할 수 있는 프로젝트가 많아. 가스비만 내면 NFT를 받을 수 있어. 화이트리스트(WL)에 들어가면 프리민트 기회를 얻을 수 있지.

**주의사항:**
- 피싱 민팅 사이트 조심 (공식 링크인지 확인)
- "숨겨진 민트"는 지갑 권한을 탈취할 수 있어
- 민팅 후 바로 바닥가 아래로 떨어지는 경우 많음`,
    category: 'NFT',
    relatedTermSlugs: ['nft', 'floor-price', 'gas-fee', 'smart-contract'],
    relatedQuestIds: [9],
  },
  {
    slug: 'floor-price',
    titleKo: '바닥가',
    titleEn: 'Floor Price',
    shortDef: 'NFT 컬렉션에서 가장 저렴하게 살 수 있는 가격.',
    explanation: `바닥가(Floor Price)는 특정 NFT 컬렉션에서 현재 판매 중인 것 중 가장 낮은 가격이야.

**왜 중요할까?**
바닥가는 그 컬렉션의 "최소 입장료"야. 컬렉션의 전반적인 인기와 가치를 나타내는 핵심 지표지.

**바닥가 변동 요인:**
- **상승**: 유명인이 구매, 새로운 유틸리티 발표, 시장 호황
- **하락**: 보유자들이 투매, 프로젝트 실망, 시장 침체

**대표 컬렉션 바닥가 예시 (변동됨):**
- CryptoPunks: ~50 ETH
- Bored Ape Yacht Club: ~10 ETH
- Azuki: ~5 ETH
- Pudgy Penguins: ~10 ETH

**바닥가 추적 방법:**
- OpenSea, Blur, Magic Eden에서 실시간 확인
- NFT Price Floor(nftpricefloor.com)에서 역사적 추이

**투자 팁:**
"바닥가가 싸니까 사자"는 위험한 생각이야. 바닥가가 0.01 ETH인 컬렉션 대부분은 거래량이 없어서 팔 수도 없어. 유동성을 반드시 확인해.`,
    category: 'NFT',
    relatedTermSlugs: ['nft', 'mint', 'volume'],
    relatedQuestIds: [9],
  },
];

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.category === category);
}

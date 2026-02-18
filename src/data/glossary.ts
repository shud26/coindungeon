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
  // ===== 추가 용어 (28개) =====

  // -- 기초 추가 (+4) --
  {
    slug: 'mining',
    titleKo: '채굴',
    titleEn: 'Mining',
    shortDef: '컴퓨터 연산으로 블록체인의 거래를 검증하고 새 코인을 받는 과정.',
    explanation: `채굴(Mining)은 작업증명(PoW) 블록체인에서 복잡한 수학 문제를 풀어 거래를 검증하고, 보상으로 새 코인을 받는 과정이야.

**채굴의 원리:**
1. 전 세계 채굴자들이 같은 수학 문제를 풀기 위해 경쟁
2. 가장 먼저 푼 채굴자가 블록을 생성
3. 보상으로 새 코인 + 거래 수수료를 받음

**채굴 장비의 변화:**
- 2009~2010: CPU (일반 컴퓨터)
- 2011~2012: GPU (그래픽카드)
- 2013~현재: ASIC (전용 채굴기)

**채굴이 돈이 될까?**
전기세, 장비비, 냉각 비용을 고려해야 해. 비트코인 채굴은 이미 대형 채굴 공장이 독점하고 있어서 개인은 수익 내기 어려워.

**PoW vs PoS:**
이더리움은 2022년에 PoW에서 PoS(지분증명)로 전환했어. PoS는 채굴 대신 코인을 맡기고(스테이킹) 검증하는 방식이라 전기를 거의 안 써.`,
    category: '기초',
    relatedTermSlugs: ['bitcoin', 'blockchain', 'halving', 'staking'],
    relatedQuestIds: [1],
  },
  {
    slug: 'consensus',
    titleKo: '합의 메커니즘',
    titleEn: 'Consensus Mechanism',
    shortDef: '블록체인 참여자들이 거래의 유효성에 동의하는 방법.',
    explanation: `합의 메커니즘은 "이 거래가 진짜인가?"를 네트워크 참여자들이 함께 확인하고 동의하는 규칙이야.

**주요 합의 메커니즘:**

**1. 작업증명 (PoW - Proof of Work)**
- 사용: 비트코인
- 방식: 복잡한 계산을 풀어야 블록 생성 가능
- 장점: 가장 검증된 보안
- 단점: 전기 소모 엄청남

**2. 지분증명 (PoS - Proof of Stake)**
- 사용: 이더리움, 솔라나, 카르다노
- 방식: 코인을 맡기고(스테이킹) 검증에 참여
- 장점: 에너지 효율적
- 단점: "부익부 빈익빈" 구조

**3. 위임지분증명 (DPoS)**
- 사용: EOS, TRON
- 방식: 투표로 대표 검증자를 선출
- 장점: 빠른 처리 속도
- 단점: 중앙화 우려

**왜 중요할까?**
합의 메커니즘이 블록체인의 보안, 속도, 탈중앙성을 결정해. "블록체인 트릴레마"라고, 보안/속도/탈중앙 중 세 가지를 동시에 완벽하게 달성하기 어려워.`,
    category: '기초',
    relatedTermSlugs: ['blockchain', 'mining', 'staking', 'bitcoin', 'ethereum'],
    relatedQuestIds: [1, 5],
  },
  {
    slug: 'dapp',
    titleKo: '디앱',
    titleEn: 'dApp (Decentralized Application)',
    shortDef: '블록체인 위에서 스마트 컨트랙트로 작동하는 탈중앙 애플리케이션.',
    explanation: `디앱(dApp)은 일반 앱처럼 보이지만 뒷단이 블록체인과 스마트 컨트랙트로 작동하는 애플리케이션이야.

**일반 앱 vs 디앱:**
- 인스타그램 → 메타 서버에서 운영 (중앙화)
- 유니스왑 → 이더리움 블록체인에서 운영 (탈중앙)

**디앱의 특징:**
- 누구나 코드를 볼 수 있음 (오픈소스)
- 한 번 배포하면 누구도 중단 불가
- 지갑 연결만으로 사용 (회원가입 불필요)

**디앱의 종류:**
- **DeFi**: Uniswap, Aave, Curve
- **NFT 마켓**: OpenSea, Blur
- **게임**: Axie Infinity, StepN
- **소셜**: Lens Protocol, Farcaster
- **DAO 도구**: Snapshot, Tally

**디앱 사용법:**
1. 메타마스크 같은 지갑 설치
2. 디앱 웹사이트 접속
3. "지갑 연결(Connect Wallet)" 클릭
4. 트랜잭션 서명 → 완료!

**주의:** 피싱 사이트가 많아. 공식 URL을 반드시 확인해.`,
    category: '기초',
    relatedTermSlugs: ['smart-contract', 'defi', 'wallet', 'ethereum'],
    relatedQuestIds: [5, 7],
  },
  {
    slug: 'web3',
    titleKo: '웹3',
    titleEn: 'Web3',
    shortDef: '블록체인 기반의 탈중앙 인터넷. 사용자가 데이터를 소유하는 차세대 웹.',
    explanation: `웹3(Web3)는 블록체인 기술을 기반으로 한 차세대 인터넷 비전이야.

**웹의 진화:**
- **Web1 (1990s~2000s)**: 읽기만 가능. 정적 웹페이지. 신문처럼 보기만 함.
- **Web2 (2000s~현재)**: 읽기+쓰기. 소셜미디어, 유튜브. 근데 데이터는 빅테크가 소유.
- **Web3 (현재~미래)**: 읽기+쓰기+소유. 블록체인으로 사용자가 직접 데이터와 자산을 소유.

**Web3의 핵심 가치:**
- **소유권**: 내 데이터, 내 자산, 내 아이덴티티를 직접 관리
- **탈중앙**: 구글이나 메타 없이도 서비스 운영
- **투명성**: 규칙이 코드로 공개됨

**Web3 인프라:**
- 블록체인: 이더리움, 솔라나
- 스토리지: IPFS, Arweave (탈중앙 저장소)
- 아이덴티티: ENS (.eth 도메인)
- 지갑: MetaMask, Phantom

**현실적 시각:**
아직 UX가 어렵고, 속도가 느리고, 사기도 많아. 하지만 기술은 빠르게 발전 중이야.`,
    category: '기초',
    relatedTermSlugs: ['blockchain', 'dapp', 'defi', 'nft', 'smart-contract'],
    relatedQuestIds: [1, 10],
  },

  // -- 트레이딩 추가 (+6) --
  {
    slug: 'long-short',
    titleKo: '롱/숏',
    titleEn: 'Long / Short',
    shortDef: '롱은 가격 상승에 베팅, 숏은 가격 하락에 베팅하는 포지션.',
    explanation: `롱(Long)과 숏(Short)은 트레이딩의 가장 기본적인 방향성이야.

**롱 (Long) = 가격 상승 베팅:**
- BTC를 $100,000에 롱 → $110,000이 되면 10% 수익
- "매수(Buy)" 한 뒤 나중에 더 비싸게 팔기

**숏 (Short) = 가격 하락 베팅:**
- BTC를 $100,000에 숏 → $90,000이 되면 10% 수익
- 빌려서 팔고, 나중에 더 싸게 사서 갚기

**레버리지와 결합:**
- 10x 롱: 1% 상승 → 10% 수익, 10% 하락 → 청산
- 10x 숏: 1% 하락 → 10% 수익, 10% 상승 → 청산

**펀딩비:**
선물 거래소에서 롱/숏 비율의 균형을 맞추기 위해 펀딩비가 존재해. 롱이 많으면 롱이 숏에게, 숏이 많으면 숏이 롱에게 수수료를 내.

**초보자 조언:**
처음에는 현물(Spot) 매수만 해. 숏과 레버리지는 경험이 쌓인 후에. 통계적으로 숏 포지션의 손실이 더 큰 경우가 많아.`,
    category: '트레이딩',
    relatedTermSlugs: ['leverage', 'liquidation', 'funding-rate', 'order-book'],
    relatedQuestIds: [4],
  },
  {
    slug: 'funding-rate',
    titleKo: '펀딩비',
    titleEn: 'Funding Rate',
    shortDef: '무기한 선물에서 롱/숏 비율 균형을 위해 주기적으로 교환하는 수수료.',
    explanation: `펀딩비(Funding Rate)는 무기한 선물(Perpetual Futures) 거래에서 롱과 숏 포지션 간에 주기적으로 교환하는 수수료야.

**왜 존재할까?**
무기한 선물은 만기가 없어서, 가격이 현물과 괴리될 수 있어. 펀딩비가 이 괴리를 줄여주는 역할을 해.

**펀딩비 규칙:**
- **펀딩비 양수(+)**: 롱이 숏에게 지불 → 시장이 과열 (롱 많음)
- **펀딩비 음수(-)**: 숏이 롱에게 지불 → 시장이 공포 (숏 많음)

**정산 주기:**
- 대부분 거래소: 8시간마다 (하루 3번)
- 일부 거래소: 1시간~4시간마다 (코인별 다름)

**펀딩비 차익거래:**
두 거래소의 펀딩비 차이를 이용해 수익을 내는 전략이 있어. 예: A거래소에서 롱, B거래소에서 숏 → 가격 변동 리스크 0 + 펀딩비 스프레드 수익.

**실전 팁:**
펀딩비가 극단적으로 높으면(+0.1% 이상) 반대 포지션이 유리할 수 있어. 시장 과열 신호이기도 하거든.`,
    category: '트레이딩',
    relatedTermSlugs: ['long-short', 'leverage', 'liquidation', 'slippage'],
    relatedQuestIds: [4],
  },
  {
    slug: 'liquidation',
    titleKo: '청산',
    titleEn: 'Liquidation',
    shortDef: '레버리지 포지션의 손실이 증거금을 초과하면 거래소가 강제로 포지션을 닫는 것.',
    explanation: `청산(Liquidation)은 레버리지 거래에서 손실이 너무 커지면 거래소가 강제로 포지션을 종료하는 거야.

**청산이 일어나는 과정:**
1. $100으로 10x 레버리지 롱 포지션 오픈 ($1,000어치)
2. 가격이 10% 하락 → $100 손실 (증거금 전액)
3. 거래소가 자동으로 포지션 닫음 → 증거금 $100 전액 손실

**청산 가격:**
레버리지가 높을수록 청산 가격이 현재 가격에 가까워:
- 2x: 약 50% 하락 시 청산
- 5x: 약 20% 하락 시 청산
- 10x: 약 10% 하락 시 청산
- 100x: 약 1% 하락 시 청산

**연쇄 청산(Cascade Liquidation):**
대량 청산이 발생하면 가격이 더 떨어지고, 그게 또 청산을 유발하는 악순환이 생겨. 크립토 시장의 급락 대부분이 이 메커니즘 때문이야.

**자기 방어:**
1. 낮은 레버리지 사용 (2~3x)
2. 반드시 스탑로스 설정
3. 전체 자산의 일부만 증거금으로 사용`,
    category: '트레이딩',
    relatedTermSlugs: ['leverage', 'long-short', 'funding-rate'],
    relatedQuestIds: [4],
  },
  {
    slug: 'dca',
    titleKo: '분할 매수',
    titleEn: 'DCA (Dollar Cost Averaging)',
    shortDef: '정기적으로 일정 금액씩 나눠서 투자하는 전략.',
    explanation: `DCA(Dollar Cost Averaging)는 한 번에 몰빵하지 않고, 정해진 금액을 정기적으로 나눠서 투자하는 전략이야.

**예시:**
BTC에 120만 원을 투자하고 싶을 때:
- 몰빵: 1월에 120만 원 한 번에 매수
- DCA: 매달 10만 원씩 12개월에 걸쳐 매수

**DCA의 장점:**
- 타이밍 고민 안 해도 됨 (저점을 맞추려는 스트레스 없음)
- 고점에 올인하는 위험 방지
- 하락장에서 평균 매수가 낮아짐
- 감정적 판단 배제

**DCA의 단점:**
- 계속 오르는 시장에서는 몰빵보다 수익이 낮을 수 있음
- 수수료가 여러 번 발생

**실전 DCA 전략:**
1. 매주 또는 매달 고정 금액 설정
2. 가격과 상관없이 기계적으로 매수
3. 최소 6개월~1년 이상 유지
4. 무리하지 않는 금액으로 (생활비에 영향 없게)

**통계적 사실:** 장기적으로 DCA는 대부분의 개인 투자자가 시장 타이밍을 맞추려는 것보다 나은 결과를 보여줘.`,
    category: '트레이딩',
    relatedTermSlugs: ['bitcoin', 'market-cap', 'volume'],
    relatedQuestIds: [2, 4],
  },
  {
    slug: 'fomo',
    titleKo: 'FOMO',
    titleEn: 'FOMO (Fear Of Missing Out)',
    shortDef: '놓치면 안 될 것 같은 두려움으로 충동적으로 투자하는 심리.',
    explanation: `FOMO는 "Fear Of Missing Out"의 약자로, "나만 뒤처지는 것 같은 두려움"이야.

**크립토에서 FOMO:**
- 비트코인이 하루에 20% 올랐다는 뉴스를 봄
- "지금 안 사면 더 올라갈 것 같아..."
- 고점에서 매수 → 하락 → 손실

**FOMO의 반대: FUD**
- FUD = Fear, Uncertainty, Doubt (공포, 불확실, 의심)
- 나쁜 뉴스에 공포 매도하는 것

**FOMO가 위험한 이유:**
1. 감정적 판단 → 비싼 가격에 매수
2. 리서치 없이 충동 투자
3. 손실 후 복구하려고 더 큰 금액 투자 (틸트)

**FOMO 극복법:**
- "지금 안 사도 기회는 또 온다" 되뇌기
- 미리 정해둔 투자 계획 따르기 (DCA)
- 소셜미디어의 수익 자랑글 필터링
- 잃어도 되는 금액만 투자
- 포지션 사이즈를 작게 유지

**명언:** "시장은 참을성 없는 사람의 돈을 참을성 있는 사람에게 이전하는 장치다." - 워렌 버핏`,
    category: '트레이딩',
    relatedTermSlugs: ['dca', 'whale', 'volume', 'leverage'],
    relatedQuestIds: [4],
  },
  {
    slug: 'whale',
    titleKo: '고래',
    titleEn: 'Whale',
    shortDef: '대량의 암호화폐를 보유하여 시장에 큰 영향을 줄 수 있는 투자자.',
    explanation: `고래(Whale)는 엄청난 양의 크립토를 보유한 개인이나 기관을 뜻해. 이들의 움직임은 시장 전체에 영향을 줄 수 있어.

**고래의 기준 (대략적):**
- 비트코인: 1,000 BTC 이상 (~$1억)
- 이더리움: 10,000 ETH 이상
- 알트코인: 전체 공급량의 1% 이상

**고래의 행동 패턴:**
- **축적(Accumulation)**: 가격이 낮을 때 조용히 매수 → 곧 상승 신호일 수 있음
- **분배(Distribution)**: 가격이 높을 때 조금씩 매도 → 하락 신호
- **덤핑**: 한꺼번에 대량 매도 → 가격 급락

**고래 추적 방법:**
- Whale Alert (텔레그램 봇): 대량 거래 알림
- Etherscan/Solscan: 지갑 주소 직접 모니터링
- Arkham, Nansen: 온체인 분석 플랫폼

**고래 움직임을 활용하려면:**
1. 거래소로 대량 입금 = 매도 준비 (하락 가능)
2. 거래소에서 대량 출금 = 장기 보유 의지 (상승 가능)
3. 단, 고래 한 마리의 행동만으로 판단하면 위험해`,
    category: '트레이딩',
    relatedTermSlugs: ['volume', 'market-cap', 'order-book', 'fomo'],
    relatedQuestIds: [4, 10],
  },

  // -- 디파이 추가 (+5) --
  {
    slug: 'tvl',
    titleKo: 'TVL',
    titleEn: 'TVL (Total Value Locked)',
    shortDef: 'DeFi 프로토콜에 예치된 총 자산 가치.',
    explanation: `TVL(Total Value Locked)은 DeFi 프로토콜에 잠겨있는(예치된) 자산의 총 달러 가치야.

**왜 중요할까?**
TVL은 DeFi 프로토콜의 인기와 신뢰도를 나타내는 핵심 지표야. TVL이 높을수록 많은 사람이 자금을 맡기고 있다는 뜻이지.

**TVL 확인 방법:**
- DefiLlama (defillama.com): DeFi TVL 종합 대시보드
- 체인별, 프로토콜별 TVL 확인 가능

**TVL 해석 주의:**
- TVL이 높다고 무조건 안전한 건 아님
- 토큰 가격이 오르면 TVL도 자동으로 올라감 (착시)
- 하나의 예치금이 여러 프로토콜에서 중복 카운트될 수 있음

**TVL 대비 시가총액:**
TVL/시총 비율이 1 이상이면 저평가, 1 미만이면 고평가라고 보는 시각도 있어. 물론 이것만으로 판단하면 안 되지만 참고 지표로 쓸 수 있어.`,
    category: '디파이',
    relatedTermSlugs: ['defi', 'liquidity-pool', 'staking', 'yield-farming'],
    relatedQuestIds: [6, 7],
  },
  {
    slug: 'oracle',
    titleKo: '오라클',
    titleEn: 'Oracle',
    shortDef: '블록체인 외부의 데이터를 스마트 컨트랙트에 전달하는 서비스.',
    explanation: `오라클(Oracle)은 블록체인 밖의 실세계 데이터를 스마트 컨트랙트에게 전달해주는 "다리" 역할을 해.

**왜 필요할까?**
스마트 컨트랙트는 블록체인 안의 데이터만 볼 수 있어. "BTC 가격이 얼마야?", "오늘 날씨가 어때?"를 직접 알 수 없거든. 오라클이 이 데이터를 가져다줘.

**오라클의 활용:**
- **DeFi 대출**: 담보 자산의 현재 가격 → 청산 여부 결정
- **보험**: 비행기 지연 데이터 → 자동 보상금 지급
- **예측 시장**: 스포츠 경기 결과 → 베팅금 정산
- **스테이블코인**: 환율 데이터 → 페그 유지

**대표 오라클:**
- **Chainlink (LINK)**: 시장 점유율 1위, 가장 많은 DeFi가 사용
- **Pyth Network**: 솔라나 생태계, 초고속 가격 피드
- **Band Protocol**: 크로스체인 오라클

**오라클 문제(Oracle Problem):**
오라클이 잘못된 가격을 전달하면? DeFi 전체가 오작동할 수 있어. 실제로 오라클 조작으로 수백만 달러가 탈취된 사례가 여러 번 있었어.`,
    category: '디파이',
    relatedTermSlugs: ['smart-contract', 'defi', 'lending', 'token'],
    relatedQuestIds: [5, 8],
  },
  {
    slug: 'flash-loan',
    titleKo: '플래시 론',
    titleEn: 'Flash Loan',
    shortDef: '담보 없이 빌려서 같은 트랜잭션 안에서 갚아야 하는 순간 대출.',
    explanation: `플래시 론(Flash Loan)은 담보 없이 수백만 달러를 빌릴 수 있는 DeFi만의 독특한 대출이야. 단, 같은 트랜잭션 안에서 반드시 갚아야 해.

**작동 원리:**
하나의 트랜잭션 안에서:
1. 수백만 달러를 빌림 (담보 없이)
2. 빌린 돈으로 원하는 작업 수행 (차익거래, 담보 교환 등)
3. 원금 + 수수료를 갚음
→ 이 모든 게 1초도 안 걸림 (하나의 블록 안에서 완료)

**못 갚으면?**
트랜잭션 전체가 취소돼. 빌린 적도, 거래한 적도 없었던 것처럼 돌아가. 프로토콜 입장에서 리스크 제로.

**합법적 활용:**
- 차익거래: 거래소 간 가격 차이 이용
- 담보 교환: 대출 포지션의 담보를 더 유리한 것으로 교체
- 자기 청산: 청산되기 전에 직접 정리

**악의적 활용:**
- 가격 조작: 오라클 가격을 일시적으로 왜곡
- 거버넌스 공격: 대량 토큰으로 투표 후 반환

플래시 론 공격으로 수백만 달러가 탈취된 사례가 있어. DeFi의 양날의 검이야.`,
    category: '디파이',
    relatedTermSlugs: ['defi', 'smart-contract', 'oracle', 'lending'],
    relatedQuestIds: [8, 10],
  },
  {
    slug: 'lending',
    titleKo: '렌딩',
    titleEn: 'Lending / Borrowing',
    shortDef: 'DeFi에서 크립토를 예치하고 이자를 받거나, 담보를 맡기고 대출받는 것.',
    explanation: `렌딩(Lending)은 DeFi의 핵심 서비스 중 하나야. 은행 없이 크립토를 빌려주고 이자를 받거나, 담보를 맡기고 다른 코인을 빌릴 수 있어.

**예치 (Supply/Lend):**
- ETH를 Aave에 예치 → 연 2~5% 이자 수익
- 은행 예금과 비슷하지만 중개자 없이 스마트 컨트랙트로 운영

**대출 (Borrow):**
- ETH를 담보로 맡기고 USDC를 빌림
- 담보가치의 70~80%까지 대출 가능
- ETH를 팔지 않고도 현금 확보 가능

**청산 리스크:**
담보 가치가 떨어지면 자동 청산돼. 예를 들어 ETH를 담보로 USDC를 빌렸는데 ETH 가격이 급락하면, 담보가 강제 매도되고 페널티까지 물어.

**대표 렌딩 프로토콜:**
- **Aave**: 멀티체인 최대 렌딩 프로토콜
- **Compound**: 이더리움 렌딩 선구자
- **MakerDAO**: DAI 스테이블코인 발행

**활용 전략:**
"루핑(Looping)": 예치 → 대출 → 다시 예치 → 다시 대출을 반복해서 레버리지를 올리는 전략. 수익도 커지지만 청산 리스크도 커져.`,
    category: '디파이',
    relatedTermSlugs: ['defi', 'staking', 'yield-farming', 'stablecoin', 'smart-contract'],
    relatedQuestIds: [6, 8],
  },
  {
    slug: 'restaking',
    titleKo: '리스테이킹',
    titleEn: 'Restaking',
    shortDef: '이미 스테이킹된 자산을 다른 프로토콜에 다시 스테이킹하여 추가 보상을 받는 것.',
    explanation: `리스테이킹(Restaking)은 이미 스테이킹한 자산(예: stETH)을 다른 서비스에 한 번 더 맡겨서 추가 보상을 받는 개념이야.

**기본 스테이킹 vs 리스테이킹:**
- 스테이킹: ETH → Lido → stETH (연 4%)
- 리스테이킹: stETH → EigenLayer → 추가 보상 (연 2~5% 추가)

**EigenLayer란?**
이더리움 리스테이킹의 선구자. 스테이킹된 ETH의 보안을 다른 서비스(오라클, 브릿지, 데이터 가용성 등)에도 빌려주는 프로토콜이야.

**리스테이킹의 장점:**
- 같은 ETH로 2중, 3중 수익
- 새로운 서비스들이 이더리움의 보안을 빌려 쓸 수 있음

**리스테이킹의 위험:**
- 슬래싱 리스크 중첩 (검증 실수 시 벌금이 여러 곳에서)
- 스마트 컨트랙트 리스크 누적
- 시스템 리스크: 한 곳의 문제가 연쇄적으로 퍼질 수 있음

**리퀴드 리스테이킹:**
EtherFi(eETH), Puffer(pufETH) 같은 프로토콜은 리스테이킹하면서도 토큰을 받아 DeFi에서 추가 활용할 수 있게 해줘.`,
    category: '디파이',
    relatedTermSlugs: ['staking', 'defi', 'ethereum', 'yield-farming'],
    relatedQuestIds: [6, 9],
  },

  // -- 온체인 추가 (+5) --
  {
    slug: 'block-explorer',
    titleKo: '블록 탐색기',
    titleEn: 'Block Explorer',
    shortDef: '블록체인의 모든 거래와 주소를 검색할 수 있는 웹사이트.',
    explanation: `블록 탐색기(Block Explorer)는 블록체인의 모든 데이터를 검색하고 확인할 수 있는 웹사이트야.

**뭘 볼 수 있나?**
- 특정 지갑 주소의 모든 거래 내역
- 트랜잭션의 상태 (성공/실패/대기중)
- 스마트 컨트랙트 코드와 활동
- 블록 생성 정보
- 토큰 보유량과 이동

**체인별 대표 블록 탐색기:**
- 이더리움: etherscan.io
- 솔라나: solscan.io
- 비트코인: blockchain.com/explorer
- 아비트럼: arbiscan.io
- 베이스: basescan.org

**활용법:**
1. **거래 확인**: 코인을 보냈는데 안 왔을 때 → TX Hash로 상태 확인
2. **지갑 검증**: 프로젝트 팀 지갑의 토큰 움직임 추적
3. **컨트랙트 확인**: 상호작용할 스마트 컨트랙트가 검증(verified)되었는지 확인
4. **토큰 승인 확인**: 내 지갑에 연결된 컨트랙트 목록 확인

블록 탐색기를 읽을 줄 알면 크립토 세상이 투명하게 보여.`,
    category: '온체인',
    relatedTermSlugs: ['blockchain', 'wallet', 'gas-fee', 'smart-contract'],
    relatedQuestIds: [3, 10],
  },
  {
    slug: 'tx-hash',
    titleKo: '트랜잭션 해시',
    titleEn: 'Transaction Hash (TX Hash)',
    shortDef: '블록체인 거래의 고유 식별 번호. 영수증 같은 것.',
    explanation: `트랜잭션 해시(TX Hash)는 블록체인에서 실행된 거래의 고유한 ID야. 모든 거래는 유일한 해시값을 가지고 있어.

**예시:**
0x3a2b1c4d5e6f... (64자리 16진수 문자열)

**TX Hash로 뭘 확인하나?**
- **상태**: 성공(Success), 실패(Failed), 대기(Pending)
- **보낸 주소 / 받는 주소**
- **금액**: 얼마를 보냈는지
- **가스비**: 수수료 얼마 냈는지
- **타임스탬프**: 언제 실행됐는지
- **블록 번호**: 어떤 블록에 포함됐는지

**언제 필요할까?**
- 거래소에 코인 보냈는데 입금 안 될 때 → TX Hash 제출
- 디스코드에서 에어드랍 참여 증명할 때
- 트랜잭션 실패 원인 파악할 때

**트랜잭션 실패 이유:**
1. 가스비 부족 (gas limit too low)
2. 슬리피지 초과
3. 컨트랙트 오류
4. 잔액 부족`,
    category: '온체인',
    relatedTermSlugs: ['block-explorer', 'gas-fee', 'wallet'],
    relatedQuestIds: [3, 5],
  },
  {
    slug: 'airdrop',
    titleKo: '에어드랍',
    titleEn: 'Airdrop',
    shortDef: '프로젝트가 초기 사용자에게 무료로 토큰을 나눠주는 이벤트.',
    explanation: `에어드랍(Airdrop)은 크립토 프로젝트가 토큰을 무료로 배포하는 거야. 보통 초기에 프로토콜을 사용한 사람들에게 보상으로 줘.

**에어드랍의 종류:**
1. **소급 에어드랍**: 과거 사용 이력 기준으로 보상 (가장 가치 큼)
   - Uniswap: 최소 $1,200 UNI 지급
   - Arbitrum: ARB 토큰 에어드랍
2. **태스크 기반**: 브릿지, 스왑, 소셜 참여 등 미션 수행
3. **홀더 에어드랍**: 특정 토큰/NFT 보유자에게 배포

**에어드랍 파밍 전략:**
1. 아직 토큰이 없는 유망 프로토콜 찾기
2. 테스트넷/메인넷에서 활발하게 사용
3. 브릿지, 스왑, 예치 등 다양한 기능 사용
4. 꾸준히 (한 번이 아닌 여러 달에 걸쳐)

**주의사항:**
- 에어드랍 사기 주의 (지갑 연결 요구하는 피싱 사이트)
- 절대 시드 구문 입력하지 마
- 가스비가 보상보다 클 수도 있음
- 시빌 공격(다계정) 감지되면 에어드랍 제외`,
    category: '온체인',
    relatedTermSlugs: ['token', 'wallet', 'defi', 'bridge'],
    relatedQuestIds: [9, 10],
  },
  {
    slug: 'testnet',
    titleKo: '테스트넷',
    titleEn: 'Testnet',
    shortDef: '실제 돈 없이 블록체인 기능을 테스트할 수 있는 시험용 네트워크.',
    explanation: `테스트넷(Testnet)은 메인넷(실제 네트워크)과 똑같이 작동하지만 가짜 토큰을 사용하는 시험용 블록체인이야.

**왜 존재할까?**
개발자가 새로운 기능을 실제 돈 없이 테스트하기 위해. 스마트 컨트랙트에 버그가 있으면 실제 자금이 날아갈 수 있으니까.

**대표 테스트넷:**
- **Sepolia**: 이더리움 테스트넷 (가장 많이 사용)
- **Goerli**: 이더리움 테스트넷 (지원 종료 예정)
- **Devnet**: 솔라나 테스트넷
- **Base Sepolia**: Base L2 테스트넷

**테스트넷 토큰 받는 법:**
"Faucet(수도꼭지)"이라는 사이트에서 무료로 받을 수 있어. 구글에 "Sepolia faucet"이라고 검색하면 돼.

**에어드랍과의 연결:**
많은 프로젝트가 테스트넷 참여자에게 메인넷 에어드랍을 줘. 그래서 테스트넷 활동은 에어드랍 파밍의 핵심 전략이야.

**메타마스크에서 테스트넷 추가:**
설정 → 네트워크 → 테스트넷 보기 활성화 → Sepolia 선택`,
    category: '온체인',
    relatedTermSlugs: ['airdrop', 'smart-contract', 'wallet', 'ethereum'],
    relatedQuestIds: [5, 10],
  },
  {
    slug: 'dao',
    titleKo: 'DAO',
    titleEn: 'DAO (Decentralized Autonomous Organization)',
    shortDef: '스마트 컨트랙트로 운영되는 탈중앙 자율 조직.',
    explanation: `DAO는 "Decentralized Autonomous Organization"의 약자로, 사장이나 이사회 없이 토큰 보유자들의 투표로 운영되는 조직이야.

**전통 회사 vs DAO:**
- 회사: CEO가 결정 → 직원이 실행
- DAO: 토큰 보유자가 투표 → 스마트 컨트랙트가 실행

**DAO의 작동 방식:**
1. 누군가 제안(Proposal)을 올림 (예: "마케팅에 $100K 쓰자")
2. 거버넌스 토큰 보유자들이 투표
3. 정족수 충족 + 찬성 다수 → 스마트 컨트랙트가 자동 집행

**대표 DAO:**
- **MakerDAO**: DAI 스테이블코인 관리
- **Uniswap DAO**: 유니스왑 프로토콜 관리
- **Aave DAO**: 대출 파라미터 결정
- **ConstitutionDAO**: 미국 헌법 원본 구매 시도 (실패했지만 유명)

**투표 플랫폼:**
- Snapshot: 가스비 없는 오프체인 투표
- Tally: 온체인 투표

**DAO의 한계:**
투표율이 낮고, 대형 홀더가 결정을 좌우하는 경우가 많아. 진정한 탈중앙은 아직 갈 길이 멀어.`,
    category: '온체인',
    relatedTermSlugs: ['smart-contract', 'token', 'defi', 'ethereum'],
    relatedQuestIds: [10],
  },

  // -- 보안 추가 (+4) --
  {
    slug: 'phishing',
    titleKo: '피싱',
    titleEn: 'Phishing',
    shortDef: '가짜 웹사이트나 메시지로 개인정보나 자산을 탈취하는 사기 수법.',
    explanation: `피싱(Phishing)은 크립토 세계에서 가장 흔한 사기 수법이야. 진짜처럼 보이는 가짜 사이트로 지갑이나 자산을 탈취해.

**크립토 피싱 유형:**

**1. 가짜 웹사이트:**
- 진짜: uniswap.org → 가짜: uniswapp.org, un1swap.org
- URL 한 글자만 달라도 완전히 다른 사이트

**2. 가짜 에어드랍:**
- "무료 토큰을 받으세요!" 클릭 → 지갑 승인 요청 → 자산 탈취
- 트위터, 디스코드 DM으로 주로 옴

**3. 악성 승인(Approval):**
- 스마트 컨트랙트에 무제한 토큰 접근 권한을 줌
- 나중에 해커가 이 권한으로 토큰을 빼감

**4. 시드 구문 탈취:**
- "기술 지원팀"을 사칭해 시드 구문 요구
- 공식 팀은 절대 시드 구문을 요구하지 않음

**자기 방어법:**
1. URL을 항상 직접 입력하거나 북마크 사용
2. DM으로 온 링크 절대 클릭 금지
3. "Unlimited Approval" 거부
4. 하드웨어 지갑 사용
5. 의심되면 반드시 공식 채널에서 확인`,
    category: '보안',
    relatedTermSlugs: ['rug-pull', 'seed-phrase', 'private-key', 'wallet'],
    relatedQuestIds: [3, 9],
  },
  {
    slug: 'approval-revoke',
    titleKo: '토큰 승인/취소',
    titleEn: 'Token Approval & Revoke',
    shortDef: '스마트 컨트랙트에 토큰 사용 권한을 부여하거나 취소하는 것.',
    explanation: `토큰 승인(Approval)은 DeFi를 사용할 때 스마트 컨트랙트가 내 토큰을 사용할 수 있게 허락하는 거야.

**왜 필요할까?**
유니스왑에서 ETH를 USDC로 스왑하려면, 유니스왑 컨트랙트가 내 ETH에 접근할 수 있어야 해. 이 접근 권한을 주는 게 "승인(Approve)"이야.

**위험한 승인:**
- "Unlimited Approval": 무제한 금액 접근 허용 → 해당 컨트랙트가 해킹되면 전액 탈취 가능
- 피싱 사이트의 승인 요청: 악성 컨트랙트에 권한을 주는 것

**안전한 승인 습관:**
1. 필요한 금액만큼만 승인 (Unlimited 대신 Custom Amount)
2. 사용 후 승인 취소(Revoke)
3. 정기적으로 승인 목록 점검

**승인 확인 & 취소 방법:**
- Revoke.cash: 승인 목록 확인 + 취소
- Etherscan Token Approvals: 이더리움 승인 관리
- 메타마스크에서 직접 확인도 가능

**취소 시 가스비가 발생해.** 하지만 보안을 위해 사용하지 않는 오래된 승인은 반드시 취소하자.`,
    category: '보안',
    relatedTermSlugs: ['smart-contract', 'phishing', 'wallet', 'defi'],
    relatedQuestIds: [3, 7],
  },
  {
    slug: 'multisig',
    titleKo: '멀티시그',
    titleEn: 'Multisig (Multi-Signature)',
    shortDef: '트랜잭션 실행에 여러 명의 서명이 필요한 지갑 보안 방식.',
    explanation: `멀티시그(Multisig)는 한 사람이 아닌 여러 사람의 서명이 있어야 거래를 실행할 수 있는 지갑이야.

**비유:**
금고를 열려면 열쇠가 3개 필요하고, 3명이 각각 1개씩 가지고 있어. 2명 이상이 동의해야 금고가 열림. 이게 "2-of-3 멀티시그"야.

**일반적인 구성:**
- 2-of-3: 3개 키 중 2개로 서명 (가장 인기)
- 3-of-5: 5개 키 중 3개
- 4-of-7: DAO 국고에서 자주 사용

**멀티시그의 활용:**
- **DAO 국고 관리**: 한 사람이 독단적으로 자금 인출 불가
- **팀 자금 관리**: 프로젝트 자금을 안전하게 보관
- **개인 보안**: 핫월렛 + 콜드월렛 + 백업키로 구성

**대표 멀티시그 지갑:**
- **Safe (구 Gnosis Safe)**: 가장 많이 쓰이는 멀티시그. $100B+ 자산 관리 중.

**왜 중요할까?**
DeFi 프로젝트의 관리자 키가 1개인 경우(EOA), 그 키가 해킹되면 끝이야. 멀티시그이면 한 명이 해킹당해도 자금은 안전해.`,
    category: '보안',
    relatedTermSlugs: ['wallet', 'private-key', 'dao', 'smart-contract'],
    relatedQuestIds: [3, 10],
  },
  {
    slug: 'audit',
    titleKo: '감사',
    titleEn: 'Smart Contract Audit',
    shortDef: '스마트 컨트랙트의 보안 취약점을 전문 업체가 검사하는 것.',
    explanation: `감사(Audit)는 보안 전문 업체가 스마트 컨트랙트 코드를 검사하여 버그나 취약점을 찾아내는 과정이야.

**왜 중요할까?**
DeFi에서 코드가 곧 법이야. 코드에 버그가 있으면 해커가 이를 악용해 자금을 탈취할 수 있어. 감사는 이를 사전에 방지하는 안전장치야.

**대표 감사 업체:**
- **CertiK**: 가장 유명, 많은 프로젝트 감사
- **Trail of Bits**: 고급 보안 전문
- **OpenZeppelin**: 보안 표준 + 감사
- **SlowMist**: 아시아 시장 강자
- **Halborn**: 크로스체인 보안 전문

**감사 보고서 읽는 법:**
1. **Critical/High 이슈**: 자금 손실 가능 → 반드시 수정되었는지 확인
2. **Medium 이슈**: 제한적 영향
3. **Low/Informational**: 개선 권장 사항

**감사의 한계:**
- 감사 받았다고 100% 안전한 건 아님
- 감사 이후에 코드가 변경됐을 수도 있음
- 감사 범위가 전체가 아닐 수 있음

**체크포인트:**
DeFi에 돈을 넣기 전, DefiLlama나 프로젝트 웹사이트에서 감사 보고서가 있는지 반드시 확인하자.`,
    category: '보안',
    relatedTermSlugs: ['smart-contract', 'rug-pull', 'defi', 'phishing'],
    relatedQuestIds: [9, 10],
  },

  // -- NFT 추가 (+4) --
  {
    slug: 'whitelist',
    titleKo: '화이트리스트',
    titleEn: 'Whitelist (WL) / Allowlist',
    shortDef: 'NFT 민팅이나 토큰 세일에 우선 참여할 수 있는 허가 목록.',
    explanation: `화이트리스트(WL)는 NFT 민팅이나 토큰 세일에서 일반 공개 전에 먼저 참여할 수 있는 우선권 목록이야.

**왜 중요할까?**
인기 NFT 프로젝트는 공개 민팅에서 순식간에 완판돼. WL에 들어가면:
- 가스 전쟁을 피할 수 있음
- 저렴한 가격에 민팅 가능
- 확실하게 민팅 기회 보장

**화이트리스트 얻는 방법:**
1. **디스코드 활동**: 커뮤니티에서 적극 참여
2. **팬아트**: 프로젝트 관련 창작물 제작
3. **래플**: 추첨으로 당첨
4. **콜라보**: 다른 NFT를 보유하고 있으면 자동 WL

**WL 시기별 구분:**
- **OG (Original)**: 초기 참여자, 가장 빠른 접근
- **WL**: 일반 화이트리스트
- **Public**: 누구나 참여 가능 (마지막, 가스 전쟁)

**주의사항:**
가짜 WL 이벤트 피싱이 많아. 공식 채널에서만 확인하고, 절대 시드 구문이나 프라이빗 키를 입력하지 마.`,
    category: 'NFT',
    relatedTermSlugs: ['nft', 'mint', 'gas-fee', 'phishing'],
    relatedQuestIds: [9],
  },
  {
    slug: 'pfp',
    titleKo: 'PFP',
    titleEn: 'PFP (Profile Picture)',
    shortDef: 'SNS 프로필 사진으로 사용하는 NFT 컬렉션.',
    explanation: `PFP(Profile Picture)는 트위터, 디스코드 등에서 프로필 사진으로 사용하는 NFT 컬렉션이야.

**대표 PFP 컬렉션:**
- **CryptoPunks**: 2017년, OG PFP. 10,000개 한정.
- **Bored Ape Yacht Club (BAYC)**: 2021년 NFT 붐의 상징
- **Pudgy Penguins**: 실물 장난감 사업 확장
- **Azuki**: 애니메이션 스타일, 아시아에서 인기
- **Milady**: 인터넷 밈 문화와 결합

**PFP NFT의 가치:**
- **커뮤니티 소속감**: 같은 PFP를 쓰면 같은 "클럽" 소속
- **소셜 시그널링**: 비싼 PFP = 크립토 부자
- **유틸리티**: 보유자 전용 이벤트, 에어드랍, 멤버십

**PFP 특징:**
- 보통 10,000개 한정 발행
- 다양한 특성(Traits)의 조합으로 생성
- 희귀한 특성일수록 가격이 높음

**현실:**
2021-2022 NFT 열풍은 식었고, 대부분의 PFP 가격은 90%+ 하락했어. 하지만 커뮤니티가 강한 소수 프로젝트는 여전히 가치를 유지하고 있어.`,
    category: 'NFT',
    relatedTermSlugs: ['nft', 'floor-price', 'mint', 'whitelist'],
    relatedQuestIds: [9],
  },
  {
    slug: 'metadata',
    titleKo: '메타데이터',
    titleEn: 'NFT Metadata',
    shortDef: 'NFT의 이름, 설명, 이미지, 속성 등 상세 정보를 담은 데이터.',
    explanation: `메타데이터(Metadata)는 NFT의 "신분증"이야. NFT 자체는 블록체인에 있지만, 이미지와 속성 정보는 메타데이터에 저장돼.

**메타데이터에 포함되는 정보:**
- name: NFT 이름
- description: 설명
- image: 이미지 URL
- attributes/traits: 속성 (배경색, 모자, 옷 등)

**이미지는 어디에 저장될까?**
블록체인에 이미지를 직접 올리면 비용이 엄청나. 그래서:
- **IPFS**: 탈중앙 파일 스토리지 (가장 일반적)
- **Arweave**: 영구 스토리지 (한 번 비용, 영구 보관)
- **중앙 서버**: 프로젝트 서버에 저장 (위험! 서버 꺼지면 이미지 사라짐)

**온체인 NFT:**
일부 NFT는 이미지까지 블록체인에 직접 저장해. SVG 같은 가벼운 형식으로. 이런 NFT는 서버에 의존하지 않아 가장 안전해.

**메타데이터 갱신:**
일부 NFT는 메타데이터를 업데이트할 수 있어 (Reveal, 진화 등). 처음에는 같은 이미지였다가 나중에 고유한 이미지가 공개되는 방식.`,
    category: 'NFT',
    relatedTermSlugs: ['nft', 'smart-contract', 'mint'],
    relatedQuestIds: [9],
  },
  {
    slug: 'royalty',
    titleKo: '로열티',
    titleEn: 'NFT Royalty',
    shortDef: 'NFT가 재판매될 때마다 원작자에게 돌아가는 수수료.',
    explanation: `로열티(Royalty)는 NFT가 2차 시장에서 거래될 때마다 원래 창작자에게 자동으로 지급되는 수수료야.

**작동 방식:**
1. 아티스트가 NFT를 민팅하며 로열티 5%로 설정
2. A가 1 ETH에 구매 → 아티스트에게 로열티 없음 (1차 판매)
3. A가 B에게 2 ETH에 재판매 → 아티스트에게 0.1 ETH (5%)
4. B가 C에게 5 ETH에 재판매 → 아티스트에게 0.25 ETH (5%)

**로열티의 혁신:**
전통 미술 시장에서는 작가가 작품을 한 번 팔면 끝이야. NFT는 영원히 거래될 때마다 수익이 발생해. 아티스트에게 혁명적인 수익 모델이지.

**로열티 논쟁:**
2023년부터 Blur, OpenSea 등이 로열티 선택제를 도입하면서 논란이 됐어. 구매자는 로열티를 안 내고 싶고, 창작자는 수익이 필요하고.

**일반적인 로열티 비율:**
- 2.5~5%: 표준
- 7.5~10%: 높은 편
- 0%: 로열티 없음 (최근 증가 추세)

**체인별 로열티 강제:**
이더리움에서는 로열티 강제가 어렵지만, 일부 체인은 스마트 컨트랙트 레벨에서 강제할 수 있어.`,
    category: 'NFT',
    relatedTermSlugs: ['nft', 'mint', 'smart-contract', 'floor-price'],
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

  // ===== 트레이딩 추가 =====
  {
    slug: 'stop-loss',
    titleKo: '손절매',
    titleEn: 'Stop Loss',
    shortDef: '손실을 제한하기 위해 미리 정한 가격에 자동으로 파는 주문.',
    explanation: `손절매(Stop Loss)는 가격이 일정 수준 이하로 떨어지면 자동으로 매도하는 주문이야. 더 큰 손실을 막기 위한 안전장치지.

**왜 필요할까?**
크립토는 변동성이 커서 "좀 더 기다려볼까" 하다가 -50%까지 물리는 경우가 흔해. 손절매를 미리 걸어두면 감정에 흔들리지 않고 기계적으로 손실을 제한할 수 있어.

**설정 방법:**
- 진입가 대비 -5~10% 정도가 일반적
- 지지선 바로 아래에 거는 전략도 많이 써
- 너무 타이트하면 잠깐의 변동에도 털려나감

**종류:**
- **고정 손절**: 특정 가격에 매도 (예: BTC $95,000에 손절)
- **트레일링 스탑**: 가격이 올라가면 손절 라인도 따라 올라감. 수익을 지키면서 상승을 쫓을 수 있어

**트레이딩 격언:** "손절은 비용이 아니라 보험이다." 작은 손실 여러 번은 괜찮지만, 큰 손실 한 번은 치명적이야.`,
    category: '트레이딩',
    relatedTermSlugs: ['leverage', 'liquidation', 'long-short', 'order-book'],
    relatedQuestIds: [7, 8, 20],
  },
  {
    slug: 'market-order',
    titleKo: '시장가/지정가 주문',
    titleEn: 'Market / Limit Order',
    shortDef: '즉시 체결하는 시장가와 원하는 가격을 지정하는 지정가 주문.',
    explanation: `거래소에서 코인을 사고팔 때 주문 방식이 크게 두 가지야.

**시장가 주문(Market Order):**
현재 호가에 즉시 체결되는 주문. 빠르지만 슬리피지가 발생할 수 있어.
- 장점: 바로 체결됨
- 단점: 원하는 가격보다 비싸게/싸게 체결될 수 있음
- 적합: 급할 때, 유동성 많은 코인

**지정가 주문(Limit Order):**
내가 원하는 가격을 직접 정하는 주문. 그 가격이 올 때까지 기다려.
- 장점: 원하는 가격에 정확히 체결
- 단점: 가격이 안 오면 체결 안 됨
- 적합: 여유 있을 때, 목표 가격이 명확할 때

**수수료 차이:**
- 시장가 = Taker (호가를 가져감) → 수수료 높음
- 지정가 = Maker (호가를 만듦) → 수수료 낮거나 리베이트

**실전 팁:**
초보자는 지정가 주문을 습관화하는 게 좋아. 시장가로 급하게 사면 슬리피지 + 높은 수수료로 손해볼 수 있거든. 특히 유동성 낮은 알트코인은 반드시 지정가로!`,
    category: '트레이딩',
    relatedTermSlugs: ['slippage', 'order-book', 'stop-loss', 'volume'],
    relatedQuestIds: [7, 8],
  },
];

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.category === category);
}

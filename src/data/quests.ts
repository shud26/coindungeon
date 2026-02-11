export interface QuestStep {
  title: string;
  content: string;
  type: 'read' | 'action' | 'verify';
  verifyText?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quest {
  id: number;
  floor: number;
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  estimatedMinutes: number;
  category: string;
  steps: QuestStep[];
  quiz?: QuizQuestion[];
}

export const quests: Quest[] = [
  {
    id: 1,
    floor: 1,
    slug: 'what-is-crypto',
    title: '크립토가 뭐야?',
    description: '블록체인과 암호화폐의 기본 개념을 이해하자',
    icon: 'Coins',
    difficulty: 'easy',
    xp: 50,
    estimatedMinutes: 5,
    category: '기초',
    steps: [
      {
        title: '암호화폐란?',
        content: '암호화폐(Cryptocurrency)는 블록체인 기술을 기반으로 한 디지털 화폐야. 은행 없이도 전 세계 누구에게나 돈을 보낼 수 있어.\n\n비트코인(BTC)이 2009년에 처음 만들어졌고, 지금은 수천 개의 암호화폐가 있어.',
        type: 'read',
      },
      {
        title: '블록체인이란?',
        content: '블록체인은 거래 기록을 "블록"에 담아 "체인"처럼 연결한 분산 장부야.\n\n핵심 특징:\n- **탈중앙화**: 한 곳이 아닌 전 세계 컴퓨터가 함께 관리\n- **투명성**: 모든 거래가 공개됨\n- **불변성**: 한번 기록되면 수정 불가',
        type: 'read',
      },
      {
        title: '주요 코인 알아보기',
        content: '알아야 할 주요 코인들:\n\n- **비트코인(BTC)**: 최초의 암호화폐, "디지털 금"\n- **이더리움(ETH)**: 스마트 컨트랙트 플랫폼, 디앱(DApp)의 기반\n- **솔라나(SOL)**: 빠르고 저렴한 트랜잭션\n- **스테이블코인(USDT, USDC)**: 달러에 1:1 고정된 코인',
        type: 'read',
      },
      {
        title: '이해 확인',
        content: '위 내용을 읽었으면 아래 퀴즈를 풀어보자.',
        type: 'verify',
        verifyText: '기본 개념을 이해했어요',
      },
    ],
    quiz: [
      {
        question: '비트코인이 처음 만들어진 연도는?',
        options: ['2005년', '2009년', '2013년', '2017년'],
        correctIndex: 1,
        explanation: '비트코인은 2009년 사토시 나카모토가 만들었어.',
      },
      {
        question: '블록체인의 핵심 특징이 아닌 것은?',
        options: ['탈중앙화', '투명성', '중앙 서버 관리', '불변성'],
        correctIndex: 2,
        explanation: '블록체인은 중앙 서버가 아닌 분산 네트워크로 관리돼.',
      },
    ],
  },
  {
    id: 2,
    floor: 2,
    slug: 'install-metamask',
    title: '메타마스크 설치하기',
    description: '나만의 크립토 지갑을 만들자',
    icon: 'Wallet',
    difficulty: 'easy',
    xp: 100,
    estimatedMinutes: 10,
    category: '지갑',
    steps: [
      {
        title: '메타마스크란?',
        content: '메타마스크(MetaMask)는 가장 인기 있는 크립토 지갑이야.\n\n지갑이 있으면:\n- 코인/토큰을 보관할 수 있고\n- 디앱(DApp)에 연결할 수 있고\n- NFT를 받을 수 있어',
        type: 'read',
      },
      {
        title: '설치하기',
        content: '1. 크롬 브라우저를 열어\n2. **metamask.io** 에 접속해 (꼭 공식 사이트인지 확인!)\n3. "Download" 클릭 → Chrome 확장 프로그램 추가\n4. 설치 완료!\n\n주의: 검색 결과의 가짜 메타마스크 사이트 조심! 반드시 metamask.io에서 다운로드해.',
        type: 'action',
        verifyText: '메타마스크를 설치했어요',
      },
      {
        title: '새 지갑 만들기',
        content: '1. 메타마스크 아이콘 클릭\n2. "Create a new wallet" 선택\n3. 비밀번호 설정 (8자 이상)\n4. **시드 구문(Secret Recovery Phrase)** 12개 단어가 나타남\n\n절대로 시드 구문을 누구에게도 알려주지 마. 이건 다음 퀘스트에서 자세히 배울 거야.',
        type: 'action',
        verifyText: '새 지갑을 만들었어요',
      },
      {
        title: '지갑 주소 확인하기',
        content: '지갑을 만들면 **0x**로 시작하는 42자리 주소가 생겨.\n\n예: `0x1234...abcd`\n\n이 주소는 은행 계좌번호같은 거야. 누구에게나 공유해도 안전해. (시드 구문은 절대 안 됨!)',
        type: 'verify',
        verifyText: '지갑 주소를 확인했어요',
      },
    ],
    quiz: [
      {
        question: '메타마스크 공식 사이트 주소는?',
        options: ['metamask.com', 'metamask.io', 'meta-mask.io', 'getmetamask.com'],
        correctIndex: 1,
        explanation: '반드시 metamask.io에서만 다운로드해. 가짜 사이트 주의!',
      },
    ],
  },
  {
    id: 3,
    floor: 3,
    slug: 'seed-phrase-safety',
    title: '시드 구문 안전하게 보관하기',
    description: '지갑의 "마스터키"를 안전하게 지키는 법',
    icon: 'KeyRound',
    difficulty: 'easy',
    xp: 100,
    estimatedMinutes: 8,
    category: '지갑',
    steps: [
      {
        title: '시드 구문이 뭔데?',
        content: '시드 구문(Seed Phrase)은 12~24개의 영어 단어로 이루어진 지갑의 마스터키야.\n\n이 단어들만 있으면 어떤 기기에서든 지갑을 복구할 수 있어. 반대로 말하면, 이걸 아는 사람은 네 지갑의 모든 자산을 가져갈 수 있다는 뜻이야.',
        type: 'read',
      },
      {
        title: '절대 하면 안 되는 것들',
        content: '절대 하지 마:\n- 스크린샷 찍기\n- 메모 앱이나 노트에 저장\n- 카카오톡이나 메일로 보내기\n- 클라우드(Google Drive, iCloud)에 저장\n- 누군가 시드 구문을 물어보면 알려주기\n\n누군가 "시드 구문을 입력하세요"라고 하면 100% 사기야.',
        type: 'read',
      },
      {
        title: '안전하게 보관하는 법',
        content: '이렇게 보관해:\n\n1. **종이에 직접 쓰기** - 볼펜으로 깨끗하게\n2. **2장 이상 복사** - 다른 장소에 보관\n3. **방수/방화** - 지퍼백에 넣기\n4. **아무도 모르는 곳에 보관**\n\n고급: 스틸 플레이트에 각인하면 화재에도 안전해.',
        type: 'action',
        verifyText: '시드 구문을 안전한 곳에 적어뒀어요',
      },
    ],
    quiz: [
      {
        question: '시드 구문을 보관하기에 가장 안전한 방법은?',
        options: ['메모 앱에 저장', '스크린샷 찍어서 갤러리에', '종이에 적어서 안전한 곳에', '카카오톡 나에게 보내기'],
        correctIndex: 2,
        explanation: '오프라인(종이)이 가장 안전해. 디지털 저장은 해킹 위험이 있어.',
      },
      {
        question: '누군가 "지갑 복구를 위해 시드 구문을 입력하세요"라고 하면?',
        options: ['입력한다', '일부만 입력한다', '100% 사기이므로 무시한다', '고객센터에 문의한다'],
        correctIndex: 2,
        explanation: '정상적인 서비스는 절대 시드 구문을 요구하지 않아. 무조건 사기야.',
      },
    ],
  },
  {
    id: 4,
    floor: 4,
    slug: 'read-etherscan',
    title: 'Etherscan에서 트랜잭션 읽기',
    description: '블록체인 탐색기로 거래 내역을 읽어보자',
    icon: 'Search',
    difficulty: 'easy',
    xp: 100,
    estimatedMinutes: 10,
    category: '온체인',
    steps: [
      {
        title: 'Etherscan이란?',
        content: 'Etherscan은 이더리움 블록체인의 "검색엔진"이야.\n\n모든 이더리움 트랜잭션을 누구나 볼 수 있어:\n- 누가 누구에게 보냈는지\n- 얼마를 보냈는지\n- 가스비가 얼마였는지\n- 성공했는지 실패했는지',
        type: 'read',
      },
      {
        title: 'Etherscan 접속하기',
        content: '1. **etherscan.io** 에 접속해\n2. 검색창에 아무 지갑 주소나 입력해봐\n   - 예: 비탈릭 부테린 주소 `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`\n3. 그 지갑의 모든 거래 내역이 보여!',
        type: 'action',
        verifyText: 'Etherscan에서 지갑 주소를 검색해봤어요',
      },
      {
        title: '트랜잭션 읽는 법',
        content: '트랜잭션을 클릭하면 이런 정보가 보여:\n\n- **Transaction Hash**: 거래의 고유 ID (0x로 시작)\n- **From**: 보내는 사람 주소\n- **To**: 받는 사람 주소 (또는 컨트랙트)\n- **Value**: 전송한 ETH 양\n- **Gas Fee**: 지불한 수수료\n- **Status**: Success(성공) or Failed(실패)',
        type: 'read',
      },
      {
        title: '내 지갑도 확인해보기',
        content: '메타마스크에서 내 지갑 주소를 복사해서 Etherscan에 검색해봐.\n\n아직 거래가 없으면 빈 화면이 정상이야. 나중에 ETH를 받거나 보내면 여기에 기록돼.',
        type: 'verify',
        verifyText: '트랜잭션 정보를 읽을 수 있게 됐어요',
      },
    ],
  },
  {
    id: 5,
    floor: 5,
    slug: 'testnet-faucet',
    title: '테스트넷 ETH 받기',
    description: '가짜 ETH로 안전하게 연습하자 (Faucet)',
    icon: 'Droplets',
    difficulty: 'medium',
    xp: 150,
    estimatedMinutes: 15,
    category: '지갑',
    steps: [
      {
        title: '테스트넷이란?',
        content: '테스트넷(Testnet)은 진짜 돈 없이 블록체인을 연습할 수 있는 환경이야.\n\n- **메인넷**: 진짜 ETH를 사용하는 실제 네트워크\n- **테스트넷**: 가짜 ETH를 사용하는 연습 네트워크\n\n테스트넷 ETH는 가치가 없어서 실수해도 돈을 잃지 않아!',
        type: 'read',
      },
      {
        title: '메타마스크에 테스트넷 추가',
        content: '1. 메타마스크 열기\n2. 네트워크 선택 드롭다운 클릭\n3. "Show test networks" 또는 설정에서 테스트넷 활성화\n4. **Sepolia** 테스트넷 선택',
        type: 'action',
        verifyText: '메타마스크에 Sepolia를 추가했어요',
      },
      {
        title: 'Faucet에서 ETH 받기',
        content: 'Faucet(수도꼭지)은 무료로 테스트넷 ETH를 나눠주는 사이트야.\n\n1. **Google에 "Sepolia faucet"** 검색\n2. 추천: sepoliafaucet.com 또는 Google Cloud Web3 Faucet\n3. 메타마스크에서 주소 복사\n4. Faucet 사이트에 붙여넣기\n5. "Send" 클릭!\n\n몇 초~몇 분 후에 메타마스크에 ETH가 들어와.',
        type: 'action',
        verifyText: '테스트넷 ETH를 받았어요',
      },
      {
        title: '잔액 확인',
        content: '메타마스크에서 Sepolia 네트워크를 선택한 상태로 잔액을 확인해봐.\n\n0.5 SepoliaETH 같은 숫자가 보이면 성공이야!\n\n이 ETH는 가치는 없지만, 트랜잭션 연습에 사용할 수 있어.',
        type: 'verify',
        verifyText: '테스트넷 ETH 잔액을 확인했어요',
      },
    ],
    quiz: [
      {
        question: '테스트넷 ETH의 실제 가치는?',
        options: ['메인넷 ETH의 10%', '0원 (연습용)', '소량의 가치가 있다', '1달러 정도'],
        correctIndex: 1,
        explanation: '테스트넷 ETH는 연습용이라 실제 가치가 없어. 마음껏 써도 돼!',
      },
    ],
  },
  {
    id: 6,
    floor: 6,
    slug: 'cex-vs-dex',
    title: '거래소 종류: CEX vs DEX',
    description: '중앙화 vs 탈중앙화 거래소의 차이',
    icon: 'Building2',
    difficulty: 'easy',
    xp: 100,
    estimatedMinutes: 8,
    category: '기초',
    steps: [
      {
        title: 'CEX (중앙화 거래소)',
        content: 'CEX = Centralized Exchange (중앙화 거래소)\n\n예: **업비트, 빗썸, 바이낸스, 코인베이스**\n\n특징:\n- 회사가 운영 (고객센터 있음)\n- 본인인증(KYC) 필수\n- 원화(KRW) 입출금 가능\n- 거래소가 내 코인을 "보관"해줌\n- 해킹당하면 내 코인도 위험',
        type: 'read',
      },
      {
        title: 'DEX (탈중앙화 거래소)',
        content: 'DEX = Decentralized Exchange (탈중앙화 거래소)\n\n예: **Uniswap, Hyperliquid, Jupiter**\n\n특징:\n- 스마트 컨트랙트가 자동으로 운영\n- 본인인증 없음 (지갑만 연결)\n- 내 지갑에서 직접 거래 (코인이 내 지갑에 있음)\n- "Not your keys, not your coins"의 실현\n- 고객센터 없음',
        type: 'read',
      },
      {
        title: '언제 뭘 쓸까?',
        content: '**CEX를 쓰는 경우:**\n- 원화로 코인 사고 싶을 때\n- 초보자가 처음 시작할 때\n- 빠른 거래가 필요할 때\n\n**DEX를 쓰는 경우:**\n- 상장 안 된 신규 토큰을 사고 싶을 때\n- 내 코인을 직접 관리하고 싶을 때\n- 디파이(DeFi)를 이용할 때\n- 프라이버시가 중요할 때',
        type: 'read',
      },
      {
        title: '핵심 정리',
        content: 'CEX vs DEX 비교:\n\n- **운영**: 회사 vs 스마트 컨트랙트\n- **KYC**: 필수 vs 불필요\n- **원화**: 가능 vs 불가\n- **코인 보관**: 거래소 vs 내 지갑\n- **고객센터**: 있음 vs 없음',
        type: 'verify',
        verifyText: 'CEX와 DEX 차이를 이해했어요',
      },
    ],
    quiz: [
      {
        question: '"Not your keys, not your coins"가 의미하는 것은?',
        options: ['키보드가 없으면 코인도 없다', '시드 구문을 가진 사람이 코인의 주인이다', 'CEX가 더 안전하다', '코인은 물리적 열쇠가 필요하다'],
        correctIndex: 1,
        explanation: '프라이빗 키(시드 구문)를 직접 보유하지 않으면 진정한 소유가 아니라는 뜻이야.',
      },
    ],
  },
  {
    id: 7,
    floor: 7,
    slug: 'buy-first-coin',
    title: '업비트에서 첫 코인 사기',
    description: '실제 거래소에서 소액으로 첫 거래',
    icon: 'BadgeDollarSign',
    difficulty: 'medium',
    xp: 150,
    estimatedMinutes: 20,
    category: '거래소',
    steps: [
      {
        title: '준비물',
        content: '필요한 것:\n- 업비트 앱 (설치 + 본인인증 완료)\n- 은행 계좌 연결\n- 최소 5,000원 이상\n\n중요: 잃어도 괜찮은 금액만 넣을 것! 처음엔 5,000~10,000원이면 충분해.',
        type: 'read',
      },
      {
        title: '원화 입금하기',
        content: '1. 업비트 앱 열기\n2. 하단 "입출금" 탭\n3. "원화(KRW)" 선택\n4. "입금" 클릭\n5. 연결된 은행에서 입금\n\n보통 1~5분이면 반영돼.',
        type: 'action',
        verifyText: '원화를 입금했어요',
      },
      {
        title: '주문 넣기',
        content: '1. 검색에서 "BTC" 또는 원하는 코인 검색\n2. "매수" 탭 선택\n3. **주문 유형**:\n   - **시장가**: 현재 가격으로 바로 매수 (초보 추천)\n   - **지정가**: 원하는 가격을 직접 설정\n4. 금액 입력 (예: 5,000원)\n5. "매수" 버튼 클릭!\n\n축하해! 첫 코인을 샀어!',
        type: 'action',
        verifyText: '첫 코인을 매수했어요',
      },
      {
        title: '보유 자산 확인',
        content: '하단 "자산" 탭에서 내가 산 코인이 보여.\n\n- **평가금액**: 현재 가치\n- **매수평균가**: 내가 산 가격\n- **수익률**: +면 이익, -면 손실\n\n가격이 오르내리는 걸 보면서 시장을 체감해봐.',
        type: 'verify',
        verifyText: '보유 자산을 확인했어요',
      },
    ],
  },
  {
    id: 8,
    floor: 8,
    slug: 'candlestick-basics',
    title: '차트 읽기: 캔들스틱 기초',
    description: '코인 차트의 초록/빨강 막대가 뭔지 알아보자',
    icon: 'CandlestickChart',
    difficulty: 'medium',
    xp: 150,
    estimatedMinutes: 12,
    category: '트레이딩',
    steps: [
      {
        title: '캔들스틱이란?',
        content: '캔들스틱은 일정 기간의 가격 변화를 막대 하나로 보여주는 차트야.\n\n각 캔들에는 4가지 정보가 담겨있어:\n- **시가(Open)**: 시작 가격\n- **종가(Close)**: 끝 가격\n- **고가(High)**: 최고 가격\n- **저가(Low)**: 최저 가격',
        type: 'read',
      },
      {
        title: '초록 vs 빨강',
        content: '양봉(초록): 종가 > 시가 (가격이 올랐다)\n- 몸통 아래: 시가\n- 몸통 위: 종가\n\n음봉(빨강): 종가 < 시가 (가격이 내렸다)\n- 몸통 위: 시가\n- 몸통 아래: 종가\n\n위아래 꼬리(심지)는 고가와 저가를 나타내.',
        type: 'read',
      },
      {
        title: '캔들 모양으로 읽는 시장',
        content: '**긴 초록 몸통**: 강한 상승세\n**긴 빨강 몸통**: 강한 하락세\n**짧은 몸통 + 긴 꼬리**: 변동이 컸지만 결국 제자리\n**도지(Doji)**: 시가 = 종가, 시장이 망설이는 중\n\n시간대도 중요해: 1분봉, 15분봉, 1시간봉, 1일봉 등 설정 가능.',
        type: 'read',
      },
      {
        title: '실제 차트 보기',
        content: '업비트나 TradingView에서 실제 BTC 차트를 열어봐.\n\n1. 시간대를 "1일(1D)"로 설정\n2. 최근 캔들이 초록인지 빨강인지 확인\n3. 긴 꼬리가 있는 캔들을 찾아봐\n\n차트를 많이 볼수록 패턴이 보이기 시작해.',
        type: 'verify',
        verifyText: '캔들스틱 차트를 읽을 수 있게 됐어요',
      },
    ],
    quiz: [
      {
        question: '초록색 캔들(양봉)은 무엇을 의미할까?',
        options: ['가격이 내렸다', '가격이 올랐다', '거래량이 많았다', '시장이 닫혔다'],
        correctIndex: 1,
        explanation: '초록(양봉)은 종가가 시가보다 높다 = 가격이 올랐다는 뜻이야.',
      },
    ],
  },
  {
    id: 9,
    floor: 9,
    slug: 'gas-fees',
    title: '가스비란? 싸게 보내는 법',
    description: '블록체인 수수료의 원리와 절약법',
    icon: 'Fuel',
    difficulty: 'medium',
    xp: 150,
    estimatedMinutes: 10,
    category: '온체인',
    steps: [
      {
        title: '가스비란?',
        content: '가스비(Gas Fee)는 블록체인에서 거래를 처리하는 수수료야.\n\n비유하면:\n- 택배를 보내려면 배송비가 필요하듯\n- 블록체인에서 코인을 보내려면 가스비가 필요해\n\n이더리움에서는 ETH로, 솔라나에서는 SOL로 수수료를 내.',
        type: 'read',
      },
      {
        title: '가스비가 비쌀 때/쌀 때',
        content: '가스비는 고정이 아니라 **실시간으로 변해**.\n\n비싼 경우:\n- 인기 NFT 민팅 때\n- 시장이 급등/급락할 때\n- 많은 사람이 동시에 거래할 때\n\n싼 경우:\n- 새벽 시간 (한국 기준 새벽 3~6시)\n- 시장이 조용할 때\n- 주말',
        type: 'read',
      },
      {
        title: '가스비 절약법',
        content: '1. **타이밍**: 한국 기준 새벽~아침에 거래\n2. **L2 네트워크 사용**: Arbitrum, Optimism, Base 등은 이더리움보다 10~100배 저렴\n3. **가스 추적**: etherscan.io/gastracker 에서 현재 가스비 확인\n4. **일괄 처리**: 여러 거래를 한 번에\n\n솔라나는 기본적으로 가스비가 매우 저렴해 (0.01달러 미만).',
        type: 'read',
      },
      {
        title: '가스비 확인해보기',
        content: 'etherscan.io/gastracker 에 접속해서 현재 가스비를 확인해봐.\n\n- **Low**: 느리지만 저렴\n- **Average**: 보통 속도\n- **High**: 빠르지만 비쌈\n\n급하지 않으면 Low로 보내도 몇 분이면 완료돼.',
        type: 'verify',
        verifyText: '가스비 개념을 이해했어요',
      },
    ],
  },
  {
    id: 10,
    floor: 10,
    slug: 'first-swap-uniswap',
    title: '첫 스왑: Uniswap 체험',
    description: 'DEX에서 직접 토큰을 교환해보자',
    icon: 'ArrowLeftRight',
    difficulty: 'hard',
    xp: 200,
    estimatedMinutes: 20,
    category: '디파이',
    steps: [
      {
        title: 'Uniswap이란?',
        content: 'Uniswap은 세계 최대의 탈중앙화 거래소(DEX)야.\n\n특징:\n- 지갑만 연결하면 바로 거래 가능\n- 본인인증 불필요\n- 수천 개의 토큰 거래 가능\n- AMM(자동 마켓 메이커) 방식\n\n"누구나 만든 토큰도 거래할 수 있다"는 게 CEX와의 가장 큰 차이야.',
        type: 'read',
      },
      {
        title: 'Uniswap 접속 + 지갑 연결',
        content: '1. **app.uniswap.org** 접속 (공식 URL 확인!)\n2. 우측 상단 "Connect Wallet" 클릭\n3. MetaMask 선택\n4. 메타마스크에서 연결 승인\n\n연결 시 "이 사이트에 권한을 줄까요?" 팝업이 뜨면 내용을 확인하고 승인해.',
        type: 'action',
        verifyText: 'Uniswap에 지갑을 연결했어요',
      },
      {
        title: '토큰 스왑하기',
        content: '**테스트넷으로 연습하려면:**\n- 메타마스크에서 Sepolia 네트워크 선택\n- Sepolia ETH로 스왑 연습\n\n**메인넷으로 실제 스왑:**\n1. "Swap" 탭 선택\n2. 보내는 토큰: ETH\n3. 받는 토큰: USDC (또는 원하는 토큰)\n4. 금액 입력\n5. "Swap" 클릭 → 메타마스크에서 승인\n\n가스비가 표시되니 확인하고 진행해.',
        type: 'action',
        verifyText: '스왑을 실행해봤어요 (테스트넷 OK)',
      },
      {
        title: '슬리피지란?',
        content: '**슬리피지(Slippage)**는 주문 가격과 실제 체결 가격의 차이야.\n\nDEX에서는 유동성에 따라 가격이 변할 수 있어:\n- 기본 설정: 0.5%\n- 변동성 큰 토큰: 1~3%로 올려야 체결됨\n- 너무 높으면 불리한 가격에 체결될 수 있어\n\n설정에서 슬리피지를 조절할 수 있어.',
        type: 'verify',
        verifyText: 'DEX 스왑의 원리를 이해했어요',
      },
    ],
    quiz: [
      {
        question: 'Uniswap 같은 DEX의 장점이 아닌 것은?',
        options: ['본인인증 불필요', '다양한 토큰 거래 가능', '원화(KRW) 입금 가능', '내 지갑에서 직접 거래'],
        correctIndex: 2,
        explanation: 'DEX는 원화 입금이 안 돼. 원화 거래는 CEX(업비트 등)에서만 가능해.',
      },
    ],
  },
];

export function getQuestById(id: number): Quest | undefined {
  return quests.find(q => q.id === id);
}

export function getQuestByFloor(floor: number): Quest | undefined {
  return quests.find(q => q.floor === floor);
}

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
  {
    id: 11,
    floor: 11,
    slug: 'what-is-airdrop',
    title: '에어드랍이란? 무료 코인 받기',
    description: '프로젝트가 공짜로 코인을 뿌리는 이유와 참여법',
    icon: 'Gift',
    difficulty: 'easy',
    xp: 150,
    estimatedMinutes: 10,
    category: '에어드랍',
    steps: [
      {
        title: '에어드랍이 뭐야?',
        content: '에어드랍(Airdrop)은 블록체인 프로젝트가 유저에게 무료로 토큰을 나눠주는 이벤트야.\n\n왜 공짜로 줄까?\n- **마케팅**: 많은 사람에게 프로젝트를 알리려고\n- **커뮤니티 구축**: 초기 유저를 확보하려고\n- **탈중앙화**: 토큰을 널리 분배하려고\n\n유니스왑(UNI), 아비트럼(ARB) 에어드랍은 수백~수천만 원 가치였어.',
        type: 'read',
      },
      {
        title: '에어드랍의 종류',
        content: '**1. 리트로액티브 에어드랍**\n- 과거에 프로토콜을 사용한 유저에게 보상\n- 예: 유니스왑 사용자에게 UNI 토큰 지급\n\n**2. 태스크 기반 에어드랍**\n- 특정 작업(트위터 팔로우, 디스코드 참여 등) 완료 시 지급\n- 예: Galxe, Layer3 퀘스트\n\n**3. 홀더 에어드랍**\n- 특정 토큰/NFT 보유자에게 지급\n- 예: APE 홀더에게 새 토큰 지급',
        type: 'read',
      },
      {
        title: '에어드랍 참여 준비',
        content: '에어드랍을 받으려면:\n\n1. **메타마스크 지갑** 준비 (이미 했지!)\n2. **여러 체인 추가**: Arbitrum, Optimism, Base 등\n3. **소액의 ETH** 보유 (가스비용)\n4. **새 프로토콜 적극 사용**: 브릿지, 스왑, 스테이킹\n5. **꾸준히 활동**: 1~2번이 아니라 매달 꾸준히\n\n핵심: "아직 토큰이 없는 프로젝트"를 미리 사용하는 거야.',
        type: 'action',
        verifyText: '에어드랍 참여 방법을 이해했어요',
      },
      {
        title: '주의사항',
        content: '에어드랍 사기 조심!\n\n- **시드 구문 요구** → 100% 사기\n- **먼저 입금해야 받을 수 있다** → 사기\n- **모르는 토큰이 지갑에** → 건드리지 마 (스캠 토큰)\n- **의심스러운 링크** → 클릭 금지\n\n공식 채널(트위터, 디스코드)에서만 정보를 확인해.',
        type: 'verify',
        verifyText: '에어드랍 주의사항을 숙지했어요',
      },
    ],
    quiz: [
      {
        question: '에어드랍을 받기 위해 "먼저 0.1 ETH를 보내주세요"라고 하면?',
        options: ['빨리 보낸다', '소액만 보낸다', '100% 사기이므로 무시한다', '친구에게 물어본다'],
        correctIndex: 2,
        explanation: '정상적인 에어드랍은 절대 먼저 돈을 보내라고 하지 않아. 무조건 사기야.',
      },
      {
        question: '리트로액티브 에어드랍이란?',
        options: ['트위터 팔로우하면 받는 것', '과거에 프로토콜을 사용한 유저에게 보상하는 것', 'NFT를 보유하면 받는 것', '거래소에서 신청하는 것'],
        correctIndex: 1,
        explanation: '리트로액티브는 "소급 적용"이라는 뜻으로, 과거 사용 기록에 대해 보상해주는 방식이야.',
      },
    ],
  },
  {
    id: 12,
    floor: 12,
    slug: 'what-is-nft',
    title: 'NFT란? 디지털 소유권',
    description: 'NFT의 개념과 활용법을 배우자',
    icon: 'Image',
    difficulty: 'easy',
    xp: 150,
    estimatedMinutes: 10,
    category: 'NFT',
    steps: [
      {
        title: 'NFT가 뭐야?',
        content: 'NFT = Non-Fungible Token (대체 불가능한 토큰)\n\n쉽게 말하면 **디지털 소유권 증명서**야.\n\n비트코인은 1 BTC = 1 BTC (서로 교환 가능, Fungible)\nNFT는 각각이 고유해 (대체 불가능, Non-Fungible)\n\n예: 모나리자 원본은 하나뿐이듯, NFT도 각각 유일해.',
        type: 'read',
      },
      {
        title: 'NFT로 뭘 할 수 있어?',
        content: 'NFT의 활용:\n\n- **디지털 아트**: 그림, 음악, 영상의 소유권\n- **PFP (프로필 사진)**: BAYC, CryptoPunks 등\n- **게임 아이템**: 게임 내 무기, 캐릭터\n- **멤버십**: 커뮤니티 접근 권한\n- **티켓**: 콘서트, 이벤트 입장권\n- **도메인**: ENS (.eth 주소)\n\nNFT = 그림만 아니야. 소유권이 필요한 모든 곳에 쓸 수 있어.',
        type: 'read',
      },
      {
        title: 'NFT는 어디서 거래해?',
        content: '주요 NFT 마켓플레이스:\n\n- **OpenSea**: 가장 큰 NFT 마켓 (이더리움, 폴리곤, 솔라나)\n- **Blur**: 트레이더에게 인기 (이더리움)\n- **Magic Eden**: 솔라나 NFT 1위\n- **Rarible**: 다양한 체인 지원\n\n구경은 무료! opensea.io에서 어떤 NFT들이 있는지 둘러봐.',
        type: 'action',
        verifyText: 'NFT 마켓플레이스를 둘러봤어요',
      },
      {
        title: 'NFT 투자 주의사항',
        content: 'NFT 시장의 현실:\n\n- 대부분의 NFT는 시간이 지나면 가치가 떨어져\n- "바닥가(Floor Price)"가 0에 수렴하는 프로젝트가 대다수\n- 유행을 따라 사면 높은 확률로 손해\n- 예술적 가치, 유틸리티, 커뮤니티를 잘 봐야 해\n\n투자보다는 기술과 개념을 이해하는 데 집중하자.',
        type: 'verify',
        verifyText: 'NFT 개념과 주의사항을 이해했어요',
      },
    ],
    quiz: [
      {
        question: 'NFT의 "Non-Fungible"은 무슨 뜻일까?',
        options: ['대체 가능한', '대체 불가능한', '무료인', '디지털인'],
        correctIndex: 1,
        explanation: 'Non-Fungible = 대체 불가능. 각 NFT는 고유하여 다른 것과 1:1 교환이 안 돼.',
      },
    ],
  },
  {
    id: 13,
    floor: 13,
    slug: 'withdraw-to-metamask',
    title: '업비트에서 메타마스크로 출금',
    description: '거래소에서 내 지갑으로 코인을 옮기자',
    icon: 'Send',
    difficulty: 'medium',
    xp: 200,
    estimatedMinutes: 15,
    category: '지갑',
    steps: [
      {
        title: '왜 출금해야 할까?',
        content: '거래소에 코인을 두면:\n- 거래소가 해킹당하면 내 코인도 위험\n- 디파이, 에어드랍 등을 이용할 수 없어\n- 거래소가 출금을 막을 수도 있어\n\n내 지갑(메타마스크)으로 옮기면:\n- 내가 직접 관리 (진정한 소유)\n- DEX, 디파이 자유롭게 이용 가능\n- "Not your keys, not your coins"',
        type: 'read',
      },
      {
        title: '출금 전 체크리스트',
        content: '출금 전에 반드시 확인:\n\n1. **네트워크 확인**: 보내는 쪽과 받는 쪽의 네트워크가 같아야 해!\n   - 이더리움(ERC-20) → 메타마스크 이더리움 네트워크\n   - 잘못된 네트워크로 보내면 코인 잃을 수 있어\n\n2. **주소 확인**: 메타마스크 주소를 정확히 복사\n   - 처음 2글자, 마지막 4글자 꼭 대조\n\n3. **소액 테스트**: 처음엔 최소 금액으로 테스트!',
        type: 'read',
      },
      {
        title: '실제 출금하기',
        content: '업비트에서 출금 방법:\n\n1. 업비트 앱 → "입출금" 탭\n2. 보낼 코인 선택 (예: ETH)\n3. "출금" 클릭\n4. **출금 네트워크** 선택 (ERC20 = 이더리움)\n5. 메타마스크에서 주소 복사 → 붙여넣기\n6. 금액 입력 (처음엔 최소 금액!)\n7. 2단계 인증 후 출금 신청\n\n보통 5~30분 후에 메타마스크에 도착해.',
        type: 'action',
        verifyText: '출금을 실행했어요 (또는 과정을 이해했어요)',
      },
      {
        title: '도착 확인',
        content: '메타마스크에서 확인:\n- 이더리움 네트워크 선택 상태인지 확인\n- 잔액이 늘었으면 성공!\n\nEtherscan에서도 확인 가능:\n- 내 주소 검색 → 최근 트랜잭션에 "IN" 표시\n\n축하해! 이제 진정한 의미에서 코인의 주인이 됐어.',
        type: 'verify',
        verifyText: '메타마스크에서 코인을 확인했어요',
      },
    ],
  },
  {
    id: 14,
    floor: 14,
    slug: 'crypto-tax-basics',
    title: '코인 세금: 알아야 할 것들',
    description: '가상자산 과세 기초와 대비법',
    icon: 'Receipt',
    difficulty: 'easy',
    xp: 150,
    estimatedMinutes: 10,
    category: '기초',
    steps: [
      {
        title: '코인에 세금이 붙어?',
        content: '한국에서 가상자산 수익에 세금이 부과될 예정이야.\n\n현재 상황:\n- 가상자산 과세는 여러 번 유예됨\n- 기본 공제 250만원\n- 250만원 초과 수익에 대해 22% (소득세 20% + 지방세 2%)\n\n예시: 1,000만원 수익 시\n→ 1,000만 - 250만(공제) = 750만 × 22% = 165만원 세금',
        type: 'read',
      },
      {
        title: '과세 대상 거래',
        content: '세금이 발생하는 경우:\n- 코인을 팔아서 원화로 바꿀 때\n- 코인으로 다른 코인을 살 때 (교환)\n- 코인으로 물건을 살 때\n\n세금이 안 발생하는 경우:\n- 코인을 그냥 보유만 할 때\n- 코인을 다른 지갑으로 이동할 때\n- 에어드랍 받을 때 (받는 시점에는 아님, 팔 때 발생)',
        type: 'read',
      },
      {
        title: '세금 대비하는 법',
        content: '미리 준비해두면 좋은 것들:\n\n1. **거래 기록 저장**: 거래소에서 거래내역 CSV 다운로드\n2. **매수가 기록**: 언제, 얼마에 샀는지 기록\n3. **DeFi 거래도 기록**: 스왑, 스테이킹 등\n4. **세금 계산 도구 활용**: 코인리, 택스비트 등\n\n지금부터 기록하는 습관을 들이면 나중에 편해.',
        type: 'action',
        verifyText: '세금 관련 기초를 이해했어요',
      },
      {
        title: '꿀팁',
        content: '알아두면 좋은 것들:\n\n- 250만원 기본 공제 = 연간 250만원까지 비과세\n- 손실도 상계 가능 (이익 - 손실 = 순이익에만 과세)\n- 해외 거래소 수익도 신고 대상\n- 과세 시작 시점을 확인하고 대비하자\n\n법이 자주 바뀌니 국세청 공지를 체크해.',
        type: 'verify',
        verifyText: '세금 대비 방법을 숙지했어요',
      },
    ],
    quiz: [
      {
        question: '한국 가상자산 과세의 기본 공제 금액은?',
        options: ['100만원', '250만원', '500만원', '1,000만원'],
        correctIndex: 1,
        explanation: '연간 250만원까지는 비과세. 초과분에 대해 22% 과세돼.',
      },
    ],
  },
  {
    id: 15,
    floor: 15,
    slug: 'what-is-staking',
    title: '스테이킹: 코인으로 이자 받기',
    description: '코인을 맡기고 수익을 얻는 방법',
    icon: 'Landmark',
    difficulty: 'medium',
    xp: 200,
    estimatedMinutes: 12,
    category: '디파이',
    steps: [
      {
        title: '스테이킹이란?',
        content: '스테이킹(Staking)은 코인을 네트워크에 맡기고 보상을 받는 거야.\n\n비유하면:\n- 은행에 돈을 예금하면 이자를 주듯\n- 블록체인에 코인을 맡기면 보상을 줘\n\n하지만 은행과 달리:\n- 수익률이 훨씬 높을 수 있고 (연 3~20%)\n- 원금 손실 위험도 있어 (코인 가격 하락)',
        type: 'read',
      },
      {
        title: 'PoS와 스테이킹',
        content: 'PoS(Proof of Stake)란?\n- 코인을 많이 맡긴 사람이 거래를 검증하는 방식\n- 검증 대가로 새 코인을 보상으로 받아\n\nPoS 대표 코인:\n- **이더리움(ETH)**: 연 3~5%\n- **솔라나(SOL)**: 연 6~8%\n- **카르다노(ADA)**: 연 4~6%\n- **폴카닷(DOT)**: 연 10~15%\n\n비트코인은 PoW(작업증명)라 스테이킹 불가.',
        type: 'read',
      },
      {
        title: '스테이킹하는 방법',
        content: '스테이킹하는 3가지 방법:\n\n**1. 거래소 스테이킹 (가장 쉬움)**\n- 업비트, 빗썸에서 "스테이킹" 메뉴\n- 클릭 한 번으로 끝\n- 수수료 있음\n\n**2. 리퀴드 스테이킹 (추천)**\n- Lido(stETH), Rocket Pool(rETH)\n- 스테이킹하면서 토큰을 DeFi에도 활용 가능\n\n**3. 직접 밸리데이터 운영 (고급)**\n- ETH 32개 필요 (매우 고가)\n- 서버 운영 필요',
        type: 'read',
      },
      {
        title: '리스크 체크',
        content: '스테이킹 리스크:\n\n- **가격 하락**: 이자를 받아도 코인 가격이 떨어지면 손해\n- **락업 기간**: 일정 기간 출금 불가능한 경우도 있음\n- **슬래싱**: 밸리데이터가 잘못하면 일부 코인을 잃을 수 있음\n- **스마트 컨트랙트 위험**: 해킹 가능성\n\nAPY(연이율)가 너무 높으면 (50%+) 의심해야 해. 지속 불가능한 수익률은 대부분 사기야.',
        type: 'verify',
        verifyText: '스테이킹의 원리와 리스크를 이해했어요',
      },
    ],
    quiz: [
      {
        question: '스테이킹 수익률(APY)이 200%라고 광고하는 프로젝트가 있다면?',
        options: ['빨리 참여한다', '소액만 넣어본다', '지속 불가능한 수익률이므로 의심한다', '친구에게 추천한다'],
        correctIndex: 2,
        explanation: '비정상적으로 높은 APY는 대부분 폰지 사기야. 일반적인 스테이킹은 연 3~15% 수준이야.',
      },
      {
        question: '리퀴드 스테이킹의 장점은?',
        options: ['수익률이 더 높다', '스테이킹하면서 토큰을 DeFi에도 활용 가능', '절대 손실이 없다', '비트코인도 스테이킹 가능'],
        correctIndex: 1,
        explanation: 'Lido 같은 리퀴드 스테이킹은 stETH 토큰을 받아 다른 DeFi에서도 활용할 수 있어.',
      },
    ],
  },
  {
    id: 16,
    floor: 16,
    slug: 'avoid-scams',
    title: '사기 피하는 법: 러그풀 & 피싱',
    description: '크립토 사기 유형과 자산 보호법',
    icon: 'ShieldAlert',
    difficulty: 'easy',
    xp: 150,
    estimatedMinutes: 10,
    category: '보안',
    steps: [
      {
        title: '러그풀이란?',
        content: '러그풀(Rug Pull) = "카펫을 당겨 빼다"\n\n프로젝트 개발자가 투자금을 모은 뒤 갑자기 사라지는 사기야.\n\n과정:\n1. 그럴듯한 프로젝트 만들기 (웹사이트, 로드맵)\n2. 소셜 미디어에서 홍보 & 가격 올리기\n3. 충분히 오르면 → 개발자가 전부 매도\n4. 가격 폭락 → 투자자들만 손해\n\n밈코인에서 특히 많이 발생해.',
        type: 'read',
      },
      {
        title: '피싱 사기',
        content: '피싱(Phishing) = 가짜 사이트/메시지로 정보를 빼내는 사기\n\n크립토 피싱 유형:\n- **가짜 사이트**: uniswop.com (진짜는 uniswap)\n- **가짜 에어드랍**: "무료 코인 받기" 링크\n- **가짜 고객센터**: DM으로 "도와드릴게요"\n- **승인(Approve) 사기**: 악성 컨트랙트에 서명 유도\n\n절대 DM으로 온 링크를 클릭하지 마!',
        type: 'read',
      },
      {
        title: '사기 감별법',
        content: '이런 프로젝트는 의심해:\n\n- 익명 개발팀 + 확인 불가능한 이력\n- "확정 수익" 약속 (투자에 확정은 없어)\n- APY 100%+ (지속 불가능)\n- 출금 제한 또는 "더 넣어야 출금 가능"\n- FOMO 조장 ("지금 안 사면 늦어!")\n- 유명인이 홍보한다고 주장\n\nDYOR = Do Your Own Research. 항상 직접 조사해.',
        type: 'read',
      },
      {
        title: '자산 보호 체크리스트',
        content: '내 자산을 지키는 습관:\n\n1. **URL 직접 입력**: 검색 결과 클릭 X, 북마크 사용\n2. **시드 구문 절대 비밀**: 누구에게도 알려주지 마\n3. **소액 테스트**: 큰 금액 보내기 전 항상 소액부터\n4. **Revoke 주기적으로**: revoke.cash에서 불필요한 승인 취소\n5. **별도 지갑**: 에어드랍/디파이용 지갑을 분리\n6. **2FA 활성화**: 거래소 계정에 2단계 인증 필수',
        type: 'verify',
        verifyText: '사기 유형과 보호법을 숙지했어요',
      },
    ],
    quiz: [
      {
        question: '디스코드에서 "공식 고객센터"라며 DM으로 시드 구문을 요청하면?',
        options: ['알려준다', '일부만 알려준다', '100% 사기이므로 차단한다', '이메일로 보낸다'],
        correctIndex: 2,
        explanation: '진짜 고객센터는 절대 DM으로 시드 구문을 요구하지 않아. 무조건 사기야.',
      },
    ],
  },
  {
    id: 17,
    floor: 17,
    slug: 'moving-average',
    title: '이동평균선 읽는 법',
    description: '차트의 추세를 파악하는 기본 도구',
    icon: 'TrendingUp',
    difficulty: 'medium',
    xp: 150,
    estimatedMinutes: 12,
    category: '트레이딩',
    steps: [
      {
        title: '이동평균선이란?',
        content: '이동평균선(MA, Moving Average)은 일정 기간의 평균 가격을 선으로 연결한 거야.\n\n예: 20일 이동평균선 = 최근 20일 종가의 평균\n\n가격의 단기 변동을 무시하고 **큰 추세**를 볼 수 있게 해줘.\n\n차트에서 부드러운 곡선으로 표시돼.',
        type: 'read',
      },
      {
        title: '주요 이동평균선',
        content: '자주 사용하는 이동평균선:\n\n- **MA 20 (20일선)**: 단기 추세 (약 1달)\n- **MA 50 (50일선)**: 중기 추세 (약 2.5달)\n- **MA 200 (200일선)**: 장기 추세 (약 10달)\n\n가격이 이동평균선 위에 있으면 → 상승 추세\n가격이 이동평균선 아래에 있으면 → 하락 추세\n\n200일선은 "불/베어 마켓 구분선"이라고도 불려.',
        type: 'read',
      },
      {
        title: '골든크로스 & 데드크로스',
        content: '두 이동평균선이 교차하는 순간이 중요해:\n\n**골든크로스 (Golden Cross)**\n- 단기선(50일)이 장기선(200일)을 위로 돌파\n- 상승 신호로 해석\n\n**데드크로스 (Death Cross)**\n- 단기선(50일)이 장기선(200일)을 아래로 돌파\n- 하락 신호로 해석\n\n주의: 후행 지표라서 이미 움직임이 시작된 후에 나타나.',
        type: 'read',
      },
      {
        title: '실제 차트에서 확인',
        content: 'TradingView에서 확인해보자:\n\n1. tradingview.com 접속\n2. BTC/USD 차트 열기\n3. "Indicators" 클릭 → "MA" 또는 "Moving Average" 검색\n4. 기간을 20, 50, 200으로 각각 추가\n5. 현재 가격이 각 선 위에 있는지 아래에 있는지 확인\n\n이동평균선 하나만으로 매매하면 안 돼. 참고 지표로만 활용해.',
        type: 'verify',
        verifyText: '이동평균선 읽는 법을 배웠어요',
      },
    ],
  },
  {
    id: 18,
    floor: 18,
    slug: 'layer1-vs-layer2',
    title: '레이어1 vs 레이어2',
    description: '블록체인 확장성 문제와 L2 솔루션',
    icon: 'Layers',
    difficulty: 'medium',
    xp: 150,
    estimatedMinutes: 10,
    category: '기초',
    steps: [
      {
        title: '레이어1이란?',
        content: '레이어1(L1)은 기본 블록체인 네트워크 자체야.\n\n대표적인 L1:\n- **이더리움(Ethereum)**: 가장 큰 스마트 컨트랙트 플랫폼\n- **솔라나(Solana)**: 빠르고 저렴\n- **비트코인(Bitcoin)**: 최초의 블록체인\n- **아발란체(Avalanche)**: 높은 처리량\n\nL1의 문제: 사용자가 많아지면 느려지고 비싸져 (이더리움 가스비 급등).',
        type: 'read',
      },
      {
        title: '레이어2란?',
        content: '레이어2(L2)는 L1 위에 만들어진 확장 솔루션이야.\n\n비유: 고속도로(L1)가 막히면 위에 고가도로(L2)를 건설하는 거야.\n\n대표적인 L2 (이더리움 기반):\n- **Arbitrum**: TVL 1위 L2\n- **Optimism**: OP 토큰, 슈퍼체인\n- **Base**: 코인베이스가 만든 L2\n- **zkSync**: 영지식 증명 기반\n\nL2에서 거래하면 이더리움 수수료의 1/10~1/100.',
        type: 'read',
      },
      {
        title: '롤업이 뭐야?',
        content: 'L2의 핵심 기술은 **롤업(Rollup)**이야.\n\n여러 거래를 모아서(roll up) L1에 한 번에 기록하는 방식.\n\n**옵티미스틱 롤업** (Arbitrum, Optimism, Base):\n- 일단 거래가 정당하다고 가정\n- 이의가 있으면 검증 (7일 챌린지 기간)\n\n**ZK 롤업** (zkSync, Starknet, Scroll):\n- 수학적 증명으로 거래의 정당성을 즉시 검증\n- 더 빠르지만 기술적으로 복잡',
        type: 'read',
      },
      {
        title: '언제 L2를 쓸까?',
        content: 'L2 사용이 좋은 경우:\n- 자주 거래할 때 (가스비 절약)\n- 소액 거래할 때 (L1은 수수료가 거래액보다 클 수 있음)\n- 디파이, NFT 등을 저렴하게 이용할 때\n\nL1을 쓰는 경우:\n- 큰 금액을 이동할 때 (보안이 더 중요)\n- L1에서만 가능한 기능이 있을 때\n\n메타마스크에 Arbitrum, Base 등을 추가해서 사용해봐!',
        type: 'verify',
        verifyText: 'L1과 L2의 차이를 이해했어요',
      },
    ],
    quiz: [
      {
        question: '레이어2의 주요 장점은?',
        options: ['보안이 L1보다 높다', '가스비가 저렴하고 빠르다', '비트코인을 스테이킹할 수 있다', '원화 입금이 가능하다'],
        correctIndex: 1,
        explanation: 'L2는 거래를 L1 밖에서 처리하므로 가스비가 훨씬 저렴하고 빨라.',
      },
    ],
  },
  {
    id: 19,
    floor: 19,
    slug: 'bridge-chains',
    title: '브릿지로 체인 이동하기',
    description: '다른 블록체인으로 코인을 옮기는 방법',
    icon: 'Unplug',
    difficulty: 'hard',
    xp: 200,
    estimatedMinutes: 15,
    category: '온체인',
    steps: [
      {
        title: '브릿지란?',
        content: '브릿지(Bridge)는 서로 다른 블록체인 사이에 자산을 옮기는 도구야.\n\n비유: 각 블록체인은 다른 나라. 브릿지는 국경을 넘는 다리.\n\n예시:\n- 이더리움의 ETH → Arbitrum으로 이동\n- 이더리움의 USDC → Base로 이동\n- 솔라나의 SOL → 이더리움으로 이동',
        type: 'read',
      },
      {
        title: '주요 브릿지 서비스',
        content: '추천 브릿지:\n\n**공식 브릿지 (가장 안전)**\n- Arbitrum Bridge: bridge.arbitrum.io\n- Base Bridge: bridge.base.org\n- Optimism Bridge: app.optimism.io/bridge\n\n**서드파티 브릿지 (빠르고 편함)**\n- Stargate: 여러 체인 지원\n- Across: 빠른 전송\n- Orbiter Finance: 저렴한 수수료\n\n공식 브릿지는 안전하지만 느릴 수 있어 (7일). 서드파티는 빠르지만 추가 리스크 있음.',
        type: 'read',
      },
      {
        title: '브릿지 사용법',
        content: '기본 과정:\n\n1. 브릿지 사이트 접속 (공식 URL 확인!)\n2. 메타마스크 연결\n3. **From**: 보내는 체인 선택 (예: Ethereum)\n4. **To**: 받는 체인 선택 (예: Arbitrum)\n5. 금액 입력\n6. "Bridge" 클릭 → 메타마스크에서 승인\n7. 도착까지 대기 (수 분~수 시간)\n\n처음에는 소액으로 테스트! 큰 금액은 반드시 소액 테스트 후.',
        type: 'action',
        verifyText: '브릿지 사용법을 이해했어요',
      },
      {
        title: '주의사항',
        content: '브릿지 사용 시 주의:\n\n- **가짜 브릿지 사이트 주의**: URL 꼭 확인\n- **수수료 비교**: 브릿지마다 수수료가 다름\n- **가스비 필요**: 도착 체인에서도 가스비가 필요해\n  - Arbitrum에 도착하면 Arbitrum ETH가 필요\n- **시간**: 공식 브릿지는 느릴 수 있음 (OP 7일)\n- **소액 테스트**: 항상 먼저 소액으로!',
        type: 'verify',
        verifyText: '브릿지 주의사항을 숙지했어요',
      },
    ],
  },
  {
    id: 20,
    floor: 20,
    slug: 'amm-liquidity-pool',
    title: '유동성 풀 & AMM 이해하기',
    description: 'DEX의 핵심 원리를 배우자',
    icon: 'Waves',
    difficulty: 'hard',
    xp: 250,
    estimatedMinutes: 15,
    category: '디파이',
    steps: [
      {
        title: 'AMM이란?',
        content: 'AMM = Automated Market Maker (자동 마켓 메이커)\n\n전통 거래소: 매수자와 매도자가 직접 매칭 (오더북)\nDEX (AMM): 알고리즘이 자동으로 가격을 결정\n\n공식: x × y = k\n- x: 토큰 A의 양\n- y: 토큰 B의 양\n- k: 상수 (항상 일정)\n\n한쪽 토큰을 빼면(사면) 다른 쪽이 늘어나면서 가격이 자동 조절돼.',
        type: 'read',
      },
      {
        title: '유동성 풀이란?',
        content: '유동성 풀(Liquidity Pool, LP)은 거래를 위해 코인을 모아둔 "저수지"야.\n\n작동 방식:\n1. 유동성 공급자(LP)가 두 토큰을 동일한 가치만큼 풀에 넣어\n   예: 1 ETH + 2,000 USDC\n2. 거래자가 풀에서 스왑할 때 수수료 발생\n3. 수수료가 LP에게 분배됨\n\nLP가 되면 거래 수수료의 일부를 벌 수 있어!',
        type: 'read',
      },
      {
        title: '비영구적 손실',
        content: '**비영구적 손실(Impermanent Loss, IL)**은 LP가 알아야 할 가장 중요한 리스크야.\n\n간단히 설명하면:\n- 풀에 넣은 두 토큰의 가격 비율이 변하면 손실 발생\n- 가격이 크게 움직일수록 손실 커짐\n- "비영구적"이라고 하지만 출금하면 영구적이 됨\n\n예: ETH/USDC 풀에 넣었는데 ETH가 2배 오르면\n→ 그냥 들고 있었을 때보다 약 5.7% 손실\n\n거래 수수료 수익 > IL이면 이익.',
        type: 'read',
      },
      {
        title: 'LP 참여 방법',
        content: 'Uniswap에서 LP 되는 법:\n\n1. app.uniswap.org → "Pool" 탭\n2. "New Position" 클릭\n3. 토큰 쌍 선택 (예: ETH/USDC)\n4. 수수료 티어 선택 (0.05%, 0.3%, 1%)\n5. 가격 범위 설정 (Uniswap V3)\n6. 금액 입력 → 승인 → 공급\n\n처음에는 스테이블코인 쌍(USDC/USDT)이 안전해.\nIL이 거의 없거든.\n\n충분히 이해한 후에 소액으로 시작해봐!',
        type: 'verify',
        verifyText: 'AMM과 유동성 풀을 이해했어요',
      },
    ],
    quiz: [
      {
        question: 'AMM에서 가격을 결정하는 것은?',
        options: ['거래소 운영자', '정부', '수학적 알고리즘 (x*y=k)', '가장 많이 주문한 사람'],
        correctIndex: 2,
        explanation: 'AMM은 x × y = k 공식으로 자동으로 가격을 결정해. 사람이 개입하지 않아.',
      },
      {
        question: '유동성 풀에 자금을 넣으면 얻는 수익은?',
        options: ['이자', '거래 수수료의 일부', '에어드랍', '마이닝 보상'],
        correctIndex: 1,
        explanation: 'LP는 풀에서 발생하는 거래 수수료의 일부를 보상으로 받아.',
      },
    ],
  },
  {
    id: 21,
    floor: 21,
    slug: 'dao-governance',
    title: 'DAO와 거버넌스 투표',
    description: '탈중앙 자치 조직에 참여하는 법',
    icon: 'Vote',
    difficulty: 'medium',
    xp: 200,
    estimatedMinutes: 12,
    category: '기초',
    steps: [
      {
        title: 'DAO란?',
        content: 'DAO = Decentralized Autonomous Organization (탈중앙 자치 조직)\n\n쉽게 말하면 **토큰 보유자들이 투표로 운영하는 조직**이야.\n\n회사와 비교:\n- 회사: CEO가 결정 → 직원이 실행\n- DAO: 토큰 보유자가 투표 → 스마트 컨트랙트가 실행\n\n예: Uniswap DAO는 UNI 토큰 보유자들이 수수료율, 개발 방향 등을 투표로 결정해.',
        type: 'read',
      },
      {
        title: '거버넌스 투표란?',
        content: '거버넌스(Governance) = DAO에서 의사결정하는 과정\n\n투표 과정:\n1. 누군가 **제안(Proposal)** 올림\n   예: "수수료를 0.3%에서 0.1%로 낮추자"\n2. 커뮤니티에서 **토론**\n3. 토큰 보유자들이 **투표** (찬성/반대)\n4. 통과되면 **실행**\n\n토큰이 많을수록 투표권이 커. 1 토큰 = 1 표.\n일부 DAO는 위임(Delegate)도 가능해.',
        type: 'read',
      },
      {
        title: '실제 DAO 구경하기',
        content: '주요 DAO 플랫폼:\n\n- **Snapshot**: snapshot.org - 가장 많이 쓰는 투표 플랫폼 (가스비 무료)\n- **Tally**: tally.xyz - 온체인 거버넌스\n- **Boardroom**: boardroom.io - DAO 대시보드\n\nsnapshot.org에 접속해서:\n1. 아무 DAO 검색 (예: Uniswap, Aave, Arbitrum)\n2. 진행 중인 제안(Proposal) 읽어보기\n3. 투표 결과가 어떻게 나왔는지 확인\n\n구경은 지갑 연결 없이도 가능해!',
        type: 'action',
        verifyText: 'Snapshot에서 DAO 제안을 둘러봤어요',
      },
      {
        title: 'DAO 참여 방법',
        content: 'DAO에 참여하려면:\n\n1. **거버넌스 토큰 보유**: UNI, ARB, OP, AAVE 등\n2. **Snapshot 지갑 연결**: 메타마스크로 로그인\n3. **제안 읽고 투표**: 찬성/반대 클릭\n\n토큰 없이도 참여하는 법:\n- 디스코드에서 토론 참여\n- 포럼에 의견 남기기\n- 프로젝트에 기여 (번역, 버그 신고 등)\n\nDAO는 크립토의 미래야. 지금부터 관심 갖고 지켜봐!',
        type: 'verify',
        verifyText: 'DAO와 거버넌스를 이해했어요',
      },
    ],
    quiz: [
      {
        question: 'DAO에서 의사결정을 하는 방법은?',
        options: ['CEO가 결정한다', '토큰 보유자들이 투표한다', '랜덤으로 결정된다', '정부가 승인한다'],
        correctIndex: 1,
        explanation: 'DAO는 토큰 보유자들의 투표로 운영돼. 1 토큰 = 1 표.',
      },
    ],
  },
  {
    id: 22,
    floor: 22,
    slug: 'lending-borrowing',
    title: 'DeFi 대출: 빌려주고 빌리기',
    description: 'Aave로 코인을 빌려주고 이자 받기',
    icon: 'HandCoins',
    difficulty: 'hard',
    xp: 250,
    estimatedMinutes: 15,
    category: '디파이',
    steps: [
      {
        title: '디파이 대출이란?',
        content: 'DeFi 대출(Lending/Borrowing)은 은행 없이 코인을 빌려주고 빌리는 시스템이야.\n\n**빌려주기(Lending/Supply)**\n- 내 코인을 프로토콜에 예치\n- 다른 사람이 빌려갈 때 이자 수익\n\n**빌리기(Borrowing)**\n- 담보를 맡기고 다른 코인을 빌림\n- 이자를 내고 사용, 나중에 갚으면 담보 회수\n\n대표 프로토콜: Aave, Compound',
        type: 'read',
      },
      {
        title: '왜 코인을 빌려?',
        content: '코인을 빌리는 이유:\n\n1. **코인을 팔지 않고 현금 확보**\n   ETH가 오를 것 같은데 급하게 돈이 필요할 때\n   → ETH를 담보로 USDC를 빌림\n\n2. **레버리지**\n   빌린 코인으로 더 투자 (리스크 높음)\n\n3. **세금 최적화**\n   코인을 팔면 과세 대상이지만 빌리는 건 아님\n\n4. **차익거래**\n   빌린 코인으로 다른 곳에서 수익 추구',
        type: 'read',
      },
      {
        title: '담보와 청산',
        content: '디파이 대출의 핵심 개념:\n\n**담보율(Collateral Ratio)**\n- 보통 빌리는 금액의 150% 이상 담보 필요\n- 예: $1,000 빌리려면 $1,500 이상 담보\n\n**청산(Liquidation)**\n- 담보 가치가 떨어지면 자동으로 강제 매각\n- 예: ETH 가격이 급락 → 담보 부족 → 청산\n- 청산되면 담보의 일부를 잃어\n\n**Health Factor**\n- 1 이상이면 안전, 1 미만이면 청산 위험\n- Aave에서 실시간 확인 가능',
        type: 'read',
      },
      {
        title: 'Aave 구경하기',
        content: 'Aave 구경하는 법:\n\n1. **aave.com** 접속 → "Open App"\n2. Markets 탭에서 각 코인의 예치/대출 이율 확인\n3. 예: ETH 예치 수익률 2-3%, USDC 예치 수익률 3-5%\n\n실제 사용은 나중에! 먼저 이해하는 게 중요해.\n\n주의사항:\n- 청산 리스크 항상 인지\n- Health Factor 1.5 이상 유지 권장\n- 처음엔 스테이블코인 예치부터 시작',
        type: 'verify',
        verifyText: 'DeFi 대출의 원리를 이해했어요',
      },
    ],
    quiz: [
      {
        question: 'DeFi 대출에서 "청산"이 발생하는 경우는?',
        options: ['대출 기간이 끝났을 때', '담보 가치가 떨어져 기준 이하가 됐을 때', '이자를 많이 냈을 때', '다른 사람이 더 많이 빌렸을 때'],
        correctIndex: 1,
        explanation: '담보 가치가 하락하여 Health Factor가 1 미만이 되면 자동 청산돼.',
      },
      {
        question: '디파이 대출에서 $1,000을 빌리려면 보통 얼마의 담보가 필요할까?',
        options: ['$500', '$1,000', '$1,500 이상', '담보 불필요'],
        correctIndex: 2,
        explanation: '디파이 대출은 과담보 방식이라 보통 150% 이상 담보가 필요해.',
      },
    ],
  },
  {
    id: 23,
    floor: 23,
    slug: 'yield-farming',
    title: '이자 농사 (Yield Farming)',
    description: '디파이로 수익을 극대화하는 전략',
    icon: 'Sprout',
    difficulty: 'hard',
    xp: 250,
    estimatedMinutes: 15,
    category: '디파이',
    steps: [
      {
        title: '이자 농사란?',
        content: '이자 농사(Yield Farming)는 디파이 프로토콜에 자산을 넣고 최대한 높은 수익을 추구하는 전략이야.\n\n수익원:\n- **거래 수수료**: LP로 참여하면 스왑 수수료 수익\n- **프로토콜 토큰 보상**: 유동성 제공 대가로 추가 토큰 지급\n- **대출 이자**: 코인을 빌려주고 이자 수익\n\n"농사"라고 부르는 이유: 씨를 뿌리듯(자산 예치) 시간이 지나면 수확(수익)하니까.',
        type: 'read',
      },
      {
        title: '이자 농사 전략',
        content: '기본 전략들:\n\n**1. 단순 예치 (가장 안전)**\n- Aave에 USDC 예치 → 연 3-5%\n- 리스크 낮음\n\n**2. LP + 보상 토큰**\n- Uniswap에 ETH/USDC LP → 수수료 + 보상\n- 비영구적 손실 리스크\n\n**3. 복리 농사 (Autocompound)**\n- Yearn, Beefy 같은 볼트(Vault)가 자동으로 재투자\n- 수동 재투자 가스비 절약\n\n**4. 레버리지 농사 (고위험)**\n- 빌린 돈으로 추가 예치 → 수익률 배수\n- 청산 위험 높음',
        type: 'read',
      },
      {
        title: 'APR vs APY',
        content: '수익률 읽는 법:\n\n**APR (Annual Percentage Rate)**\n- 단리: 원금에만 이자\n- 예: $1,000, APR 10% → 1년 후 $1,100\n\n**APY (Annual Percentage Yield)**\n- 복리: 이자에도 이자\n- 예: $1,000, APY 10% → 1년 후 $1,105+\n\n주의:\n- APY가 항상 더 높게 보여\n- 일부 프로젝트는 APY를 부풀려서 표시\n- "3자리 APY" (100%+)는 지속 불가능할 가능성 높아',
        type: 'read',
      },
      {
        title: '이자 농사 주의사항',
        content: '리스크 체크리스트:\n\n- **스마트 컨트랙트 리스크**: 코드에 버그 있으면 해킹 가능\n- **비영구적 손실**: LP의 고질적 리스크\n- **토큰 가격 하락**: 보상 토큰 가치가 떨어질 수 있음\n- **높은 APY 함정**: 지속 불가능한 수익률 = 폰지 구조 의심\n- **가스비**: 잦은 재투자에 수수료 소모\n\n초보자 추천: 스테이블코인 예치 → LP 체험 → 볼트 순서로!\n\n절대 잃으면 안 되는 돈으로 하지 마.',
        type: 'verify',
        verifyText: '이자 농사의 원리와 리스크를 이해했어요',
      },
    ],
    quiz: [
      {
        question: 'APR과 APY의 차이점은?',
        options: ['같은 의미다', 'APR은 복리, APY는 단리', 'APR은 단리, APY는 복리', 'APR은 월간, APY는 연간'],
        correctIndex: 2,
        explanation: 'APR은 단리(원금에만 이자), APY는 복리(이자에도 이자). APY가 항상 더 높게 보여.',
      },
    ],
  },
  {
    id: 24,
    floor: 24,
    slug: 'ens-domain',
    title: 'ENS: 나만의 .eth 주소',
    description: '복잡한 지갑 주소 대신 이름을 등록하자',
    icon: 'AtSign',
    difficulty: 'medium',
    xp: 200,
    estimatedMinutes: 12,
    category: '온체인',
    steps: [
      {
        title: 'ENS란?',
        content: 'ENS = Ethereum Name Service\n\n지갑 주소: 0x1a2B3c4D5e6F... (42자리, 외우기 불가능)\nENS: **yourname.eth** (사람이 읽을 수 있는 주소)\n\n비유하면:\n- IP 주소: 142.250.190.14 (컴퓨터용)\n- 도메인: google.com (사람용)\n\nENS도 마찬가지야. 복잡한 지갑 주소 대신 읽기 쉬운 이름을 사용해.',
        type: 'read',
      },
      {
        title: 'ENS로 뭘 할 수 있어?',
        content: 'ENS 활용:\n\n1. **코인 받기**: "0x1a2B..."가 아닌 "yourname.eth"로 받기\n2. **웹사이트**: yourname.eth로 분산형 웹사이트 호스팅\n3. **프로필**: 아바타, 소셜 링크 설정\n4. **멀티체인**: 이더리움뿐 아니라 BTC, SOL 주소도 연결 가능\n5. **신원 증명**: Web3 세계에서의 디지털 신분증\n\n트위터 프로필에 .eth 주소를 쓰는 사람들이 많은 이유야.',
        type: 'read',
      },
      {
        title: 'ENS 등록하기',
        content: 'ENS 등록 방법:\n\n1. **app.ens.domains** 접속\n2. 원하는 이름 검색 (예: yourname.eth)\n3. 사용 가능하면 기간 선택 (1년~)\n4. 메타마스크 연결 → 결제 (ETH + 가스비)\n\n비용:\n- 5자 이상: 연 $5\n- 4자: 연 $160\n- 3자: 연 $640\n\n짧을수록 비싸! 먼저 5자 이상으로 시작해봐.\n\n구경만 하려면 지갑 연결 없이도 이름 검색 가능해.',
        type: 'action',
        verifyText: 'ENS 사이트에서 이름을 검색해봤어요',
      },
      {
        title: '활용 팁',
        content: 'ENS 팁:\n\n- **서브도메인**: wallet.yourname.eth 처럼 서브도메인도 생성 가능\n- **갱신 잊지 마**: 기간 만료되면 다른 사람이 등록할 수 있어\n- **역방향 설정**: 내 주소 → ENS 이름으로 표시되게 설정 (Primary Name)\n- **NFT야**: ENS 이름 자체가 NFT라 사고팔 수 있어\n\nOpenSea에서 인기 ENS 이름이 수백~수만 달러에 거래되기도 해.',
        type: 'verify',
        verifyText: 'ENS 개념과 등록법을 이해했어요',
      },
    ],
    quiz: [
      {
        question: 'ENS의 주요 목적은?',
        options: ['코인을 채굴하기 위해', '복잡한 지갑 주소를 읽기 쉬운 이름으로 바꾸기 위해', 'NFT를 만들기 위해', '가스비를 줄이기 위해'],
        correctIndex: 1,
        explanation: 'ENS는 0x... 같은 복잡한 주소를 yourname.eth 같은 읽기 쉬운 이름으로 바꿔줘.',
      },
    ],
  },
  {
    id: 25,
    floor: 25,
    slug: 'portfolio-management',
    title: '포트폴리오 관리 & 리밸런싱',
    description: '분산투자와 포트폴리오 관리 전략',
    icon: 'PieChart',
    difficulty: 'medium',
    xp: 200,
    estimatedMinutes: 12,
    category: '트레이딩',
    steps: [
      {
        title: '포트폴리오란?',
        content: '포트폴리오 = 내가 보유한 모든 자산의 구성\n\n예시 포트폴리오:\n- BTC 40%\n- ETH 30%\n- SOL 15%\n- USDC 15% (현금성)\n\n왜 분산투자?\n- 하나가 떨어져도 다른 것이 올라 위험 분산\n- "달걀을 한 바구니에 담지 마라"\n- 올인은 대박 or 쪽박. 분산은 꾸준한 성장.',
        type: 'read',
      },
      {
        title: '포트폴리오 구성 팁',
        content: '초보자 추천 구성:\n\n**보수적 (안정형)**\n- BTC 50% + ETH 30% + 스테이블코인 20%\n\n**균형형**\n- BTC 35% + ETH 25% + 알트코인 25% + 스테이블 15%\n\n**공격적 (위험 감수)**\n- BTC 20% + ETH 20% + 알트코인 50% + 스테이블 10%\n\n핵심 원칙:\n- BTC, ETH는 기본 (시장의 70% 차지)\n- 스테이블코인은 하락장 매수 기회용\n- 알트코인은 전체의 30% 이하 권장',
        type: 'read',
      },
      {
        title: '리밸런싱이란?',
        content: '리밸런싱 = 목표 비율에서 벗어나면 다시 맞추는 것\n\n예시:\n- 목표: BTC 50% / ETH 50%\n- BTC가 크게 올라서 → BTC 70% / ETH 30%가 됨\n- 리밸런싱: BTC 일부 팔고 ETH 매수 → 다시 50/50\n\n리밸런싱 주기:\n- **월 1회**: 가장 일반적\n- **비율 변동 시**: 5~10% 이상 벗어나면\n- **큰 이벤트 후**: 폭락/폭등 후\n\n리밸런싱 = 비쌀 때 팔고, 쌀 때 사는 걸 강제하는 전략.',
        type: 'read',
      },
      {
        title: '포트폴리오 추적 도구',
        content: '무료 포트폴리오 추적 도구:\n\n**앱/웹사이트:**\n- **CoinGecko**: 코인 가격 + 포트폴리오 추적\n- **DeBank**: 지갑 연결하면 디파이 자산까지 한눈에\n- **Zapper**: 여러 체인 자산 통합 조회\n\n**DeFi 자산 조회:**\n- debank.com에 지갑 주소 입력\n- 어떤 프로토콜에 얼마가 있는지 한눈에\n\n최소 월 1회 포트폴리오를 점검하는 습관을 들이자!',
        type: 'verify',
        verifyText: '포트폴리오 관리법을 이해했어요',
      },
    ],
    quiz: [
      {
        question: '리밸런싱의 핵심 원리는?',
        options: ['항상 BTC만 사는 것', '많이 오른 자산을 줄이고 적게 오른 자산을 늘리는 것', '손실 난 코인을 빨리 파는 것', '새로운 코인을 계속 추가하는 것'],
        correctIndex: 1,
        explanation: '리밸런싱은 목표 비율로 되돌리는 것 = 비쌀 때 팔고 쌀 때 사는 걸 자동화하는 전략이야.',
      },
    ],
  },
  {
    id: 26,
    floor: 26,
    slug: 'onchain-analysis-dune',
    title: '온체인 분석: Dune Analytics',
    description: '블록체인 데이터를 직접 분석해보자',
    icon: 'BarChart3',
    difficulty: 'medium',
    xp: 200,
    estimatedMinutes: 15,
    category: '온체인',
    steps: [
      {
        title: '온체인 분석이란?',
        content: '온체인 분석 = 블록체인에 기록된 공개 데이터를 분석하는 것\n\n분석할 수 있는 것:\n- **고래 지갑 움직임**: 큰 손이 뭘 사고파는지\n- **DEX 거래량**: 어떤 토큰이 인기인지\n- **프로토콜 TVL**: 디파이에 얼마나 예치됐는지\n- **가스비 추세**: 네트워크 혼잡도\n- **NFT 민팅/거래**: NFT 시장 동향\n\n블록체인은 투명해서 이 모든 데이터가 공개돼.',
        type: 'read',
      },
      {
        title: 'Dune Analytics란?',
        content: 'Dune = 블록체인 데이터를 시각화하는 무료 플랫폼\n\n특징:\n- SQL 쿼리로 데이터 조회 (프로그래밍 필요)\n- 다른 사람이 만든 대시보드 무료로 볼 수 있음\n- 이더리움, 솔라나, 아비트럼 등 여러 체인 지원\n\n코딩 못해도 괜찮아! 다른 사람이 만든 대시보드를 보는 것만으로도 엄청난 인사이트를 얻을 수 있어.',
        type: 'read',
      },
      {
        title: 'Dune에서 대시보드 보기',
        content: 'Dune 구경하기:\n\n1. **dune.com** 접속\n2. 검색에 키워드 입력:\n   - "DEX volume" → DEX 거래량 추이\n   - "whale tracker" → 고래 지갑 추적\n   - "Uniswap" → 유니스왑 통계\n   - "NFT" → NFT 시장 동향\n3. 인기 대시보드 구경\n\n추천 대시보드:\n- @hildobby의 이더리움 대시보드\n- DEX 거래량 비교\n- L2 사용량 추이',
        type: 'action',
        verifyText: 'Dune에서 대시보드를 둘러봤어요',
      },
      {
        title: '기타 온체인 분석 도구',
        content: '유용한 온체인 분석 도구들:\n\n- **DefiLlama**: defillama.com - 디파이 TVL 추적 1위\n- **Nansen**: 고래 지갑 라벨링 (유료)\n- **Arkham**: 지갑 주인 추적\n- **Glassnode**: 비트코인 온체인 데이터\n- **Token Terminal**: 프로토콜 재무 데이터\n\n무료로 시작하기: DefiLlama + Dune\n\n온체인 데이터를 읽을 수 있으면 뉴스보다 빠르게 시장을 파악할 수 있어.',
        type: 'verify',
        verifyText: '온체인 분석 도구들을 알게 됐어요',
      },
    ],
    quiz: [
      {
        question: '온체인 분석이 가능한 이유는?',
        options: ['거래소가 데이터를 공개해서', '블록체인 거래가 투명하게 공개되기 때문', '정부가 의무화해서', 'AI가 분석해주기 때문'],
        correctIndex: 1,
        explanation: '블록체인의 핵심 특징은 투명성! 모든 거래가 공개돼 있어서 누구나 분석할 수 있어.',
      },
    ],
  },
  {
    id: 27,
    floor: 27,
    slug: 'hardware-wallet',
    title: '하드웨어 지갑: 최고의 보안',
    description: '레저, 트레저로 자산을 안전하게 보관하자',
    icon: 'HardDrive',
    difficulty: 'medium',
    xp: 200,
    estimatedMinutes: 12,
    category: '보안',
    steps: [
      {
        title: '하드웨어 지갑이란?',
        content: '하드웨어 지갑 = 프라이빗 키를 오프라인으로 보관하는 물리적 장치\n\n메타마스크 같은 소프트웨어 지갑:\n- 프라이빗 키가 컴퓨터/폰에 저장\n- 해킹, 멀웨어에 취약\n\n하드웨어 지갑:\n- 프라이빗 키가 기기 안에만 존재\n- 인터넷에 연결되지 않음 (Cold Wallet)\n- 거래 시에만 USB로 연결, 기기 버튼으로 승인\n\n$1,000+ 보유하면 하드웨어 지갑 추천!',
        type: 'read',
      },
      {
        title: '주요 제품',
        content: '인기 하드웨어 지갑:\n\n**Ledger (레저)**\n- Nano S Plus: ~$79 (가성비)\n- Nano X: ~$149 (블루투스, 모바일 연동)\n- 가장 많이 팔린 하드웨어 지갑\n\n**Trezor (트레저)**\n- Model One: ~$69\n- Model T: ~$219 (터치스크린)\n- 오픈소스 (코드 공개)\n\n구매 시 반드시 **공식 사이트**에서!\n중고나 서드파티 구매는 절대 금지 (탈취 위험).',
        type: 'read',
      },
      {
        title: '하드웨어 지갑 사용법',
        content: '기본 사용 과정:\n\n1. **공식 사이트**에서 구매\n2. **초기 설정**: 기기에서 PIN 설정\n3. **시드 구문 백업**: 24개 단어 종이에 적기\n4. **펌웨어 업데이트**: 항상 최신으로\n5. **메타마스크 연결**: "하드웨어 지갑 연결" 옵션\n\n거래 승인 과정:\n- 메타마스크에서 트랜잭션 실행\n- 하드웨어 지갑 화면에서 내용 확인\n- 기기 버튼으로 직접 승인\n\n기기를 분실해도 시드 구문으로 복구 가능!',
        type: 'read',
      },
      {
        title: '보안 베스트 프랙티스',
        content: '하드웨어 지갑 보안 수칙:\n\n- **시드 구문은 오프라인만**: 절대 디지털 저장 금지\n- **펌웨어 최신 유지**: 보안 패치 적용\n- **블라인드 서명 주의**: 기기 화면에서 내용 확인 후 승인\n- **여러 지갑 분리**: 큰 자산 보관용 / 일상 사용용 분리\n- **여행 시**: 시드 구문과 기기를 같이 보관하지 마\n\n"큰 자산은 콜드 지갑, 사용할 것만 핫 지갑"이 최적의 전략!',
        type: 'verify',
        verifyText: '하드웨어 지갑의 원리와 보안을 이해했어요',
      },
    ],
    quiz: [
      {
        question: '하드웨어 지갑의 가장 큰 장점은?',
        options: ['거래 속도가 빠르다', '프라이빗 키가 오프라인에 저장되어 해킹에 안전하다', '무료로 사용할 수 있다', '고객센터가 있다'],
        correctIndex: 1,
        explanation: '하드웨어 지갑은 프라이빗 키를 인터넷과 분리된 기기에 보관해서 해킹 위험을 최소화해.',
      },
    ],
  },
  {
    id: 28,
    floor: 28,
    slug: 'tokenomics',
    title: '토크노믹스 읽는 법',
    description: '코인의 경제 구조를 분석하자',
    icon: 'Coins',
    difficulty: 'medium',
    xp: 200,
    estimatedMinutes: 12,
    category: '기초',
    steps: [
      {
        title: '토크노믹스란?',
        content: '토크노믹스(Tokenomics) = Token + Economics\n\n코인의 경제적 구조와 설계를 말해.\n\n토크노믹스를 보면 알 수 있는 것:\n- 이 코인이 가치 있을지\n- 가격이 오를 가능성이 있는지\n- 장기적으로 지속 가능한 구조인지\n\n"기술이 좋아도 토크노믹스가 나쁘면 가격은 떨어진다"\n프로젝트 분석에서 가장 중요한 요소 중 하나야.',
        type: 'read',
      },
      {
        title: '공급량 분석',
        content: '토크노믹스의 핵심: 공급량\n\n**총 공급량 (Total Supply)**\n- 최대로 존재할 수 있는 코인 수\n- BTC: 2,100만 개 (고정) → 희소성\n- ETH: 무제한 (하지만 소각으로 디플레이션)\n\n**유통 공급량 (Circulating Supply)**\n- 현재 시장에서 거래되는 양\n- 유통 공급량이 급증 예정이면 → 가격 하락 압력\n\n**시가총액 = 가격 × 유통 공급량**\n- 가격만 보면 안 돼! 시가총액이 진짜 크기야.',
        type: 'read',
      },
      {
        title: '토큰 분배 & 베스팅',
        content: '토큰이 누구에게 분배되는지 확인해:\n\n일반적인 분배:\n- **팀/창업자**: 15-25% (보통 1-4년 베스팅)\n- **투자자/VC**: 15-25%\n- **커뮤니티/에어드랍**: 20-40%\n- **생태계/개발**: 15-25%\n- **재단**: 10-20%\n\n**베스팅(Vesting)** = 일정 기간에 걸쳐 점진적으로 풀리는 것\n\n위험 신호:\n- 팀 물량이 50%+ → 중앙화\n- 베스팅 없이 바로 풀림 → 매도 압박\n- 대규모 언락 직전 → 가격 하락 가능',
        type: 'read',
      },
      {
        title: '실전 분석',
        content: '토크노믹스 확인하는 법:\n\n1. **CoinGecko/CoinMarketCap**: 공급량, 시가총액\n2. **프로젝트 문서(Docs)**: 토큰 분배 차트\n3. **Token Unlocks**: token.unlocks.app - 언락 일정\n4. **Messari**: 프로젝트 리서치\n\n체크리스트:\n- 총 공급량 대비 유통량은 몇 %?\n- 팀/VC 물량은 몇 %? 베스팅 기간은?\n- 큰 언락 일정이 곧 있는지?\n- 토큰에 실제 유틸리티가 있는지?\n\nDYOR의 핵심이 토크노믹스 분석이야.',
        type: 'verify',
        verifyText: '토크노믹스 분석법을 이해했어요',
      },
    ],
    quiz: [
      {
        question: '시가총액(Market Cap)의 계산 공식은?',
        options: ['가격 × 총 공급량', '가격 × 유통 공급량', '거래량 × 가격', '가격 ÷ 공급량'],
        correctIndex: 1,
        explanation: '시가총액 = 현재 가격 × 유통 공급량. 가격만 보지 말고 시가총액으로 비교해야 해.',
      },
      {
        question: '토큰 언락(Unlock)이 가격에 미치는 영향은?',
        options: ['항상 가격이 오른다', '영향 없다', '매도 압력으로 가격 하락 가능성', '항상 가격이 내린다'],
        correctIndex: 2,
        explanation: '대규모 언락은 매도 압력을 만들어 가격 하락 가능성이 높아. 절대적이진 않지만 주의 필요.',
      },
    ],
  },
  {
    id: 29,
    floor: 29,
    slug: 'leverage-futures',
    title: '레버리지 & 선물 거래 기초',
    description: '위험한 레버리지의 원리를 이해하자',
    icon: 'Scale',
    difficulty: 'hard',
    xp: 250,
    estimatedMinutes: 15,
    category: '트레이딩',
    steps: [
      {
        title: '선물 거래란?',
        content: '선물 거래(Futures) = 미래 가격을 예측하고 베팅하는 거래\n\n현물 거래: BTC를 직접 사서 보유\n선물 거래: BTC 가격이 오를지 내릴지 베팅\n\n**롱(Long)**: 가격이 오를 것에 베팅\n- BTC $100,000에 롱 → $110,000이 되면 이익\n\n**숏(Short)**: 가격이 내릴 것에 베팅\n- BTC $100,000에 숏 → $90,000이 되면 이익\n\n하락장에서도 수익 가능하다는 게 장점.',
        type: 'read',
      },
      {
        title: '레버리지란?',
        content: '레버리지 = 빌린 돈으로 거래 규모를 키우는 것\n\n예: 내 돈 $100, 10배 레버리지\n→ $1,000 규모로 거래 가능\n\n**수익도 10배, 손실도 10배!**\n\n10배 레버리지 + 10% 상승 = 100% 수익 (대박)\n10배 레버리지 + 10% 하락 = 100% 손실 (청산)\n\n**청산(Liquidation)**:\n- 증거금이 바닥나면 강제 종료\n- 10배 레버리지 → 10% 역방향 이동 = 청산\n- 100배 레버리지 → 1% 역방향 이동 = 청산',
        type: 'read',
      },
      {
        title: '펀딩비란?',
        content: '**펀딩비(Funding Rate)**\n\n선물 시장에서 8시간마다 발생하는 수수료야.\n\n- 롱이 더 많으면 → 롱이 숏에게 펀딩비 지급\n- 숏이 더 많으면 → 숏이 롱에게 펀딩비 지급\n\n선물 가격을 현물 가격에 가깝게 유지하는 메커니즘.\n\n활용:\n- 펀딩비가 양수이고 높으면 → 시장이 과열 (하락 주의)\n- 펀딩비가 음수이면 → 시장이 공포 (반등 가능성)\n\n포지션 유지 비용으로도 중요해.',
        type: 'read',
      },
      {
        title: '절대 주의사항',
        content: '선물/레버리지 거래 경고:\n\n- **90% 이상이 돈을 잃어**: 통계적 사실\n- **고배율 레버리지는 도박**: 50x, 100x는 거의 확실한 청산\n- **초보자는 하지 마**: 현물 거래를 충분히 경험한 후에\n- **잃을 수 있는 돈만**: 절대 빚내서 하지 마\n\n안전하게 시작하는 법:\n- 최대 2-3배 레버리지만\n- 손절(Stop Loss) 반드시 설정\n- 전체 자산의 10% 이하만 선물에\n\n이 퀘스트의 목적은 "하라"가 아니라 "이해하라"야.',
        type: 'verify',
        verifyText: '레버리지의 위험성을 이해했어요',
      },
    ],
    quiz: [
      {
        question: '10배 레버리지로 롱 포지션 진입 후 가격이 10% 하락하면?',
        options: ['10% 손실', '50% 손실', '100% 손실 (청산)', '손실 없음'],
        correctIndex: 2,
        explanation: '10배 레버리지에서 10% 역방향 이동 = 100% 손실 = 청산. 레버리지는 양날의 검이야.',
      },
      {
        question: '초보자가 선물 거래를 시작할 때 적절한 레버리지는?',
        options: ['50배 이상', '20배', '2-3배', '100배'],
        correctIndex: 2,
        explanation: '초보자는 최대 2-3배까지만. 고배율은 경험이 많아도 위험해.',
      },
    ],
  },
  {
    id: 30,
    floor: 30,
    slug: 'defi-strategy',
    title: '디파이 종합 실전 전략',
    description: '배운 것을 조합한 실전 디파이 전략',
    icon: 'Trophy',
    difficulty: 'hard',
    xp: 300,
    estimatedMinutes: 18,
    category: '디파이',
    steps: [
      {
        title: '디파이 총정리',
        content: '지금까지 배운 디파이 요소들:\n\n- **스왑**: 토큰 교환 (Uniswap)\n- **스테이킹**: 코인 맡기고 이자 (Lido)\n- **유동성 풀**: LP로 거래 수수료 수익\n- **대출**: 빌려주고 빌리기 (Aave)\n- **이자 농사**: 수익 극대화 전략\n\n이제 이것들을 조합해서 실전 전략을 짜보자!\n\n30층까지 왔다는 것만으로 대단해. 크립토 기초를 넘어 중급으로 가는 길이야.',
        type: 'read',
      },
      {
        title: '초보자 실전 전략',
        content: '안전하고 현실적인 디파이 전략:\n\n**전략 1: 스테이블 예치 (최저 리스크)**\n1. 스테이블코인(USDC) 준비\n2. Aave에 USDC 예치 → 연 3-5%\n3. 은행보다 높은 이자!\n\n**전략 2: ETH 리퀴드 스테이킹 (중간 리스크)**\n1. ETH를 Lido에 스테이킹 → stETH 받기\n2. stETH를 Aave에 담보로 예치 → 추가 이자\n3. ETH 가격 상승 + 스테이킹 보상 + 대출 이자\n\n**전략 3: LP + 볼트 (높은 리스크)**\n1. ETH/USDC LP 제공\n2. LP 토큰을 볼트(Yearn)에 예치\n3. 자동 복리 → 수익 극대화',
        type: 'read',
      },
      {
        title: '디파이 체크리스트',
        content: '디파이 사용 전 체크리스트:\n\n**보안 체크:**\n- 프로토콜이 감사(Audit) 받았는지 확인\n- TVL이 $100M 이상인지 (규모 = 신뢰도)\n- 출시 후 6개월+ 경과했는지\n- 커뮤니티가 활발한지\n\n**리스크 관리:**\n- 전체 자산의 30% 이하만 디파이에\n- 하나의 프로토콜에 몰빵 금지\n- 정기적으로 revoke.cash에서 승인 정리\n- 청산 라인 항상 모니터링\n\n**기록:**\n- 모든 거래 기록 보관 (세금 대비)\n- 스프레드시트 또는 DeBank으로 추적',
        type: 'read',
      },
      {
        title: '앞으로의 여정',
        content: '30층 클리어를 축하해!\n\n지금까지 배운 것:\n- 크립토 기초 → 지갑 → 거래소\n- 차트 → 온체인 → DeFi\n- 보안 → 분석 → 전략\n\n다음 단계 (31층~):\n- 고급 디파이 전략 (델타 뉴트럴 등)\n- 크로스체인 전략\n- 에어드랍 파밍 실전\n- 온체인 데이터 분석 심화\n- Web3 커리어 탐색\n\n기억해: "천천히, 꾸준히, 소액으로"\n\n이 던전을 계속 올라가자!',
        type: 'verify',
        verifyText: '30층을 클리어했어요!',
      },
    ],
    quiz: [
      {
        question: '디파이 프로토콜의 안전성을 판단하는 기준이 아닌 것은?',
        options: ['감사(Audit) 여부', 'TVL 규모', 'APY가 높을수록 안전', '커뮤니티 활발도'],
        correctIndex: 2,
        explanation: 'APY가 높다고 안전한 게 아니야. 오히려 비정상적으로 높은 APY는 위험 신호야.',
      },
      {
        question: '크립토 투자의 가장 중요한 원칙은?',
        options: ['고배율 레버리지로 빠르게 수익', '잃어도 괜찮은 금액만 투자', '남들이 사면 따라 사기', '하나의 코인에 올인'],
        correctIndex: 1,
        explanation: '가장 중요한 원칙: 잃어도 생활에 지장 없는 금액만 투자. 절대 빚내서 하지 마.',
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

export interface StageQuest {
  id: string;
  title: string;
  description: string;
  link?: string;
}

export interface Stage {
  id: number;
  slug: string;
  floor: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  requiredEarnings: number;
  youtubeVideoId?: string;
  quests: StageQuest[];
  bossName?: string;
  unlockCondition: string;
}

export const stages: Stage[] = [
  {
    id: 1,
    slug: 'start',
    floor: '1층',
    title: '시작의 방',
    subtitle: '첫 코드 실행',
    description: '모험의 시작. Claude Code를 설치하고 첫 코드를 실행하는 순간, 던전의 문이 열린다.',
    icon: '⚔️',
    requiredEarnings: 0,
    unlockCondition: '시작!',
    quests: [
      { id: '1-1', title: 'Claude Code 설치', description: 'npm install -g @anthropic-ai/claude-code 실행' },
      { id: '1-2', title: '첫 코드 실행', description: 'Hello World 출력하기' },
      { id: '1-3', title: 'GitHub 레포 생성', description: '첫 프로젝트 레포 만들기' },
    ],
  },
  {
    id: 2,
    slug: 'summon',
    floor: '2층',
    title: '소환의 방',
    subtitle: '첫 웹사이트 배포',
    description: '코드가 세상에 나가는 순간. 웹사이트를 소환하고 Vercel에 배포한다.',
    icon: '🌀',
    requiredEarnings: 0,
    unlockCondition: '1층 클리어',
    quests: [
      { id: '2-1', title: 'Next.js 프로젝트 생성', description: 'npx create-next-app 실행' },
      { id: '2-2', title: '페이지 디자인', description: 'Tailwind CSS로 메인 페이지 꾸미기' },
      { id: '2-3', title: 'Vercel 배포', description: 'git push → 자동 배포 성공' },
    ],
  },
  {
    id: 3,
    slug: 'golem',
    floor: '3층',
    title: '골렘의 방',
    subtitle: '첫 봇 24시간 가동',
    description: '잠들지 않는 골렘처럼, 봇이 24시간 일한다. 자동화의 힘을 깨닫는 순간.',
    icon: '🤖',
    requiredEarnings: 0,
    unlockCondition: '2층 클리어',
    quests: [
      { id: '3-1', title: '텔레그램 봇 생성', description: 'BotFather로 봇 만들기' },
      { id: '3-2', title: '봇 코드 작성', description: 'Python으로 봇 로직 구현' },
      { id: '3-3', title: '24시간 가동', description: 'LaunchAgent/서버에서 상시 실행' },
    ],
  },
  {
    id: 4,
    slug: 'merchant',
    floor: '4층',
    title: '상인의 방',
    subtitle: '첫 수익 $1',
    description: '첫 $1의 무게. 코드가 돈이 되는 마법을 경험한다.',
    icon: '💰',
    requiredEarnings: 1,
    unlockCondition: '누적 수익 $1 달성',
    quests: [
      { id: '4-1', title: '수익 모델 설계', description: '광고, 제휴, 봇 수익 중 선택' },
      { id: '4-2', title: '수익화 구현', description: '실제 수익 발생 코드 작성' },
      { id: '4-3', title: '첫 $1 달성', description: '실제 $1 수익 인증' },
    ],
  },
  {
    id: 5,
    slug: 'alchemist',
    floor: '5층',
    title: '연금술사의 방',
    subtitle: '수익 자동화',
    description: '연금술처럼 자동으로 돈을 만드는 시스템. 잠자는 동안에도 수익이 쌓인다.',
    icon: '⚗️',
    requiredEarnings: 10,
    unlockCondition: '누적 수익 $10 달성',
    quests: [
      { id: '5-1', title: '자동 수익 봇 구축', description: '24시간 자동으로 수익 내는 시스템' },
      { id: '5-2', title: '모니터링 대시보드', description: '수익 현황 실시간 확인' },
      { id: '5-3', title: '$10 돌파', description: '자동화 수익 $10 달성' },
    ],
  },
  {
    id: 6,
    slug: 'boss',
    floor: 'BOSS',
    title: 'DMASTER의 방',
    subtitle: '월 $100 달성',
    description: '던전의 마지막 보스 DMASTER. 월 $100의 벽을 넘어 진정한 던전 클리어.',
    icon: '👑',
    requiredEarnings: 100,
    unlockCondition: '월 $100 달성',
    bossName: 'DMASTER',
    quests: [
      { id: '6-1', title: '다중 수익원 확보', description: '2개 이상 수익 채널 운영' },
      { id: '6-2', title: '스케일업', description: '수익을 10배로 키우기' },
      { id: '6-3', title: '월 $100 달성', description: '던전 클리어!' },
    ],
  },
];

export function getStageBySlug(slug: string): Stage | undefined {
  return stages.find((s) => s.slug === slug);
}

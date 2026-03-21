export interface CalculatorTool {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export const calculatorTools: CalculatorTool[] = [
  {
    slug: 'funding-calculator',
    title: '펀딩비 수익 계산기',
    description: '두 거래소 간 펀딩비 스프레드로 예상 수익을 계산합니다.',
    icon: 'Calculator',
  },
  {
    slug: 'position-size-calculator',
    title: '포지션 사이징 계산기',
    description: '자본금, 리스크 허용도에 따른 적정 포지션 크기를 계산합니다.',
    icon: 'Scale',
  },
  {
    slug: 'pnl-calculator',
    title: 'PnL 계산기',
    description: '진입가, 청산가, 레버리지로 손익과 수익률을 계산합니다.',
    icon: 'TrendingUp',
  },
  {
    slug: 'compound-calculator',
    title: '복리 수익률 계산기',
    description: '일/주/월 수익률의 복리 효과로 장기 자산 성장을 시뮬레이션합니다.',
    icon: 'Percent',
  },
];

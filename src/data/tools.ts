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
];

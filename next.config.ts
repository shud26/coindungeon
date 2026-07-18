import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // 슬래시 없는 경로는 상대경로 에셋이 루트로 풀려 깨짐 → index.html로 보내 디렉토리 기준으로 로드
    return [
      { source: "/game", destination: "/game/index.html", permanent: false },
      { source: "/deckbuilder", destination: "/deckbuilder/index.html", permanent: false },
    ];
  },
  // 게임은 public/game/에 정적 번들로 동거 (2026-07-05: 별도 프로젝트 배포가 UNKNOWN으로 계속 죽어서 이관).
  // /game = 청산 서바이벌 (원본: ~/liq-survival, 2026-07-18 교체) · /deckbuilder = 구 덱빌더 박제.
};

export default nextConfig;

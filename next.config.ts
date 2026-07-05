import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // /game(슬래시 없음)은 상대경로 에셋이 루트로 풀려 깨짐 → index.html로 보내 /game/ 기준으로 로드
    return [{ source: "/game", destination: "/game/index.html", permanent: false }];
  },
  // 게임은 public/game/에 정적 번들로 동거 (2026-07-05: 별도 프로젝트 배포가 UNKNOWN으로 계속 죽어서 이관).
  // 갱신 방법: coindungeon-game에서 npm run build 후 dist를 public/game으로 복사.
};

export default nextConfig;

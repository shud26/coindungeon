import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // /game(슬래시 없음)은 상대경로 에셋이 루트로 풀려 깨짐 → index.html로 보내 /game/ 기준으로 로드
    return [{ source: "/game", destination: "/game/index.html", permanent: false }];
  },
  async rewrites() {
    // 게임(coindungeon-game, 별도 Vercel 프로젝트)을 같은 도메인 /game 경로로 서빙
    return [
      { source: "/game", destination: "https://coindungeon-game.vercel.app/" },
      { source: "/game/:path*", destination: "https://coindungeon-game.vercel.app/:path*" },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // 게임(coindungeon-game, 별도 Vercel 프로젝트)을 같은 도메인 /game 경로로 서빙
    return [
      { source: "/game", destination: "https://coindungeon-game.vercel.app/" },
      { source: "/game/:path*", destination: "https://coindungeon-game.vercel.app/:path*" },
    ];
  },
};

export default nextConfig;

import { ImageResponse } from 'next/og';
import { loadKoFont } from '@/lib/ogFont';

export const revalidate = 86400;

// 사이트 기본 OG 카드 — 링크 공유 시 미리보기 (던전 게이트 자체 에셋 사용)
export async function GET() {
  const headline1 = '시장은 던전이다.';
  const headline2 = '살아서 나가라.';
  const sub = '청산 시뮬레이터 밈 게임 — 코인던전';
  const cta = '어차피 청산당할 거, 여기서 당해 →';
  const allText = `${headline1}${headline2}${sub}${cta}$ coindungeoncoindungeon.games`;

  const [bold, regular] = await Promise.all([loadKoFont(allText, 700), loadKoFont(allText, 400)]);
  const fonts = [
    ...(bold ? [{ name: 'NotoKR', data: bold, weight: 700 as const }] : []),
    ...(regular ? [{ name: 'NotoKR', data: regular, weight: 400 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0B0D',
          fontFamily: 'NotoKR',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '22px 36px',
            borderBottom: '1px solid rgba(255,255,255,0.10)',
            backgroundColor: '#101214',
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#FF5C5C' }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#F5B54A' }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#3DDC97' }} />
          <div style={{ marginLeft: 16, color: '#6C737B', fontSize: 24 }}>$ coindungeon</div>
        </div>

        <div style={{ display: 'flex', flex: 1, alignItems: 'center', padding: '0 72px', gap: 60 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://coindungeon.games/icon.png"
            width={280}
            height={280}
            alt=""
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 66, fontWeight: 700, color: '#EDEFF1', lineHeight: 1.2 }}>
              {headline1}
            </div>
            <div style={{ display: 'flex', fontSize: 66, fontWeight: 700, color: '#3DDC97', lineHeight: 1.2 }}>
              {headline2}
            </div>
            <div style={{ display: 'flex', fontSize: 28, color: '#6C737B', marginTop: 26 }}>{sub}</div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 40px',
            borderTop: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <div style={{ display: 'flex', color: '#6C737B', fontSize: 24 }}>coindungeon.games</div>
          <div style={{ display: 'flex', color: '#3DDC97', fontSize: 26, fontWeight: 700 }}>{cta}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fonts.length ? fonts : undefined,
      emoji: 'twemoji',
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
    },
  );
}

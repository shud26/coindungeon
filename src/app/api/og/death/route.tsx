import { ImageResponse } from 'next/og';
import { parseDeathParams } from '@/lib/deathCard';

export const revalidate = 86400;

// Google Fonts css2는 UA 없는 요청에 ttf URL을 반환 → satori가 그대로 사용 가능.
// text= 파라미터로 실제 쓰는 글리프만 서브셋해서 용량 최소화.
async function loadKoFont(text: string, weight: 400 | 700): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(text)}`,
        { next: { revalidate: 86400 } },
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype|woff)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url, { next: { revalidate: 86400 } })).arrayBuffer();
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const p = parseDeathParams(Object.fromEntries(searchParams.entries()));

  const title = p.clear ? '👑 코인 정복 완료' : '💀 청산 리포트';
  const headline = p.clear
    ? `${p.cls.icon} ${p.cls.name}, 던전에서 살아 나갔다`
    : `${p.cls.name}, ${p.monster.name}에게 청산당함`;
  const stats = `B${p.floor} 도달 · ${p.kills}마리 처치 · ${p.cls.icon} ${p.cls.name}`;
  const lesson = p.clear ? '시장은 던전이다. 살아서 나가라.' : p.monster.lesson;
  const accent = p.clear ? '#FFD24A' : '#FF5C5C';

  const allText = `${title}${headline}${stats}${lesson}$ coindungeon — liquidation reportcoindungeon.games/game나도 청산당하러 가기 →이 죽음이 남긴 것`;
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
        {/* 터미널 타이틀바 */}
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
          <div style={{ marginLeft: 16, color: '#6C737B', fontSize: 24 }}>
            $ coindungeon — liquidation report
          </div>
        </div>

        {/* 본문 */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', padding: '0 64px' }}>
          <div style={{ display: 'flex', fontSize: 210, marginRight: 56 }}>
            {p.clear ? '👑' : p.monster.emoji}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', fontSize: 58, fontWeight: 700, color: accent }}>{title}</div>
            <div
              style={{
                display: 'flex',
                fontSize: 42,
                fontWeight: 700,
                color: '#EDEFF1',
                marginTop: 18,
                lineHeight: 1.25,
              }}
            >
              {headline}
            </div>
            <div style={{ display: 'flex', fontSize: 27, color: '#6C737B', marginTop: 16 }}>{stats}</div>
            <div
              style={{
                display: 'flex',
                fontSize: 27,
                color: '#3DDC97',
                marginTop: 26,
                paddingLeft: 20,
                borderLeft: '4px solid #3DDC97',
                lineHeight: 1.4,
              }}
            >
              {lesson}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 40px',
            borderTop: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <div style={{ display: 'flex', color: '#6C737B', fontSize: 24 }}>coindungeon.games/game</div>
          <div style={{ display: 'flex', color: '#3DDC97', fontSize: 26, fontWeight: 700 }}>
            나도 청산당하러 가기 →
          </div>
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

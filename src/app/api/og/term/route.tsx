import { ImageResponse } from 'next/og';
import { loadKoFont } from '@/lib/ogFont';
import { glossaryTerms } from '@/data/glossary';

export const revalidate = 86400;

// 오늘의 던전 용어 카드 — X 포스팅용 (16:9)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug') ?? 'liquidation';
  const term = glossaryTerms.find((t) => t.slug === slug) ?? glossaryTerms[0];

  const label = '오늘의 던전 용어';
  const allText = `${label}${term.titleKo}${term.titleEn}${term.shortDef}$ coindungeon — glossarycoindungeon.games`;
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
            padding: '20px 36px',
            borderBottom: '1px solid rgba(255,255,255,0.10)',
            backgroundColor: '#101214',
          }}
        >
          <div style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: '#FF5C5C' }} />
          <div style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: '#F5B54A' }} />
          <div style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: '#3DDC97' }} />
          <div style={{ marginLeft: 16, color: '#6C737B', fontSize: 22 }}>$ coindungeon — glossary</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', padding: '0 80px' }}>
          <div style={{ display: 'flex', fontSize: 26, color: '#3DDC97', letterSpacing: 2 }}>{label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginTop: 20 }}>
            <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, color: '#EDEFF1' }}>{term.titleKo}</div>
            <div style={{ display: 'flex', fontSize: 30, color: '#6C737B' }}>{term.titleEn}</div>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#9BA1A8',
              marginTop: 30,
              paddingLeft: 22,
              borderLeft: '4px solid #3DDC97',
              lineHeight: 1.5,
              maxWidth: 950,
            }}
          >
            {term.shortDef}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '18px 40px',
            borderTop: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <div style={{ display: 'flex', color: '#6C737B', fontSize: 22 }}>coindungeon.games/glossary</div>
          <div style={{ display: 'flex', color: '#3DDC97', fontSize: 22, fontWeight: 700 }}>⚔️ 시장은 던전이다</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 675,
      fonts: fonts.length ? fonts : undefined,
      emoji: 'twemoji',
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
    },
  );
}

// OG 이미지용 한글 폰트 로더 — Google Fonts css2는 UA 없는 요청에 ttf URL을 반환.
// text= 파라미터로 실제 쓰는 글리프만 서브셋해서 용량 최소화.
export async function loadKoFont(text: string, weight: 400 | 700): Promise<ArrayBuffer | null> {
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

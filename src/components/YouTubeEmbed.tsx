'use client';

export default function YouTubeEmbed({ videoId, title }: { videoId: string; title?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: '16/9' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title ?? '공략 영상'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}

import Link from 'next/link';
import { getPublishedPosts } from '@/data/blog';

const categoryColors: Record<string, string> = {
  '세금/규제': 'text-warning',
  디파이: 'text-success',
  트렌드: 'text-accent',
  입문: 'text-[#A78BFA]',
  보안: 'text-danger',
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <div>
      <div>
        <h1 className="text-[28px] font-bold tracking-tight">크립토 가이드</h1>
        <p className="mt-1.5 text-[15px] text-text-secondary">
          코인 세금·디파이·트렌드를 가장 쉽게 풀어드립니다
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card p-5 transition-all active:scale-[0.995]"
            >
              <span className={`text-[12px] font-medium ${categoryColors[post.category] ?? 'text-accent'}`}>
                {post.category}
              </span>
              <h2 className="mt-1.5 text-[17px] font-bold leading-snug">{post.title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-text-secondary line-clamp-2">
                {post.description}
              </p>
              <p className="mt-3 text-[12px] text-text-quaternary">
                {post.publishedAt} · 약 {post.readingMin}분
              </p>
            </Link>
          ))
        ) : (
          <p className="py-10 text-center text-sm text-text-quaternary">아직 글이 없어요</p>
        )}
      </div>
    </div>
  );
}

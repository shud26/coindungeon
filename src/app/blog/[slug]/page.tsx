import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { blogPosts, getPostBySlug } from '@/data/blog';
import { getTermBySlug } from '@/data/glossary';

const BASE_URL = 'https://coindungeon.vercel.app';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: '글을 찾을 수 없습니다' };

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
  };
}

// 간단 마크다운 렌더: **굵게**, "- " 리스트, "> " 인용, 빈 줄 문단 구분
function bold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>');
}

function renderBody(body: string) {
  return body.split('\n\n').map((block, i) => {
    const lines = block.split('\n');

    if (lines.every((l) => l.trim().startsWith('- '))) {
      return (
        <ul key={i} className="ml-1 flex flex-col gap-1.5">
          {lines.map((l, j) => (
            <li
              key={j}
              className="flex gap-2 text-[15px] leading-relaxed text-text-secondary"
            >
              <span className="text-accent">•</span>
              <span dangerouslySetInnerHTML={{ __html: bold(l.trim().slice(2)) }} />
            </li>
          ))}
        </ul>
      );
    }

    if (block.trim().startsWith('> ')) {
      return (
        <blockquote
          key={i}
          className="card-accent p-4 text-[14px] leading-relaxed text-text-secondary"
          dangerouslySetInnerHTML={{ __html: bold(block.trim().slice(2)).replace(/\n/g, '<br/>') }}
        />
      );
    }

    return (
      <p
        key={i}
        className="text-[15px] leading-relaxed text-text-secondary"
        dangerouslySetInnerHTML={{ __html: bold(block).replace(/\n/g, '<br/>') }}
      />
    );
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return <p className="py-20 text-center text-text-quaternary">글을 찾을 수 없습니다.</p>;

  const relatedTerms = post.relatedTermSlugs.map((s) => getTermBySlug(s)).filter(Boolean);

  return (
    <article>
      {/* Article 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: { '@type': 'Organization', name: '코인던전' },
            publisher: { '@type': 'Organization', name: '코인던전' },
            mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
          }),
        }}
      />
      {/* FAQ 구조화 데이터 (검색결과에 Q&A 노출) */}
      {post.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faq.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
      )}

      {/* 뒤로가기 */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-text-quaternary transition-colors hover:text-text-tertiary"
        >
          <ArrowLeft size={15} /> 크립토 가이드
        </Link>
      </div>

      {/* 헤더 */}
      <header className="mt-5">
        <span className="text-[13px] font-medium text-warning">{post.category}</span>
        <h1 className="mt-2 text-[26px] font-bold leading-tight tracking-tight">{post.title}</h1>
        <p className="mt-3 text-[13px] text-text-quaternary">
          {post.publishedAt} · 약 {post.readingMin}분 읽기
        </p>
      </header>

      {/* 본문 섹션 */}
      <div className="mt-7 flex flex-col gap-7">
        {post.sections.map((sec, i) => (
          <section key={i} className="flex flex-col gap-3">
            {sec.heading && <h2 className="text-[19px] font-bold tracking-tight">{sec.heading}</h2>}
            {renderBody(sec.body)}
          </section>
        ))}
      </div>

      {/* FAQ */}
      {post.faq.length > 0 && (
        <div className="mt-10">
          <h2 className="text-[19px] font-bold tracking-tight">자주 묻는 질문</h2>
          <div className="mt-4 flex flex-col gap-3">
            {post.faq.map((f, i) => (
              <div key={i} className="card p-5">
                <p className="text-[15px] font-semibold text-text-primary">Q. {f.q}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 연관 용어 (내부링크) */}
      {relatedTerms.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-accent" />
            <h2 className="text-sm font-semibold">관련 용어</h2>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {relatedTerms.map((rt) => (
              <Link
                key={rt!.slug}
                href={`/glossary/${rt!.slug}`}
                className="rounded-full bg-bg-elevated px-3.5 py-1.5 text-sm text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary"
              >
                {rt!.titleKo}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

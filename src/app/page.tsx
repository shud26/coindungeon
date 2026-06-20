'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Newspaper, BookOpen, Target, Calculator } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/components/Motion';
import { strategies } from '@/data/strategies';
import { calculatorTools } from '@/data/tools';
import { glossaryTerms } from '@/data/glossary';
import { blogPosts } from '@/data/blog';

const categories = [
  {
    href: '/blog',
    label: '가이드',
    desc: '코인 세금·디파이·트렌드',
    Icon: Newspaper,
    iconColor: 'text-accent',
    iconBg: 'bg-accent-dim',
    count: () => `${blogPosts.length}개`,
  },
  {
    href: '/glossary',
    label: '용어사전',
    desc: '핵심 용어를 쉽게',
    Icon: BookOpen,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    count: () => `${glossaryTerms.length}개`,
  },
  {
    href: '/strategies',
    label: '전략',
    desc: '실전 투자 전략',
    Icon: Target,
    iconColor: 'text-accent',
    iconBg: 'bg-accent-dim',
    count: () => `${strategies.length}개`,
  },
  {
    href: '/tools',
    label: '계산기',
    desc: '수익·손익·세금 계산',
    Icon: Calculator,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    count: () => `${calculatorTools.length}개`,
  },
];

const categoryColors: Record<string, string> = {
  '세금/규제': 'text-warning',
  디파이: 'text-success',
  트렌드: 'text-accent',
  입문: 'text-[#A78BFA]',
  보안: 'text-danger',
};

export default function HomePage() {
  const latestPosts = [...blogPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      {/* 히어로 */}
      <motion.div variants={staggerItem} className="pt-2">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[15px]"
            style={{ background: 'rgba(139,124,255,0.15)' }}
          >
            🪙
          </div>
          <span className="text-[13px] font-semibold tracking-wide text-text-tertiary">COINDUNGEON</span>
        </div>
        <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-tight">
          크립토,
          <br />
          <span className="text-accent">가장 쉽게 배우는 곳</span>
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
          코인 세금부터 디파이·트렌드까지 — 어려운 크립토를 초보 눈높이로 풀어드려요.
        </p>
      </motion.div>

      {/* 카테고리 그리드 */}
      <motion.div variants={staggerItem} className="mt-7">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="card group p-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.iconBg} transition-transform group-hover:scale-105`}
              >
                <c.Icon size={18} className={c.iconColor} />
              </div>
              <p className="mt-3 text-[15px] font-bold">{c.label}</p>
              <p className="mt-0.5 text-[12px] text-text-tertiary">{c.desc}</p>
              <p className="mt-2 text-[11px] text-text-quaternary">{c.count()}</p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* 최신 가이드 */}
      {latestPosts.length > 0 && (
        <motion.div variants={staggerItem} className="mt-9">
          <div className="flex items-center justify-between">
            <p className="section-label">최신 가이드</p>
            <Link href="/blog" className="text-[12px] text-text-quaternary transition-colors hover:text-text-tertiary">
              전체보기
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-4 transition-all active:scale-[0.995]">
                <span className={`text-[11px] font-medium ${categoryColors[post.category] ?? 'text-accent'}`}>
                  {post.category}
                </span>
                <p className="mt-1 text-[15px] font-bold leading-snug">{post.title}</p>
                <p className="mt-1.5 text-[12px] text-text-quaternary">
                  {post.publishedAt} · 약 {post.readingMin}분
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

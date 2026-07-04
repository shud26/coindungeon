'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swords, ArrowUpRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/components/Motion';
import { strategies } from '@/data/strategies';
import { calculatorTools } from '@/data/tools';
import { glossaryTerms } from '@/data/glossary';
import { getPublishedPosts } from '@/data/blog';
import { monsters } from '@/data/bestiary';

const indexRows = [
  { no: '01', href: '/bestiary', label: '몬스터 도감', desc: '개념 = 몬스터. 공략 = 배움', count: () => `${monsters.length}` },
  { no: '02', href: '/blog', label: '가이드', desc: '코인 세금 · 디파이 · 트렌드', count: () => `${getPublishedPosts().length}` },
  { no: '03', href: '/strategies', label: '전략', desc: '실전 투자 전략', count: () => `${strategies.length}` },
  { no: '04', href: '/glossary', label: '용어사전', desc: '핵심 용어를 쉽게', count: () => `${glossaryTerms.length}` },
  { no: '05', href: '/tools', label: '계산기', desc: '수익 · 손익 · 포지션', count: () => `${calculatorTools.length}` },
];

const categoryColors: Record<string, string> = {
  '세금/규제': 'text-warning',
  디파이: 'text-success',
  트렌드: 'text-accent',
  입문: 'text-[#6FF0BC]',
  보안: 'text-danger',
};

export default function HomePage() {
  const latestPosts = getPublishedPosts().slice(0, 3);

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      {/* 히어로 — 터미널 */}
      <motion.div variants={staggerItem} className="pt-2">
        <p className="mono-label">
          <span className="text-accent">$</span> coindungeon <span className="cursor-blink" aria-hidden />
        </p>
        <h1 className="mt-5 text-[30px] font-bold leading-[1.25] tracking-tight md:text-[48px]">
          시장은 던전이다.
          <br />
          <span className="text-accent">살아서 나가라.</span>
        </h1>
        <p className="mt-3.5 text-[14.5px] leading-relaxed text-text-secondary md:text-[16px]">
          여기서 미리 청산당해 보고, 진짜 돈은 지키세요.
          <br />
          몬스터를 잡는 법 = 시장에서 살아남는 법.
        </p>

        {/* CTA */}
        <div className="mt-6 flex gap-2.5 md:max-w-[460px]">
          <a
            href="/game"
            className="glow-accent flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-[14px] font-bold text-black transition-transform active:scale-[0.98]"
          >
            <Swords size={16} strokeWidth={2.2} />
            던전 입장
          </a>
          <Link
            href="/bestiary"
            className="flex items-center justify-center rounded-xl border border-white/[0.09] bg-bg-surface px-5 py-3.5 text-[14px] font-semibold text-text-secondary transition-colors hover:border-white/[0.16] hover:text-text-primary"
          >
            도감 보기
          </Link>
        </div>

        {/* 스탯 티커 */}
        <div className="mono-num mt-5 flex items-center gap-4 overflow-x-auto no-scrollbar text-[11px] text-text-tertiary">
          <span className="shrink-0">
            몬스터 <span className="text-text-primary">{monsters.length}</span>
          </span>
          <span className="shrink-0 text-text-quaternary">/</span>
          <span className="shrink-0">
            용어 <span className="text-text-primary">{glossaryTerms.length}</span>
          </span>
          <span className="shrink-0 text-text-quaternary">/</span>
          <span className="shrink-0">
            가이드 <span className="text-text-primary">{getPublishedPosts().length}</span>
          </span>
          <span className="shrink-0 text-text-quaternary">/</span>
          <span className="pulse-danger shrink-0 text-danger">생존율 측정불가</span>
        </div>
      </motion.div>

      {/* 인덱스 */}
      <motion.div variants={staggerItem} className="mt-10">
        <p className="mono-label">INDEX</p>
        <div className="mt-2">
          {indexRows.map((row) => (
            <Link key={row.href} href={row.href} className="index-row group">
              <span className="mono-num text-[12px] text-text-quaternary">{row.no}</span>
              <span className="min-w-0 flex-1">
                <span className="text-[15px] font-bold">{row.label}</span>
                <span className="ml-2.5 hidden text-[12px] text-text-quaternary min-[380px]:inline">{row.desc}</span>
              </span>
              <span className="mono-num text-[12px] text-text-tertiary">{row.count()}</span>
              <ArrowUpRight
                size={14}
                className="text-text-quaternary transition-colors group-hover:text-accent"
              />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* 최신 가이드 */}
      {latestPosts.length > 0 && (
        <motion.div variants={staggerItem} className="mt-10">
          <div className="flex items-baseline justify-between">
            <p className="mono-label">LATEST</p>
            <Link href="/blog" className="text-[12px] text-text-quaternary transition-colors hover:text-text-tertiary">
              전체보기
            </Link>
          </div>
          <div className="mt-3 grid gap-2.5 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="terminal-card block p-4 transition-all active:scale-[0.995]">
                <span className={`text-[11px] font-medium ${categoryColors[post.category] ?? 'text-accent'}`}>
                  {post.category}
                </span>
                <p className="mt-1 text-[15px] font-bold leading-snug">{post.title}</p>
                <p className="mono-num mt-1.5 text-[11.5px] text-text-quaternary">
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

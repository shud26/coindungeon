'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, BookOpen, Target, Calculator } from 'lucide-react';

const items = [
  { href: '/', label: '홈', Icon: Home },
  { href: '/blog', label: '가이드', Icon: Newspaper },
  { href: '/glossary', label: '용어', Icon: BookOpen },
  { href: '/strategies', label: '전략', Icon: Target },
  { href: '/tools', label: '계산기', Icon: Calculator },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(9,9,11,0.85)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="mx-auto flex max-w-[520px] items-center justify-around" style={{ height: 56, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {items.map(({ href, label, Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-1 transition-colors ${
                active ? 'text-[#8B7CFF]' : 'text-zinc-500'
              }`}
              style={{ minWidth: 56 }}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: '0.02em' }}>{label}</span>
              {active && (
                <span className="absolute -top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#8B7CFF]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

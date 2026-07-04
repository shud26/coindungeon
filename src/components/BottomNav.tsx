'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Calculator, Swords } from 'lucide-react';

const items = [
  { href: '/', label: '홈', Icon: Home },
  { href: '/game', label: '던전', Icon: Swords, external: true },
  { href: '/bestiary', label: '도감', Icon: BookOpen },
  { href: '/tools', label: '도구', Icon: Calculator },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'rgba(9,9,11,0.85)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="mx-auto flex max-w-[520px] items-center justify-around" style={{ height: 56, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {items.map(({ href, label, Icon, external }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          if (external) {
            return (
              <a
                key={href}
                href={href}
                className="relative flex flex-col items-center gap-1 text-zinc-500 transition-colors"
                style={{ minWidth: 52 }}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.02em' }}>{label}</span>
              </a>
            );
          }
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-1 transition-colors ${
                active ? 'text-[#3DDC97]' : 'text-zinc-500'
              }`}
              style={{ minWidth: 56 }}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: '0.02em' }}>{label}</span>
              {active && (
                <span className="absolute -top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#3DDC97]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

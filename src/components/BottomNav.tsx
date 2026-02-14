'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Gamepad2, BookOpen, User } from 'lucide-react';

const items = [
  { href: '/', label: '홈', Icon: Home },
  { href: '/dungeon', label: '던전', Icon: Map },
  { href: '/game', label: '탐험', Icon: Gamepad2 },
  { href: '/learn', label: '학습', Icon: BookOpen },
  { href: '/profile', label: '프로필', Icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border"
      style={{ background: 'rgba(12,12,14,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="mx-auto flex max-w-[520px] items-center justify-around" style={{ height: 58, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {items.map(({ href, label, Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-1 transition-colors ${
                active ? 'text-accent' : 'text-text-quaternary'
              }`}
              style={{ minWidth: 56 }}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span style={{ fontSize: 11, fontWeight: active ? 600 : 400, letterSpacing: '0.01em' }}>{label}</span>
              {active && (
                <span className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-accent" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

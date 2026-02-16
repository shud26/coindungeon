'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, BookOpen, User } from 'lucide-react';

const items = [
  { href: '/', label: '홈', Icon: Home },
  { href: '/dungeon', label: '퀘스트', Icon: Map },
  { href: '/learn', label: '학습', Icon: BookOpen },
  { href: '/profile', label: '프로필', Icon: User },
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
      <div className="mx-auto flex max-w-[520px] items-center justify-around" style={{ height: 52, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {items.map(({ href, label, Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-0.5 transition-colors ${
                active ? 'text-text-primary' : 'text-text-quaternary'
              }`}
              style={{ minWidth: 64 }}
            >
              <Icon size={19} strokeWidth={active ? 1.8 : 1.4} />
              <span style={{ fontSize: 10, fontWeight: active ? 500 : 400, letterSpacing: '0.02em' }}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

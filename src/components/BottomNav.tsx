'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, BookOpen, User } from 'lucide-react';

const items = [
  { href: '/', label: '홈', Icon: Home },
  { href: '/dungeon', label: '던전', Icon: Map },
  { href: '/learn', label: '학습', Icon: BookOpen },
  { href: '/profile', label: '프로필', Icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border"
      style={{ background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="mx-auto flex max-w-[480px] items-center justify-around" style={{ height: 56, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {items.map(({ href, label, Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 transition-colors ${
                active ? 'text-accent' : 'text-text-quaternary hover:text-text-tertiary'
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.5} />
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.02em' }}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

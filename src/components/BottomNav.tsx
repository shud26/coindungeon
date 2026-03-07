'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, Calculator, BookOpen, User } from 'lucide-react';

const items = [
  { href: '/', label: '홈', Icon: Home },
  { href: '/strategies', label: '전략', Icon: Target },
  { href: '/tools', label: '도구', Icon: Calculator },
  { href: '/learn', label: '학습', Icon: BookOpen },
  { href: '/profile', label: '프로필', Icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
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
                active ? 'text-indigo-500' : 'text-gray-400'
              }`}
              style={{ minWidth: 56 }}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: '0.02em' }}>{label}</span>
              {active && (
                <span className="absolute -top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-indigo-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

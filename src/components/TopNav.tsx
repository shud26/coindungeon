'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: '홈' },
  { href: '/game', label: '던전', external: true },
  { href: '/bestiary', label: '도감' },
  { href: '/tools', label: '도구' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 hidden md:block"
      style={{
        background: 'rgba(10,11,13,0.8)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="mx-auto flex h-14 max-w-[880px] items-center justify-between px-6">
        <Link href="/" className="mono-num text-[13px] font-semibold tracking-wide text-text-primary">
          <span className="text-accent">$</span> coindungeon
        </Link>
        <nav className="flex items-center gap-1">
          {items.map(({ href, label, external }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            const cls = `rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              active ? 'bg-accent-dim text-accent' : 'text-text-tertiary hover:text-text-primary'
            }`;
            if (external) {
              return (
                <a key={href} href={href} className={cls}>
                  {label}
                </a>
              );
            }
            return (
              <Link key={href} href={href} className={cls}>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

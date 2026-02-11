'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, User } from 'lucide-react';

const navItems = [
  { href: '/', label: '홈', Icon: Home },
  { href: '/dungeon', label: '던전', Icon: Map },
  { href: '/profile', label: '프로필', Icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="glass fixed bottom-0 left-0 right-0 z-50 border-t border-border">
      <div className="mx-auto flex max-w-md items-center justify-around py-1.5">
        {navItems.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-5 py-1.5 transition-all ${
                isActive
                  ? 'text-primary'
                  : 'text-text-disabled hover:text-text-secondary'
              }`}
            >
              <item.Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

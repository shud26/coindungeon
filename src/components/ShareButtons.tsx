'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard 권한 없으면 무시 */
    }
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full bg-bg-elevated px-3.5 py-1.5 text-[13px] text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary"
      >
        {copied ? <Check size={14} className="text-success" /> : <Link2 size={14} />}
        {copied ? '복사됨' : '링크 복사'}
      </button>
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-bg-elevated px-3.5 py-1.5 text-[13px] text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary"
      >
        𝕏 공유
      </a>
    </div>
  );
}

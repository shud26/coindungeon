'use client';

import { useEffect, useRef } from 'react';

export default function TwitterFeed({ username = 'DMASTER_AI' }: { username?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} className="rounded-2xl overflow-hidden">
      <a
        className="twitter-timeline"
        data-theme="dark"
        data-height="400"
        data-chrome="noheader nofooter noborders transparent"
        href={`https://twitter.com/${username}`}
      >
        @{username} 로딩 중...
      </a>
    </div>
  );
}

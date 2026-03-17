'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSidebar } from '@/components/ui/sidebar';
import type { CHAT_PROFILE_QUERYResult } from '@/sanity.types';

const Chat = dynamic(() => import('@/components/chat/Chat'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
      Loading chat...
    </div>
  ),
});

interface LazyChatProps {
  profile: CHAT_PROFILE_QUERYResult | null;
}

export default function LazyChat({ profile }: LazyChatProps) {
  const [mounted, setMounted] = useState(false);
  const { open } = useSidebar();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (document.querySelector('script[src*="chatkit.js"]')) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.platform.openai.com/deployments/chatkit/chatkit.js';
    script.async = true;
    document.body.appendChild(script);
  }, [open]);

  if (!mounted || !open) return null;

  return <Chat profile={profile} />;
}

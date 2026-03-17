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

  if (!mounted || !open) return null;

  return <Chat profile={profile} />;
}

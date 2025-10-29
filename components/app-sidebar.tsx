import { type ComponentProps, Suspense } from 'react';

import ChatWrapper from '@/components/chat/ChatWrapper';
import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar';

export default function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="h-full w-full bg-white">
        <Suspense fallback={<div>Loading...</div>}>
          <ChatWrapper />
        </Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

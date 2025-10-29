import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import Script from 'next/script';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';

import { ClerkProvider } from '@clerk/nextjs';

import { Geist, Geist_Mono } from 'next/font/google';

import ThemeProvider from '@/components/ThemeProvider';
import AppSidebar from '@/components/app-sidebar';
import FloatingDock from '@/components/FloatingDock';
import SidebarToggle from '@/components/SidebarToggle';
import DarkModeToggle from '@/components/DarkModeToggle';
import DisableDraftMode from '@/components/DisableDraftMode';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { SanityLive } from '@/sanity/lib/live';

import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vahe Borisov',
  description:
    'Explore my portfolio — a sleek Next.js app where I share my latest projects, design experiments, and development journey.',
};

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={false}>
              <SidebarInset>{children}</SidebarInset>

              <AppSidebar side="right" />

              <FloatingDock />
              <SidebarToggle />

              {/* Mode Toggle - Desktop: bottom right next to AI chat, Mobile: top right next to burger menu */}
              <div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-20">
                <div className="w-10 h-10 md:w-12 md:h-12">
                  <DarkModeToggle />
                </div>
              </div>
            </SidebarProvider>

            <SanityLive />
            {(await draftMode()).isEnabled && (
              <>
                <VisualEditing />
                <DisableDraftMode />
              </>
            )}

            <Script
              src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
              strategy="afterInteractive"
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

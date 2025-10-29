import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { ClerkProvider } from '@clerk/nextjs';

import { Geist, Geist_Mono } from 'next/font/google';

import AppSidebar from '@/components/app-sidebar';
import SidebarToggle from '@/components/SidebarToggle';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { SanityLive } from '@/sanity/lib/live';

import '../globals.css';
import Script from 'next/script';

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

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SidebarProvider>
            <SidebarInset>{children}</SidebarInset>

            <AppSidebar side="right" />

            <SidebarToggle />
          </SidebarProvider>

          <SanityLive />

          <Script
            src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
            strategy="afterInteractive"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}

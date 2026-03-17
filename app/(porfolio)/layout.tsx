import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { Analytics } from '@vercel/analytics/next';

import { ClerkProvider } from '@clerk/nextjs';

import { Geist, Geist_Mono } from 'next/font/google';

import { defineQuery } from 'next-sanity';

import ThemeProvider from '@/components/ThemeProvider';
import AppSidebar from '@/components/app-sidebar';
import FloatingDock from '@/components/FloatingDock';
import SidebarToggle from '@/components/SidebarToggle';
import DarkModeToggle from '@/components/DarkModeToggle';
import DisableDraftMode from '@/components/DisableDraftMode';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { urlFor } from '@/sanity/lib/image';

import { SanityLive, sanityFetch } from '@/sanity/lib/live';

import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_SETTINGS_QUERY = defineQuery(`*[_id=="singleton-siteSettings"][0] {
  siteTitle,
  siteDescription,
  siteKeywords,
  siteLogo,
  favicon,
  ogImage,
}`);

export async function generateMetadata(): Promise<Metadata> {
  const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  const title = siteSettings?.siteTitle || 'Vahe Borisov - Software Frontend Engineer';
  const description =
    siteSettings?.siteDescription ||
    'Portfolio of Vahe Borisov, a frontend engineer in Next.js, Typescript, and modern web technologies. Available for freelance projects.';

  const keywords = siteSettings?.siteKeywords?.join(', ');
  const ogImage = siteSettings?.ogImage?.asset
    ? urlFor(siteSettings.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    openGraph: {
      type: 'website',
      siteName: 'Vahe Borisov Portfolio',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vahe Borisov',
  url: 'https://vaheborisov.com',
  jobTitle: 'Frontend Software Engineer',
  description:
    'Portfolio of Vahe Borisov, a frontend engineer specializing in Next.js, TypeScript, and modern web technologies.',
  sameAs: [
    'https://github.com/vaheborisov',
    'https://linkedin.com/in/vaheborisov',
  ],
};

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://cdn.sanity.io" />
          <link rel="dns-prefetch" href="https://cdn.sanity.io" />
          <script
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is static and safe
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
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

          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

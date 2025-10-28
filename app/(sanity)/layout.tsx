import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Studio',
  description: 'Portfolio Studio for Vahe Borisov. Manage your portfolio content with ease.',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

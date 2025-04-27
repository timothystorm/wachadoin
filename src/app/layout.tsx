import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import React from 'react';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WachaDoin',
  description: "Let your family and friends know what you're doing so they can join you",
};

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <section className="mx-auto flex h-lvh w-full flex-col lg:w-[1024px]">
          <main className="grow bg-zinc-100">{children}</main>
        </section>
      </body>
    </html>
  );
}

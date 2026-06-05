'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { SiteSettings } from '@/lib/types';
import { PngIcon } from '@/components/site/png-icon';

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Courses', '/courses'],
  ['Corporate Training', '/corporate-training'],
  ['Blog', '/blog'],
  ['Contact', '/contact']
] as const;

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${settings.site_name} home`}>
          <Image src={settings.logo} width={54} height={54} alt="New Era Computer Training Centre logo" className="h-12 w-12" priority />
          <span className="hidden max-w-[230px] text-sm font-bold leading-tight text-brand sm:block">New Era Computer<br />Training Centre</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-gray-700 transition hover:text-brand">{label}</Link>)}
          <Link href="/courses#courses" className="rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-secondary">Browse Courses</Link>
        </nav>
        <button type="button" className="rounded-md p-2 text-brand lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">
          <PngIcon name={open ? 'x' : 'menu'} tone="brand" size={24} />
        </button>
      </div>
      {open ? (
        <nav id="mobile-menu" className="border-t border-gray-200 bg-white px-4 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-brand">{label}</Link>)}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

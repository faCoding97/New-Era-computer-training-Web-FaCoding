'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PngIcon } from '@/components/site/png-icon';
import { cn } from '@/lib/utils';

const links = [
  ['Dashboard', '/admin', 'bar-chart'],
  ['Courses', '/admin/courses', 'book-open'],
  ['Categories', '/admin/categories', 'folder-tree'],
  ['Bookings', '/admin/bookings', 'calendar-check'],
  ['Blog', '/admin/blog', 'file-text'],
  ['Media', '/admin/media', 'image'],
  ['Testimonials', '/admin/testimonials', 'message-square-quote'],
  ['Enquiries', '/admin/enquiries', 'mail'],
  ['SEO', '/admin/seo', 'search'],
  ['Settings', '/admin/settings', 'settings']
] as const;

export function AdminNav() {
  const path = usePathname();
  return (
    <nav className="grid gap-1" aria-label="Admin navigation">
      {links.map(([label, href, icon]) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn('flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold', active ? 'bg-brand text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-brand')}
          >
            <PngIcon name={icon} tone={active ? 'white' : 'gray'} size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

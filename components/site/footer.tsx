import Link from 'next/link';
import Image from 'next/image';
import type { SiteSettings } from '@/lib/types';
import { Container } from '@/components/site/container';

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image
            src="/logo/logo.png?v=20260606"
            alt="New Era Computer Training Centre logo"
            width={220}
            height={117}
            className="mb-4 h-20 w-auto object-contain"
            unoptimized
          />
          <p className="max-w-md text-sm leading-7 text-gray-600">{settings.footer_text}</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">Explore</h2>
          <div className="mt-4 grid gap-3 text-sm text-gray-600">
            <Link href="/about" className="hover:text-brand">About</Link><Link href="/courses" className="hover:text-brand">Courses</Link><Link href="/corporate-training" className="hover:text-brand">Corporate Training</Link><Link href="/blog" className="hover:text-brand">Blog</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">Contact</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
            <p>{settings.address}</p><p><a href={`tel:${settings.phone}`} className="hover:text-brand">{settings.phone}</a></p><p><a href={`mailto:${settings.email}`} className="hover:text-brand">{settings.email}</a></p>
          </div>
        </div>
      </Container>
      <div className="border-t border-gray-200 bg-gray-50">
        <Container className="flex flex-col items-center justify-between gap-4 py-5 text-sm text-gray-600 sm:flex-row">
          <p>© {new Date().getFullYear()} New Era Computer Training Centre. All rights reserved.</p>
          <p className="text-gray-900 flex flex-col sm:flex-row items-center gap-2 sm:gap-1">
            <span className="whitespace-nowrap">Written by:</span>
            <a
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r font-medium rounded-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm sm:text-base"
              href="https://elixcode.com/"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="/logo/Elix-logo.png"
                alt="Elix Code Logo"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
              Elix Code
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}

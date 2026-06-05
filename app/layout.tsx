import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/site/header.client';
import { Footer } from '@/components/site/footer';
import { getSiteSettings } from '@/lib/content';
import { absoluteUrl } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(absoluteUrl('/')),
    title: { default: settings.seo_title, template: `%s | ${settings.site_name}` },
    description: settings.seo_description,
    openGraph: { type: 'website', siteName: settings.site_name, title: settings.seo_title, description: settings.seo_description, url: absoluteUrl('/') },
    alternates: { canonical: absoluteUrl('/') }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return <html lang="en"><body><Header settings={settings} />{children}<Footer settings={settings} /></body></html>;
}

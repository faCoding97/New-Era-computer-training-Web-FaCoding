'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpen, CalendarCheck, FileText, FolderTree, Image, Mail, MessageSquareQuote, Search, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
const links=[['Dashboard','/admin',BarChart3],['Courses','/admin/courses',BookOpen],['Categories','/admin/categories',FolderTree],['Bookings','/admin/bookings',CalendarCheck],['Blog','/admin/blog',FileText],['Media','/admin/media',Image],['Testimonials','/admin/testimonials',MessageSquareQuote],['Enquiries','/admin/enquiries',Mail],['SEO','/admin/seo',Search],['Settings','/admin/settings',Settings]] as const;
export function AdminNav(){const path=usePathname();return <nav className="grid gap-1" aria-label="Admin navigation">{links.map(([label,href,Icon])=><Link key={href} href={href} className={cn('flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold',path===href?'bg-brand text-white':'text-gray-700 hover:bg-blue-50 hover:text-brand')}><Icon className="h-4 w-4"/>{label}</Link>)}</nav>}

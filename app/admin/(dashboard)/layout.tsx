export const dynamic = 'force-dynamic';
import { AdminNav } from '@/components/admin/admin-nav.client';
import { LogoutButton } from '@/components/admin/logout-button.client';
import { requireAdmin } from '@/lib/admin';
export default async function DashboardLayout({children}:{children:React.ReactNode}){await requireAdmin();return <main className="bg-gray-50"><div className="mx-auto grid min-h-screen max-w-[1500px] lg:grid-cols-[230px_1fr]"><aside className="border-r border-gray-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-brand-secondary">New Era CMS</p><h2 className="mt-2 text-xl font-bold text-gray-900">Admin Panel</h2><div className="mt-7"><AdminNav/></div></aside><div><header className="flex items-center justify-end border-b border-gray-200 bg-white px-5 py-3"><LogoutButton/></header><div className="p-5 sm:p-7">{children}</div></div></div></main>}

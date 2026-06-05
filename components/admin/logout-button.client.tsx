'use client';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/browser';
export function LogoutButton(){const router=useRouter();return <button onClick={async()=>{await createClient().auth.signOut();router.push('/admin/login');router.refresh()}} className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Sign out</button>}
